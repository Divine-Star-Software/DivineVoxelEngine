import { CachedDisplayIndex } from "../../Cache/Cache.types";

export class VoxelTextureIndex {
  static voxelImages = new Map<string, Map<string, HTMLImageElement>>();

  static registerImage(voxelId: string, namedStateId: string, source: string) {
    let voxelMap = this.voxelImages.get(voxelId);

    if (!voxelMap) {
      voxelMap = new Map();
      this.voxelImages.set(voxelId, voxelMap);
    }
    const img = document.createElement("img");
    img.src = source;
    voxelMap.set(namedStateId, img);
  }

  static getImage(voxelId: string, namedStateId: string) {
    const voxelMap = this.voxelImages.get(voxelId);
    if (!voxelMap) return false;
    const source = voxelMap.get(namedStateId);
    if (!source) return false;
    return source;
  }
  static loadData(data: CachedDisplayIndex["textures"]) {
    for (const vid in data) {
      const voxels = data[vid];
      for (const sid in voxels) {
        this.registerImage(vid, sid, voxels[sid]);
      }
    }
  }

  static cacheData(): CachedDisplayIndex["textures"] {
    const meshes: CachedDisplayIndex["textures"] = {};
    for (const [voxelId, vmap] of this.voxelImages) {
      for (const [stateId, image] of vmap) {
        meshes[voxelId] ??= {};
        meshes[voxelId][stateId] = image.src;
      }
    }
    return meshes;
  }
}
