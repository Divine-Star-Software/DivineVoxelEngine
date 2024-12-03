import type { Material } from "@babylonjs/core";
import { CompactMeshData } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";

export class VoxelModelIndex {
  static voxelModels = new Map<
    string,
    Map<string, { data: CompactMeshData; material: Material }>
  >();

  static registerModel(
    voxelId: string,
    namedStateId: string,
    data: CompactMeshData,
    material: Material
  ) {
    let voxelMap = this.voxelModels.get(voxelId);

    if (!voxelMap) {
      voxelMap = new Map();
      this.voxelModels.set(voxelId, voxelMap);
    }
    voxelMap.set(namedStateId, { data, material });
  }

  static getModel(voxelId: string, namedStateId: string) {
    const voxelMap = this.voxelModels.get(voxelId);
    if (!voxelMap) return false;
    const source = voxelMap.get(namedStateId);
    if (!source) return false;
    return source;
  }
}
