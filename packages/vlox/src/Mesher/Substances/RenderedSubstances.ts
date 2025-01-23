import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";

export class RenderedSubstances {
  static meshers = new Map<string, VoxelMesherDataTool>();

  static add(id: string) {
    this.meshers.set(id, new VoxelMesherDataTool(id));
  }
}
