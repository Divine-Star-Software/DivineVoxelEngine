import { VoxelConstructor } from "./VoxelConstructor";
import { StateTreeReader } from "../../Voxels/State/StateTreeReader";
import { Vec3Array, Vector3Like } from "@amodx/math";

export class VoxelModelEffect {
  effects: { id: string; reader: StateTreeReader; palette: Vec3Array[][] }[] =
    [];
  constructor(public model: VoxelConstructor) {
    for (const effect of model.data.effects) {
      if (effect.type == "fx-points") {
        this.effects.push({
          id: effect.effectId,
          reader: new StateTreeReader(model.schema, 0, effect.tree),
          palette: effect.treePalette,
        });
      }
    }
  }

  addEffects(
    state: number,
    origin: Vector3Like,
    effects: Record<string, number[]>
  ) {
    if (!this.effects.length) return;
    for (let i = 0; i < this.effects.length; i++) {
      const e = this.effects[i];
      let array = effects[e.id];
      if (!array) {
        array = [];
        effects[e.id] = array;
      }
      const effectState = e.reader.getState(state);
      if (effectState == -1) continue;
      const v = e.palette[effectState];
      if (!v) continue;
      let start = array.length;
      for (let i = 0; i < v.length; i++) {
        const point = v[i];
        array[start] = origin.x + point[0];
        array[start + 1] = origin.y + point[1];
        array[start + 2] = origin.z + point[2];
        start += 3;
      }
    }
  }
}
