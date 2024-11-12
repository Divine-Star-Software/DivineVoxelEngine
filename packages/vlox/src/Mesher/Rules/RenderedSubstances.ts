import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";

export class RenderedSubstances {
  static meshers = new Map<string, VoxelMesherDataTool>();

  static add(id: string) {
    this.meshers.set(id, new VoxelMesherDataTool());
  }

  static setDimension(dimension: string) {
    for (const [key, mesher] of this.meshers) {
      mesher.voxel.setDimension(dimension);
      mesher.nVoxel.setDimension(dimension);
    }
  }
}
