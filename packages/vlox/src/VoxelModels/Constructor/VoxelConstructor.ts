import { TextureRegister } from "../../Textures/TextureRegister";
import { VoxelMesherDataTool } from "../../Mesher/Tools/VoxelMesherDataTool";

import {
  VoxelInputsSyncData,
  VoxelModelSyncData,
} from "../../VoxelData/VoxelSyncData";
import { VoxelModelConstructorRegister } from "./VoxelModelConstructorRegister";
import { VoxelGeometryLookUp } from "./VoxelGeometryLookUp";
import { StateSchema } from "../../VoxelState/Schema/StateSchema";
import { StateTreeReader } from "../../VoxelState/StateTreeReader";
import { VoxelFaceTransparentResultsIndex } from "../Indexing/VoxelFaceTransparentResultsIndex";
import { VoxelModelEffect } from "./VoxelModelEffect";
import { CondtionalTreeReader } from "../../VoxelState/CondiotnalTreeReader";

export class VoxelConstructor {
  isModel: true = true;

  geometries: number[][] = [];

  modSchema: StateSchema;
  modTree: StateTreeReader;

  transparentIndex: VoxelFaceTransparentResultsIndex;

  baseInputMap: any[];
  conditonalInputMap: any[];

  schema: StateSchema;
  effects: VoxelModelEffect;
  shapeStateTree: StateTreeReader;

  condtioanlShapeStateTree: CondtionalTreeReader;

  constructor(
    public id: string,
    public data: VoxelModelSyncData,
    voxleData: VoxelInputsSyncData
  ) {
    this.baseInputMap = voxleData.baseGeometryInputMap;
    this.conditonalInputMap = voxleData.condiotnalGeometryInputMap;
    this.transparentIndex = new VoxelFaceTransparentResultsIndex(
      voxleData.transparentFaceIndex
    );

    this.modSchema = new StateSchema(voxleData.modSchema);
    this.modTree = new StateTreeReader(
      this.modSchema,
      0,
      voxleData.modStateTree
    );
    this.schema = new StateSchema(data.schema);
    this.shapeStateTree = new StateTreeReader(
      this.schema,
      0,
      data.shapeStateTree
    );
    this.condtioanlShapeStateTree = new CondtionalTreeReader(
      this.schema,
      data.condiotnalStatements,
      data.condiotnalStateTree
    );

    this.effects = new VoxelModelEffect(this);
  }

  getShapeStateTransaprentByteIndex(shapeState: number, geomtryId: number) {
    return this.data.relativeGeometryByteIndexMap[
      this.data.shapeStateRelativeGeometryMap[shapeState][geomtryId]
    ];
  }
  getCondtionalStateTransaprentByteIndex(
    shapeState: number,
    geomtryId: number
  ) {
    return this.data.relativeGeometryByteIndexMap[
      this.data.condiotnalShapeStateRelativeGeometryMap[shapeState][geomtryId]
    ];
  }
  isShapeStateFaceTransparent(
    modState: number,
    shapeState: number,
    geoId: number,
    faceIndex: number
  ) {
    return (
      this.transparentIndex.getValue(
        modState,
        this.getShapeStateTransaprentByteIndex(shapeState, geoId),
        faceIndex
      ) == 1
    );
  }

  isCondtionalStateFaceTransparent(
    modState: number,
    shapeState: number,
    geoId: number,
    faceIndex: number
  ) {
    return (
      this.transparentIndex.getValue(
        modState,
        this.getCondtionalStateTransaprentByteIndex(shapeState, geoId),
        faceIndex
      ) == 1
    );
  }

  process(tool: VoxelMesherDataTool) {
    const hashed = VoxelGeometryLookUp.getHash(
      tool.nVoxel,
      tool.position.x,
      tool.position.y,
      tool.position.z
    );

    const treeState = VoxelGeometryLookUp.stateCache[hashed];
    const modState = VoxelGeometryLookUp.modCache[hashed];

    if (treeState !== undefined && treeState > -1) {
      const geoLinks = this.data.shapeStateMap[treeState];

      const geometries = this.data.shapeStateGeometryMap[treeState];

      const geometriesLength = geoLinks.length;

      const inputs = this.baseInputMap[modState][treeState];

      for (let i = 0; i < geometriesLength; i++) {
        const nodeId = geoLinks[i];
        const geoInputs = inputs[nodeId];

        const geomtry = VoxelModelConstructorRegister.geometry[geometries[i]];

        const nodesLength = geomtry.nodes.length;
        for (let k = 0; k < nodesLength; k++) {
          geomtry.nodes[k].add(tool, hashed, tool.origin, geoInputs[k]);
        }
      }
    }

    const conditonalTreeState =
      VoxelGeometryLookUp.conditonalStateCache[hashed];

    if (conditonalTreeState !== undefined && conditonalTreeState > -1) {
      const condiotnalNodes =
        this.data.condiotnalShapeStateMap[conditonalTreeState];

      const condiotnalNodesLength = condiotnalNodes.length;

      for (let c = 0; c < condiotnalNodesLength; c++) {
        const geometries = condiotnalNodes[c];
        const geometriesLength = geometries.length;
        const inputs = this.conditonalInputMap[modState][c];

        for (let i = 0; i < geometriesLength; i++) {
          const nodeId = geometries[i];
          const geoInputs = inputs[i];

          const geomtry =
            VoxelModelConstructorRegister.geometry[
              this.data.geoLinkMap[nodeId]
            ];

          const nodesLength = geomtry.nodes.length;
          for (let k = 0; k < nodesLength; k++) {
            geomtry.nodes[k].add(tool, hashed, tool.origin, geoInputs[k]);
          }
        }
      }
    }

    this.effects.addEffects(
      tool.voxel.getShapeState(),
      tool.origin,
      tool.effects
    );

    tool.clearCalculatedData();
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {}
}
