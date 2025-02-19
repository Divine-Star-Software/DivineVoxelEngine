import { VoxelLogicEffects, VoxelLogicStateData } from "../../VoxelLogic.types";
import { VoxelCursorInterface } from "../../../Cursor/VoxelCursor.interface";
import { VoxelLogicType } from "../VoxelLogicType";

export class VoxelLogicStateType extends VoxelLogicType<VoxelLogicStateData> {
  keys: string[];
  init() {
    this.keys = Object.keys(this.data.value);
  }
  run(voxel: VoxelCursorInterface) {
    this.voxelLogic.schema.state.startEncoding(voxel.getState());
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i];
      if (this.data.value[key] !== this.voxelLogic.schema.state.get(key)) {
        return false;
      }
    }
    return true;
  }
  *getEffects(): Generator<VoxelLogicEffects> {
    for (const effect of this.data.true) yield effect;
    for (const effect of this.data.false) yield effect;
  }
}
