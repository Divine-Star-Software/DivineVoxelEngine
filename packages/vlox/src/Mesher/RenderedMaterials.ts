import { VoxelMesherDataTool } from "./Tools/VoxelMesherDataTool";

export class RenderedMaterials {
  static meshers = new Map<string, VoxelMesherDataTool>();

  static add(id: string) {
    this.meshers.set(id, new VoxelMesherDataTool(id));
  }
}
