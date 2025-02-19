import { VoxelCursorInterface } from "../../../Voxels/Cursor/VoxelCursor.interface";
import { VoxelUpdateTask } from "../../../Tasks/VoxelUpdateTask";
import { VoxelLogicEffects } from "../VoxelLogic.types";
import { VoxelLogic } from "./VoxelLogic";

export interface VoxelLogicTypeConstructor<Data> {
  new (voxelLogic: VoxelLogic,data: Data): VoxelLogicType<Data>;
}

export abstract class VoxelLogicType<Data> {
  constructor(public voxelLogic: VoxelLogic, public data: Data) {}
  abstract init(): void;
  abstract run(task: VoxelCursorInterface): boolean;
  abstract getEffects() : Generator<VoxelLogicEffects>; 
}
