import { WorldCursor } from "../../World/Cursor/WorldCursor";
import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface";
import { VoxelUpdateTick, DimensionSimulation } from "./VoxelUpdateTick";

export interface VoxelUpdateTypesData<Data extends any = null> {
  type: string;
  run(
    runData: DimensionSimulation,
    voxel: VoxelCursorInterface,
    update: VoxelUpdateTick<Data>
  ): void;
}
export class VoxelUpdateTypes<Data extends any = null> {
  worldCursor = new WorldCursor();
  constructor(public data: VoxelUpdateTypesData<Data>) {}

  run(runData: DimensionSimulation, update: VoxelUpdateTick<Data>) {
    const voxel = this.worldCursor.getVoxel(update.x, update.y, update.z);
    if (!voxel)
      throw new Error(
        `Tried to run tick update on voxel that does not exist at [${update.x} ${update.y} ${update.z}]`
      );
    this.data.run(runData, voxel, update);
  }
}
