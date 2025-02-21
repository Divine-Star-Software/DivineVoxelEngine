import { VoxelUpdateTypes, VoxelUpdateTypesData } from "./VoxelUpdateTypes";

export class VoxelUpdateRegister {
  static _types = new Map<string, VoxelUpdateTypes>();

  static getUpdateType(id: string) {
    const type = this._types.get(id)!;
    if (!type) throw new Error(`Voxel update type ${id} does not exist`);
    return type;
  }

  static registerType(data: VoxelUpdateTypesData) {
    this._types.set(data.type, new VoxelUpdateTypes(data));
  }
}
