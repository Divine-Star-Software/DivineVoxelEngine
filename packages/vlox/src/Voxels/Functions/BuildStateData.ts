import {
  BinarySchemaNodeData,
  VoxelRelationsScehmaNodeData,
  StateLogicStatement,
  StateCompareOperationsMap,
  StateLogicOperationsMap,
} from "../State/State.types";
import { VoxelRulesModoel } from "../../Models/Rules/Classes/VoxelRulesModel";
import { StringPalette } from "../../Util/StringPalette";
import { VoxelModelRuleBuilderRegister } from "../../Models/Rules/VoxelModelRuleBuilderRegister";
import {
  VoxelStateStringSchemaData,
  VoxelStateNumberSchemaData,
  VoxelModelRelationsSchemaData,
} from "../State/State.types";
import { VoxelEffectSyncData } from "../Effects/VoxelEffects.types";
import { VoxelTagStates } from "../Data/VoxelTagStates";
import { VoxelPalettesRegister } from "../Data/VoxelPalettesRegister";
import { StateSchema } from "../State/Schema/StateSchema";
function bitsNeeded(n: number): number {
  if (n < 0) throw new Error("Input must be a non-negative integer.");

  let bits = 0;
  while (n > 0) {
    bits++;
    n >>= 1;
  }

  return bits;
}
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
  binaryNodes: (VoxelStateStringSchemaData | VoxelStateNumberSchemaData)[],
  relationNodes: VoxelModelRelationsSchemaData[]
) {
  const baseSchema: (BinarySchemaNodeData | VoxelRelationsScehmaNodeData)[] =
    [];

  const schemaIdPalette = new StringPalette();
  const schemaValuePalette = new Map<string, StringPalette>();
  {
    let bitIndex = 0;
    for (const schemaNode of binaryNodes) {
      schemaIdPalette.register(schemaNode.name);

      const maxBits = bitsNeeded(
        schemaNode.type == "string"
          ? Object.keys(schemaNode.values)
              .map((_) => Number(_))
              .sort((a, b) => a - b)
              .pop()!
          : schemaNode.maxValue
      );
      const nodeData: BinarySchemaNodeData = {
        id: schemaNode.name,
        type: "binary",
        index: bitIndex,
        mask: (1 << maxBits) - 1,
      };

      bitIndex += maxBits;

      if (schemaNode.type == "string") {
        const valuePalette = new StringPalette();
        for (const vIndex in schemaNode.values) {
          const vValue = schemaNode.values[vIndex];
          valuePalette.register(vValue);
        }
        schemaValuePalette.set(schemaNode.name, valuePalette);
        nodeData.valuePalette = valuePalette._palette;
      }

      baseSchema.push(nodeData);
    }
  }

  {
    for (const schemaNode of relationNodes) {
      schemaIdPalette.register(schemaNode.name);

      baseSchema.push({
        id: schemaNode.name,
        type: "relation",
        conditions: schemaNode.conditions,
      });
      const valuePalette = new StringPalette();
      valuePalette.register("false");
      valuePalette.register("true");
      schemaValuePalette.set(schemaNode.name, valuePalette);
    }
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
    data.shapeStateSchema,
    data.relationsSchema
  );
  const geometryLinkPalette = new StringPalette();
  //maps geo link ids to geomtry ids
  const geometryLinkStateMap: number[] = [];

  const log = model.data.id == "dve_simple_stair";

  //add geomtry from main shape states
  for (const key in data.shapeStatesNodes) {
    const nodeData = data.shapeStatesNodes[key];

    for (const node of nodeData) {
      if (geometryLinkPalette.isRegistered(node.id)) continue;
      const linkId = geometryLinkPalette.register(node.id);
      geometryLinkStateMap[linkId] = geoPalette.getNumberId(
        VoxelModelRuleBuilderRegister.getGeometryLinkId(node)
      );
    }
  }

  //add geomtry from condiotnal  shape states
  for (const key in data.shapeStatesConditonalNodes) {
    const nodeData = data.shapeStatesConditonalNodes[key];

    for (const node of nodeData) {
      if (geometryLinkPalette.isRegistered(node.id)) continue;
      const linkId = geometryLinkPalette.register(node.id);
      geometryLinkStateMap[linkId] = geoPalette.getNumberId(
        VoxelModelRuleBuilderRegister.getGeometryLinkId(node)
      );
    }
  }

  const shapeStateRelativeGeometryMap: number[][] = [];
  const relativeGeometryByteIndexMap: number[] = [];

  //build state trees
  const shapeStateTree = new StateTreeNode("root");
  const shapeStateGeoLinkPalette: number[][] = [];
  const shapeStateGeometryPalette: number[][] = [];

  let relativeGeoId = 0;
  let relativeByteCount = 0;
  const shapeStateRecord: Record<string, number> = {};
  for (const key in data.shapeStatesNodes) {
    shapeStateGeoLinkPalette.push(
      data.shapeStatesNodes[key].map((_) =>
        geometryLinkPalette.getNumberId(_.id)
      )
    );
    shapeStateGeometryPalette.push(
      data.shapeStatesNodes[key].map((_) =>
        geoPalette.getNumberId(VoxelModelRuleBuilderRegister.getGeometryLinkId(_))
      )
    );
    shapeStateRecord[key] = shapeStateGeometryPalette.length - 1;
    shapeStateRelativeGeometryMap[shapeStateRecord[key]] ??= [];
    const nodeData = data.shapeStatesNodes[key];

    for (const node of nodeData) {
      shapeStateRelativeGeometryMap[shapeStateRecord[key]][
        geoPalette.getNumberId(VoxelModelRuleBuilderRegister.getGeometryLinkId(node))
      ] = relativeGeoId;
      relativeGeometryByteIndexMap[relativeGeoId] = relativeByteCount;
      relativeGeoId++;
      relativeByteCount += Math.ceil(
        VoxelModelRuleBuilderRegister.getGeomtryFromLink(node)!.faceCount / 8
      );
    }

    addPathToTree(
      shapeStateTree,
      key
        .split(",")
        .map((pair) => pair.split("="))
        .flat(),
      shapeStateGeoLinkPalette.length - 1
    );
  }

  const condiotnalShapeStateRelativeGeometryMap: number[][] = [];

  const condiotnalShapeStateNodePalette: number[][] = [];
  const condiotnalShapeStateGeometryPalette: number[][] = [];

  const condiotnalShapeStateNodeRecord: Record<string, number> = {};
  const condiotnalStatements: StateLogicStatement[] = [];
  const compareOperations = Object.keys(StateCompareOperationsMap);
  for (const key in data.shapeStatesConditonalNodes) {
    condiotnalShapeStateNodePalette.push(
      data.shapeStatesConditonalNodes[key].map((_) =>
        geometryLinkPalette.getNumberId(_.id)
      )
    );
    condiotnalShapeStateGeometryPalette.push(
      data.shapeStatesConditonalNodes[key].map((_) =>
        geoPalette.getNumberId(VoxelModelRuleBuilderRegister.getGeometryLinkId(_))
      )
    );
    condiotnalShapeStateNodeRecord[key] =
      condiotnalShapeStateGeometryPalette.length - 1;
    condiotnalShapeStateRelativeGeometryMap[
      condiotnalShapeStateNodeRecord[key]
    ] ??= [];
    const nodeData = data.shapeStatesConditonalNodes[key];

    for (const node of nodeData) {
      condiotnalShapeStateRelativeGeometryMap[
        condiotnalShapeStateNodeRecord[key]
      ][geoPalette.getNumberId(VoxelModelRuleBuilderRegister.getGeometryLinkId(node))] =
        relativeGeoId;
      relativeGeometryByteIndexMap[relativeGeoId] = relativeByteCount;
      relativeGeoId++;
      relativeByteCount += Math.ceil(
        VoxelModelRuleBuilderRegister.getGeomtryFromLink(node)!.faceCount / 8
      );
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

  const shapeStateTreeData = shapeStateTree.toJSON();

  const newShapeStateTree: any[] = [];

  reMapTree(
    schemaIdPalette,
    schemaValuePalette,
    shapeStateTreeData,
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

  const schema = new StateSchema(baseSchema);

  for (const [voxelId, voxelData] of model.voxels) {
    const modeStateTree = new StateTreeNode("root");
    const modStatePalette: any[] = [];
    const modStateRecord: Record<string, number> = {};

    for (const tag of tagEffects) {
      VoxelTagStates.register(
        VoxelPalettesRegister.voxels.getNumberId(voxelId),
        (tag as any).tagId,
        schema,
        tag.tree,
        tag.treePalette
      );
    }

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
    shapeStateGeometryPalette,
    condiotnalShapeStateGeometryPalette,
    shapeStateTree: newShapeStateTree,
    geometryLinkPalette: geometryLinkPalette._map,
    geometryLinkStateMap,
    relativeByteCount,
    shapeStatePalette: shapeStateGeoLinkPalette,
    shapeStateRecord,
    condiotnalNodeStateTree,
    condiotnalStatements,
    condiotnalShapeStatePalette: condiotnalShapeStateNodePalette,
    condiotnalShapeStateRecord: condiotnalShapeStateNodeRecord,
    condiotanlStatePalette,
    condiotanlGeometryStatePalette,
    shapeStateRelativeGeometryMap,
    relativeGeometryByteIndexMap,
    condiotnalShapeStateRelativeGeometryMap,
  };

  model.stateData = finalData;
  return finalData;
}
