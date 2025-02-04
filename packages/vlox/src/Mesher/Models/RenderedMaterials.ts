import { VoxelModelBuilder } from "./VoxelModelBuilder";

export class RenderedMaterials {
  static meshersMap = new Map<string, VoxelModelBuilder>();
  static meshers: VoxelModelBuilder[] = [];

  static register(materials: string[]) {
    for (let i = 0; i < materials.length; i++) {
      const newTool = new VoxelModelBuilder(materials[i], i);
      this.meshersMap.set(materials[i], newTool);
      this.meshers[i] = newTool;
    }
  }
}
