import { VoxelPalette } from "../Data/Voxel/VoxelPalette";
import { StateSchema } from "./Schema/StateSchema";
import { StateTreeReader } from "./StateTreeReader";
import { SchemaRegister } from "./SchemaRegister";

export type VoxelTagStatesData = Record<
  string,
  { tree: any; treePalette: any }
>[];
export class VoxelTagStates {
  static voxelTags: Record<
    string,
    { tree: StateTreeReader; treePalette: any[] }
  >[] = [];

  static toJSON(): VoxelTagStatesData {
    const data: VoxelTagStatesData = [];
    console.log("TO JSON");
    console.log(this.voxelTags)
    this.voxelTags.forEach((v, index) => {
      console.log(v);
      data[index] = Object.fromEntries(
        Object.keys(v).map((k) => [
          k,
          { tree: v[k].tree.tree, treePalette: v[k].treePalette },
        ])
      );
    });
    return data;
  }
  static load(data: VoxelTagStatesData) {
    data.forEach((v, index) => {
      const stateSceham = new StateSchema(
        SchemaRegister.modelStaeBaseSchemaData.get(
          SchemaRegister.voxelModelMap.get(VoxelPalette.ids.getStringId(index))!
        )!
      );

      for (const tag in v) {

        this.register(index, tag, stateSceham, v[tag].tree, v[tag].treePalette);
      }
    });

  }

  static register(
    voxel: number,
    id: string,
    stateSchema: StateSchema,
    tree: any[],
    treePalette: any[]
  ) {
    let tags = this.voxelTags[voxel];
    if (!tags) {
      tags = {};
      this.voxelTags[voxel] = tags;
    }

    tags[id] = { tree: new StateTreeReader(stateSchema, 0, tree), treePalette };
  }

  static isRegistered(voxel: number, id: string) {
    return this.voxelTags[voxel] && this.voxelTags[voxel][id] !== undefined;
  }
  static getData(voxel: number, id: string) {
    return   this.voxelTags[voxel][id];

  }
  static getState(voxel: number, id: string, state: number) {
    return   this.voxelTags[voxel][id].tree.getState(state);

  }

  static getValue(voxel: number, id: string, state: number) {
    return this.voxelTags[voxel][id].treePalette[
      this.voxelTags[voxel][id].tree.getState(state)
    ];
  }
}
