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
}
