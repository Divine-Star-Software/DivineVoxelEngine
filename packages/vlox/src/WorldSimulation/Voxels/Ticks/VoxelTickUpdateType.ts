import { VoxelCursorInterface } from "../../../Voxels/Cursor/VoxelCursor.interface";
import { VoxelTickUpdate } from "./VoxelTickUpdate";
import { DimensionSimulation } from "../../Dimensions/DimensionSimulation";

export interface VoxelTickUpdateTypeData<Data extends any = null> {
  type: string;
  run(
    runData: DimensionSimulation,
    voxel: VoxelCursorInterface,
    update: VoxelTickUpdate<Data>
  ): void;
}
export class VoxelTickUpdateType<Data extends any = null> {
  constructor(public data: VoxelTickUpdateTypeData<Data>) {}

  run(runData: DimensionSimulation, update: VoxelTickUpdate<Data>) {
    const voxel = runData.getVoxelForUpdate(update.x, update.y, update.z);
    this.data.run(runData, voxel, update);
  }
}
