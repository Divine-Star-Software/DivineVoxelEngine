import { VoxelMesherDataTool } from "./Tools/VoxelMesherDataTool";

export class RenderedMaterials {
  static meshersMap = new Map<string, VoxelMesherDataTool>();
  static meshers: VoxelMesherDataTool[] = [];

  static register(materials: string[]) {
    for (let i = 0; i < materials.length; i++) {
      const newTool = new VoxelMesherDataTool(materials[i], i);
      this.meshersMap.set(materials[i], newTool);
      this.meshers[i] = newTool;
    }
  }
}
