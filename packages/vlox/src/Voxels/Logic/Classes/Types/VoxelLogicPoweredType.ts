import {
  VoxelLogicEffects,
  VoxelLogicPoweredData,
} from "../../VoxelLogic.types";
import { VoxelCursorInterface } from "../../../Cursor/VoxelCursor.interface";
import { VoxelLogicType } from "../VoxelLogicType";

export class VoxelLogicPoweredType extends VoxelLogicType<VoxelLogicPoweredData> {
  init() {}
  run(voxel: VoxelCursorInterface) {
    return voxel.getPower() > 0;
  }
  *getEffects(): Generator<VoxelLogicEffects> {
    for (const effect of this.data.on) yield effect;
    for (const effect of this.data.off) yield effect;
  }
}
