import { VoxelFaceNames } from "Math";
import { DimensionSimulation } from "../../Dimensions/DimensionSimulation";
import { VoxelCursorInterface } from "Voxels/Cursor/VoxelCursor.interface";

export interface VoxelBehaviorsData {
  type: string;

  onPaint?(
    simulation: DimensionSimulation,
    voxel: VoxelCursorInterface,
    x: number,
    y: number,
    z: number
  ): void;

  onErase?(
    simulation: DimensionSimulation,
    voxel: VoxelCursorInterface,
    x: number,
    y: number,
    z: number
  ): void;

  onTick?(
    simulation: DimensionSimulation,
    voxel: VoxelCursorInterface,
    x: number,
    y: number,
    z: number
  ): void;
}

export interface Voxel<Data = null> {
  type: string;
  direction: VoxelFaceNames;
  source: VoxelCursorInterface;
}

export class VoxelBehavior {
  constructor(public data: VoxelBehaviorsData) {}
  onPaint(simulation: DimensionSimulation, x: number, y: number, z: number) {
    if (!this.data.onPaint) return;
    const voxel = simulation.getVoxelForUpdate(x, y, z);
    this.data.onPaint(simulation, voxel, x, y, z);
  }
  onErase(simulation: DimensionSimulation, x: number, y: number, z: number) {
    if (!this.data.onErase) return;
    const voxel = simulation.getVoxelForUpdate(x, y, z);
    this.data.onErase(simulation, voxel, x, y, z);
  }
  onTick(simulation: DimensionSimulation, x: number, y: number, z: number) {
    if (!this.data.onTick) return;
    const voxel = simulation.getVoxelForUpdate(x, y, z);
    this.data.onTick(simulation, voxel, x, y, z);
  }
}
