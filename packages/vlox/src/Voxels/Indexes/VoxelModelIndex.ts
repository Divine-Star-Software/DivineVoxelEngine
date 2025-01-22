import { CachedDisplayIndex } from "../../Cache/Cache.types";
import { CompactMeshData } from "../../Mesher/Types/Mesher.types";

export class VoxelModelIndex {
  static voxelModels = new Map<string, Map<string, {model:CompactMeshData; material:string}>>();
  static voxelMaterials = new Map<string, Map<string, any>>();
  static registerModel(
    voxelId: string,
    namedStateId: string,
    model: CompactMeshData,
    materialId:string,
    material?: any
  ) {
    let voxelMap = this.voxelModels.get(voxelId);

    if (!voxelMap) {
      voxelMap = new Map();
      this.voxelModels.set(voxelId, voxelMap);
    }
    if (material) {
      this.registerMaterial(voxelId, namedStateId, material);
    }
    voxelMap.set(namedStateId, {model,material:materialId});
  }
  static registerMaterial(
    voxelId: string,
    namedStateId: string,
    material?: any
  ) {
    let voxelMap = this.voxelMaterials.get(voxelId);
    if (!voxelMap) {
      voxelMap = new Map();
      this.voxelMaterials.set(voxelId, voxelMap);
    }
    voxelMap.set(namedStateId, material);
  }
  static getModel(voxelId: string, namedStateId: string) {
    const voxelMap = this.voxelModels.get(voxelId);
    if (!voxelMap) return false;
    const source = voxelMap.get(namedStateId);
    if (!source) return false;
    return source;
  }
  static getMaterial(voxelId: string, namedStateId: string) {
    const voxelMap = this.voxelMaterials.get(voxelId);
    if (!voxelMap) return false;
    const source = voxelMap.get(namedStateId);
    if (!source) return false;
    return source;
  }

  static loadData(data: CachedDisplayIndex["meshes"]) {
    for (const vid in data) {
      const voxels = data[vid];
      for (const sid in voxels) {
        this.registerModel(vid, sid, voxels[sid].model, voxels[sid].material);
      }
    }
  }
  static cacheData(): CachedDisplayIndex["meshes"] {
    const meshes: CachedDisplayIndex["meshes"] = {};
    for (const [voxelId, vmap] of this.voxelModels) {
      for (const [stateId, model] of vmap) {
        meshes[voxelId] ??= {};
        meshes[voxelId][stateId] = model;
      }
    }
    return meshes;
  }
}
