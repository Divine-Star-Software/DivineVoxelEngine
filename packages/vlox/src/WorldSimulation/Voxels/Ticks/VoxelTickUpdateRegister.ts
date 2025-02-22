import { VoxelTickUpdateType, VoxelTickUpdateTypeData } from "./VoxelTickUpdateType";

export class VoxelTickUpdateRegister {
  static _types = new Map<string, VoxelTickUpdateType>();

  static getUpdateType(id: string) {
    const type = this._types.get(id)!;
    if (!type) throw new Error(`Voxel update type ${id} does not exist`);
    return type;
  }

  static registerType(data: VoxelTickUpdateTypeData) {
    this._types.set(data.type, new VoxelTickUpdateType(data));
  }
}
