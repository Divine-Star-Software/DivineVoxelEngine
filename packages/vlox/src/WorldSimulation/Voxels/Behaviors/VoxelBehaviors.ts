import { DimensionSimulation } from "../../Dimensions/DimensionSimulation";
import { VoxelCursorInterface } from "../../../Voxels/Cursor/VoxelCursor.interface";

export interface VoxelBehaviorsData {
  type: string;
  inherits?: string;
  onInteract?(
    simulation: DimensionSimulation,
    voxel: VoxelCursorInterface,
    x: number,
    y: number,
    z: number
  ): void;

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

export class VoxelBehavior {
  constructor(public data: VoxelBehaviorsData) {}
  onInteract(simulation: DimensionSimulation, x: number, y: number, z: number) {
    if (!this.data.onInteract) return;
    const voxel = simulation.getVoxelForUpdate(x, y, z);
    this.data.onInteract(simulation, voxel, x, y, z);
  }
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
