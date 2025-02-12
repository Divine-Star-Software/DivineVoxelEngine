import { VoxelModelBuilder } from "./VoxelModelBuilder";
import {
  CompiledVoxelModelInputData,
  CompiledVoxelModelData,
} from "../../Voxels/Models/CompiledVoxelModel.types";
import { VoxelModelConstructorRegister } from "./VoxelModelConstructorRegister";
import { StateSchema } from "../../Voxels/State/Schema/StateSchema";
import { StateTreeReader } from "../../Voxels/State/StateTreeReader";
import { VoxelModelEffect } from "./VoxelModelEffect";
import { CondtionalTreeReader } from "../../Voxels/State/CondiotnalTreeReader";

export class VoxelConstructor {
  isModel: true = true;

  geometries: number[][] = [];

  modSchema: StateSchema;
  modTree: StateTreeReader;

  baseInputMap: any[];
  conditonalInputMap: any[];

  schema: StateSchema;
  effects: VoxelModelEffect;
  stateTree: StateTreeReader;

  condtioanlShapeStateTree: CondtionalTreeReader;

  constructor(
    public id: string,
    public builder: VoxelModelBuilder,
    public data: CompiledVoxelModelData,
    voxleData: CompiledVoxelModelInputData
  ) {
    this.baseInputMap = voxleData.baseGeometryInputMap;
    this.conditonalInputMap = voxleData.condiotnalGeometryInputMap;

    this.schema = new StateSchema(data.schema);
    this.stateTree = new StateTreeReader(this.schema, 0, data.stateTree);

    this.condtioanlShapeStateTree = new CondtionalTreeReader(
      this.schema,
      data.condiotnalStatements,
      data.condiotnalStateTree
    );

    this.modSchema = new StateSchema(voxleData.modSchema);
    this.modTree = new StateTreeReader(
      this.modSchema,
      0,
      voxleData.modStateTree
    );

    this.effects = new VoxelModelEffect(this);
  }

  process(): boolean {
    let added = false;
    const builder = this.builder;
    const hashed = builder.space.getHash(
      builder.nVoxel,
      builder.position.x,
      builder.position.y,
      builder.position.z
    );

    const treeState = builder.space!.stateCache[hashed];
    const modState = builder.space!!.modCache[hashed];

    if (treeState > -1) {
      const geoLinks = this.data.stateMap[treeState];
      const geometries = this.data.stateGeometryMap[treeState];
      const geometriesLength = geoLinks.length;
      const inputs = this.baseInputMap[modState][treeState];
      for (let i = 0; i < geometriesLength; i++) {
        const nodeId = geoLinks[i];
        const geoInputs = inputs[nodeId];
        const geomtry = VoxelModelConstructorRegister.geometry[geometries[i]];
        const nodesLength = geomtry.nodes.length;
        for (let k = 0; k < nodesLength; k++) {
          const geo = geomtry.nodes[k];
          geo.builder = this.builder;
          const addedGeo = geo.add(geoInputs[k]);
          if (addedGeo) added = true;
        }
      }
    }

    const conditonalTreeState = builder!.space!.conditonalStateCache[hashed];

    if (conditonalTreeState > -1) {
      const condiotnalNodes =
        this.data.condiotnalShapeStateMap[conditonalTreeState];

      const condiotnalNodesLength = condiotnalNodes.length;

      for (let c = 0; c < condiotnalNodesLength; c++) {
        const geometries = condiotnalNodes[c];
        const geometriesLength = geometries.length;
        const inputs = this.conditonalInputMap[modState][c];

        for (let i = 0; i < geometriesLength; i++) {
          const geoInputs = inputs[i];
          const geomtry = VoxelModelConstructorRegister.geometry[geometries[i]];
          const nodesLength = geomtry.nodes.length;
          for (let k = 0; k < nodesLength; k++) {
            const geo = geomtry.nodes[k];
            geo.builder = this.builder;
            const addedGeo = geo.add(geoInputs[k]);
            if (addedGeo) added = true;
          }
        }
      }
    }

    this.effects.addEffects(
      builder.voxel.getState(),
      builder.origin,
      builder.effects
    );

    builder.clearCalculatedData();

    return added;
  }
}
