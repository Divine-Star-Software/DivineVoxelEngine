import {
  StateLogicStatement,
  StateCompareOperationsMap,
  StateLogicOperationsMap,
  VoxelModelRelationsSchemaNodes,
  VoxelBinaryStateSchemaNode,
  VoxelStateSchemaData,
} from "../State/State.types";
import { VoxelRulesModoel } from "../Models/Rules/Classes/VoxelRulesModel";
import { StringPalette } from "../../Util/StringPalette";
import { VoxelModelRuleBuilderRegister } from "../Models/Rules/VoxelModelRuleBuilderRegister";

import { VoxelEffectSyncData } from "../Effects/VoxelEffects.types";
import { bitsNeeded } from "../../Util/Binary/BinaryFunctions";

class StateTreeNode<Value> {
  children = new Map<string, StateTreeNode<Value>>();
  result?: Value;

  constructor(public id: string) {}

  addChild(value: string, node: StateTreeNode<Value>) {
    this.children.set(value, node);
  }

  getChild(value: string): StateTreeNode<Value> | undefined {
    return this.children.get(value);
  }

  toJSON(): any {
    const childrenObj: Record<string, any> = {};
    this.children.forEach((childNode, key) => {
      childrenObj[key] = childNode.toJSON();
    });
    if (this.result != undefined) return this.result;

    return childrenObj;
  }
}

function generateCombinations(length: number): number[][] {
  const values: number[] = [0, 1];
  function gen(
    currentCombination: number[],
    remainingLength: number
  ): number[][] {
    if (remainingLength === 0) {
      return [currentCombination];
    }

    let combinations: number[][] = [];
    for (let value of values) {
      combinations.push(
        ...gen([...currentCombination, value], remainingLength - 1)
      );
    }
    return combinations;
  }
  return gen([], length);
}

function generateNestedCombinations(length: number, values: number[]): any {
  let combinationIndex = 0;

  function createNestedArray(depth: number): any {
    if (depth === length) {
      return combinationIndex++;
    }

    const nestedArray: any[] = [];
    for (let i = 0; i < values.length; i++) {
      nestedArray.push(createNestedArray(depth + 1));
    }

    return nestedArray;
  }

  return createNestedArray(0);
}

function addPathToTree<Value>(
  root: StateTreeNode<Value>,
  path: string[],
  result: Value
) {
  let currentNode = root;

  for (let i = 0; i < path.length; i += 2) {
    const key = path[i];
    const value = path[i + 1];

    let childNode = currentNode.getChild(key);
    if (!childNode) {
      childNode = new StateTreeNode(key);
      currentNode.addChild(key, childNode);
    }

    let valueNode = childNode.getChild(value);
    if (!valueNode) {
      valueNode = new StateTreeNode(value);
      childNode.addChild(value, valueNode);
    }

    currentNode = valueNode;
  }
  currentNode.result = result;
}

function reMapTree(
  schemaIdPalette: StringPalette,
  schemaValuePalette: Map<string, StringPalette>,
  baseObj: any,
  newObj: any[],
  modelOrVodelId: string
) {
  for (const key in baseObj) {
    if (key == "*") continue;

    const propertyIndex = schemaIdPalette.getNumberId(key);
    const baseChild = baseObj[key];
    const reMapedChildren: any[] = [];
    const schemaValueIndex = schemaValuePalette.has(key)
      ? schemaValuePalette.get(key)
      : Number(key);

    if (propertyIndex === undefined) {
      console.error(baseObj);
      throw new Error(
        `Unkown variable in state string ${key} | ${modelOrVodelId}`
      );
    }

    if (schemaValueIndex === undefined) continue;
    for (const value in baseChild) {
      const propertyValue = baseChild[value];
      const valueIndex =
        typeof value === "string" && typeof schemaValueIndex == "object"
          ? schemaValueIndex.getNumberId(value)
          : Number(value);
      if (typeof propertyValue == "object" && !Array.isArray(propertyValue)) {
        reMapedChildren[valueIndex] = reMapTree(
          schemaIdPalette,
          schemaValuePalette,
          baseChild[value],
          [],
          modelOrVodelId
        );
        continue;
      }
      reMapedChildren[valueIndex] = baseChild[value];
    }

    newObj[propertyIndex] = reMapedChildren;
  }

  return newObj;
}

function buildSchemas(
  binaryNodes: VoxelBinaryStateSchemaNode[],
  relationNodes: VoxelModelRelationsSchemaNodes[]
) {
  const baseSchema: VoxelStateSchemaData = {
    binary: [],
    relational: [],
  };

  const schemaIdPalette = new StringPalette();
  const schemaValuePalette = new Map<string, StringPalette>();

  for (const schemaNode of binaryNodes) {
    schemaIdPalette.register(schemaNode.name);

    if (schemaNode.values) {
      schemaValuePalette.set(
        schemaNode.name,
        new StringPalette(schemaNode.values)
      );
    }

    baseSchema.binary.push(schemaNode);
  }

  for (const schemaNode of relationNodes) {
    schemaIdPalette.register(schemaNode.name);

    baseSchema.relational.push(schemaNode);

    schemaValuePalette.set(
      schemaNode.name,
      new StringPalette(["false", "true"])
    );
  }

  return {
    baseSchema,
    schemaIdPalette,
    schemaValuePalette,
  };
}

export function BuildStateData(
  model: VoxelRulesModoel,
  geoPalette: StringPalette
) {
  const data = model.data;

  const { baseSchema, schemaIdPalette, schemaValuePalette } = buildSchemas(
    data.stateSchema,
    data.relationsSchema
  );

  //maps geo link ids to geomtry ids
  const geometryLinkStateMap: Record<string, Record<number, number>> = {};

  //add geomtry from main shape states
  for (const key in data.stateNodes) {
    const nodeData = data.stateNodes[key];

    for (let i = 0; i < nodeData.length; i++) {
      geometryLinkStateMap[key] ??= {};
      const node = nodeData[i];
      geometryLinkStateMap[key][i] ??= geoPalette.getNumberId(
        VoxelModelRuleBuilderRegister.getGeometryLinkId(node)
      );
    }
  }

  //add geomtry from condiotnal  shape states
  for (const key in data.conditonalNodes) {
    const nodeData = data.conditonalNodes[key];

    for (let i = 0; i < nodeData.length; i++) {
      geometryLinkStateMap[key] ??= {};
      const node = nodeData[i];
      geometryLinkStateMap[key][i] ??= geoPalette.getNumberId(
        VoxelModelRuleBuilderRegister.getGeometryLinkId(node)
      );
    }
  }

  const stateRelativeGeometryMap: number[][] = [];
  const relativeGeometryByteIndexMap: number[] = [];

  //build state trees
  const stateTree = new StateTreeNode("root");
  const stateGeoLinkPalette: number[][] = [];
  const stateGeometryPalette: number[][] = [];

  let relativeGeoId = 0;
  let relativeByteCount = 0;
  const stateRecord: Record<string, number> = {};
  for (const key in data.stateNodes) {
    stateGeoLinkPalette.push(
      data.stateNodes[key].map((_, index) => geometryLinkStateMap[key][index])
    );
    stateGeometryPalette.push(
      data.stateNodes[key].map((_) =>
        geoPalette.getNumberId(
          VoxelModelRuleBuilderRegister.getGeometryLinkId(_)
        )
      )
    );
    stateRecord[key] = stateGeometryPalette.length - 1;
    stateRelativeGeometryMap[stateRecord[key]] ??= [];
    const nodeData = data.stateNodes[key];

    for (const node of nodeData) {
      stateRelativeGeometryMap[stateRecord[key]][
        geoPalette.getNumberId(
          VoxelModelRuleBuilderRegister.getGeometryLinkId(node)
        )
      ] = relativeGeoId;
      relativeGeometryByteIndexMap[relativeGeoId] = relativeByteCount;
      relativeGeoId++;
    }

    addPathToTree(
      stateTree,
      key
        .split(",")
        .map((pair) => pair.split("="))
        .flat(),
      stateGeoLinkPalette.length - 1
    );
  }

  const condiotnalShapeStateRelativeGeometryMap: number[][] = [];

  const condiotnalShapeStateNodePalette: number[][] = [];
  const condiotnalShapeStateGeometryPalette: number[][] = [];

  const condiotnalShapeStateNodeRecord: Record<string, number> = {};
  const condiotnalStatements: StateLogicStatement[] = [];
  const compareOperations = Object.keys(StateCompareOperationsMap);
  for (const key in data.conditonalNodes) {
    condiotnalShapeStateNodePalette.push(
      data.conditonalNodes[key].map(
        (_, index) => geometryLinkStateMap[key][index]
      )
    );
    condiotnalShapeStateGeometryPalette.push(
      data.conditonalNodes[key].map((_) =>
        geoPalette.getNumberId(
          VoxelModelRuleBuilderRegister.getGeometryLinkId(_)
        )
      )
    );
    condiotnalShapeStateNodeRecord[key] =
      condiotnalShapeStateGeometryPalette.length - 1;
    condiotnalShapeStateRelativeGeometryMap[
      condiotnalShapeStateNodeRecord[key]
    ] ??= [];
    const nodeData = data.conditonalNodes[key];

    for (const node of nodeData) {
      condiotnalShapeStateRelativeGeometryMap[
        condiotnalShapeStateNodeRecord[key]
      ][
        geoPalette.getNumberId(
          VoxelModelRuleBuilderRegister.getGeometryLinkId(node)
        )
      ] = relativeGeoId;
      relativeGeometryByteIndexMap[relativeGeoId] = relativeByteCount;
      relativeGeoId++;
    }
    const statement: StateLogicStatement = [];
    const nodes = key.split(" ");
    let mode: "operation" | "node" = "node";

    for (const node of nodes) {
      if (!node) continue;
      if (mode == "node") {
        mode = "operation";
        for (const op of compareOperations) {
          if (node.includes(op)) {
            const [schemaId, value] = node.split(op);

            statement.push([
              schemaIdPalette.getNumberId(schemaId),
              StateCompareOperationsMap[op],
              schemaValuePalette.has(schemaId)!
                ? schemaValuePalette.get(schemaId)!.getNumberId(value)
                : Number(value),
            ]);
            break;
          }
        }
        continue;
      }

      if (mode == "operation") {
        mode = "node";
        statement.push(StateLogicOperationsMap[node]);
      }
    }

    condiotnalStatements.push(statement);
  }

  const condiotnalNodeStateTree = generateNestedCombinations(
    condiotnalStatements.length,
    [0, 1]
  );
  const allCombinations = generateCombinations(
    condiotnalStatements.length
  ) as any[];
  const condiotanlStatePalette: number[][][] = [];
  const condiotanlGeometryStatePalette: number[][][] = [];

  for (const combo of allCombinations) {
    const newStateCombo: number[][] = [];
    const newGeoCombo: number[][] = [];
    for (let i = 0; i < combo.length; i++) {
      if (combo[i] == 0) {
        newStateCombo[i] = [];
        newGeoCombo[i] = [];
        continue;
      }
      newStateCombo[i] = condiotnalShapeStateNodePalette[i];
      newGeoCombo[i] = condiotnalShapeStateGeometryPalette[i];
    }
    condiotanlStatePalette.push(newStateCombo);
    condiotanlGeometryStatePalette.push(newGeoCombo);
  }

  const stateTreeData = stateTree.toJSON();

  const newShapeStateTree: any[] = [];

  reMapTree(
    schemaIdPalette,
    schemaValuePalette,
    stateTreeData,
    newShapeStateTree,
    model.data.id
  );

  const modelEffects: VoxelEffectSyncData[] = [];
  const tagEffects: VoxelEffectSyncData[] = [];

  if (model.data.effects) {
    for (const effect of model.data.effects) {
      const tagStateTree = new StateTreeNode("root");
      const treePalette: any[] = [];
      for (const key in effect.values) {
        const nodeData = effect.values[key];
        treePalette.push(nodeData);
        addPathToTree(
          tagStateTree,
          key
            .split(",")
            .map((pair) => pair.split("="))
            .flat(),
          treePalette.length - 1
        );
      }
      const tagStateTreeData = tagStateTree.toJSON();
      const newTagStateTree: any[] = [];

      reMapTree(
        schemaIdPalette,
        schemaValuePalette,
        tagStateTreeData,
        newTagStateTree,
        model.data.id
      );
      if (effect.type == "tag") {
        tagEffects.push({
          type: "tag",
          tagId: effect.tagId,
          tree: newTagStateTree,
          treePalette,
        });
      }
      if (effect.type == "fx-points") {
        modelEffects.push({
          type: "fx-points",
          effectId: effect.effectId,
          tree: newTagStateTree,
          treePalette,
        });
      }
    }
  }

  for (const [voxelId, voxelData] of model.voxels) {
    const modeStateTree = new StateTreeNode("root");
    const modStatePalette: any[] = [];
    const modStateRecord: Record<string, number> = {};

    const { baseSchema, schemaIdPalette, schemaValuePalette } = buildSchemas(
      voxelData.modSchema || [],
      voxelData.modRelationSchema || []
    );
    for (const key in voxelData.inputs) {
      modStatePalette.push(voxelData.inputs[key]);

      modStateRecord[key] = modStatePalette.length - 1;
      addPathToTree(
        modeStateTree,
        key
          .split(",")
          .map((pair) => pair.split("="))
          .flat(),
        modStatePalette.length - 1
      );
    }
    const modTreeData = modeStateTree.toJSON();
    const newModTree: any[] = [];
    reMapTree(
      schemaIdPalette,
      schemaValuePalette,
      modTreeData,
      newModTree,
      voxelId
    );

    model.voxelModData.set(voxelId, {
      modSchema: baseSchema,
      modPalette: modStatePalette,
      modRecord: modStateRecord,
      modStateTree: newModTree,
    });
  }

  const finalData = {
    schema: baseSchema,
    effects: modelEffects,
    stateGeometryPalette: stateGeometryPalette,
    condiotnalShapeStateGeometryPalette,
    stateTree: newShapeStateTree,
    geometryLinkStateMap,

    statePalette: stateGeoLinkPalette,
    stateRecord: stateRecord,
    condiotnalNodeStateTree,
    condiotnalStatements,
    condiotnalStatePalette: condiotnalShapeStateNodePalette,
    condiotnalShapeStateRecord: condiotnalShapeStateNodeRecord,
    condiotanlStatePalette,
    condiotanlGeometryStatePalette,
    stateRelativeGeometryMap: stateRelativeGeometryMap,
    relativeGeometryByteIndexMap,
    condiotnalShapeStateRelativeGeometryMap,
  };

  model.stateData = finalData;
  return finalData;
}
