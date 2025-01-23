import { VoxelEffectConstructor } from "./VoxelEffect";

export class VoxelEffectRegister {
  static _effects = new Map<string, VoxelEffectConstructor>();

  static register(...effects: VoxelEffectConstructor[]) {
    for (const e of effects) {
      this._effects.set(e.id, e);
    }
  }

  static get(id: string) {
    const effect = this._effects.get(id);
    if (!effect) {
      throw new Error(`Effect with id ${id} does not exist`);
    }
    return effect;
  }
}
