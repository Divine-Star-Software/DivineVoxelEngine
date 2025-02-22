import { VoxelBehavior, VoxelBehaviorsData } from "./VoxelBehaviors";

export class VoxelBehaviorsRegister {
  static behaviors = new Map<string, VoxelBehavior>();

  static register(data: VoxelBehaviorsData) {
    this.behaviors.set(data.type, new VoxelBehavior(data));
  }

  static get(type: string) {
    const behavior = this.behaviors.get(type);
    if (!behavior) throw new Error(`Voxel behavior ${type} does not exist`);
    return behavior;
  }
}
