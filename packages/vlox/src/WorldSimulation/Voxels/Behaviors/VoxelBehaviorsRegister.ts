import { VoxelBehavior, VoxelBehaviorsData } from "./VoxelBehaviors";

export class VoxelBehaviorsRegister {
  static behaviors = new Map<string, VoxelBehavior>();

  static register(data: VoxelBehaviorsData) {
    if (!data.inherits && data.type != "dve_default") data.inherits = "dve_default";
    if (data.inherits) {
      const otherType = this.get(data.inherits);
      for (const key in otherType) {
        if (key == "type" || key == "inherits") continue;
        if (!(data as any)[key] && (otherType as any)[key]) {
          (data as any)[key] = (otherType as any)[key];
        }
      }
    }

    this.behaviors.set(data.type, new VoxelBehavior(data));
  }

  static get(type: string) {
    const behavior = this.behaviors.get(type);
    if (!behavior) throw new Error(`Voxel behavior ${type} does not exist`);
    return behavior;
  }
}
