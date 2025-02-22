import { DimensionSegment } from "../Dimensions/DimensionSegment";
import {
  VoxelTickUpdateRegister,
  VoxelTickUpdate,
} from "../Voxels/Ticks/index";

const tickArrayPool: VoxelTickUpdate[][] = [];

export class TickQueue {
  constructor(public dimension: DimensionSegment) {}
  ticks = new Map<number, VoxelTickUpdate[]>();

  addTick(data: VoxelTickUpdate, delay = 0) {
    const trueTick = this.dimension.getTick() + 1 + delay;
    if (!this.ticks.get(trueTick)) {
      this.ticks.set(
        trueTick,
        tickArrayPool.length ? tickArrayPool.shift()! : []
      );
    }
    const ticks = this.ticks.get(trueTick)!;
    ticks.push(data);
  }

  run() {
    const tick = this.dimension.getTick();

    const updates = this.ticks.get(tick);

    if (!updates) return false;

    while (updates.length) {
      const update = updates.shift()!;
      const type = VoxelTickUpdateRegister.getUpdateType(update.type);
      type.run(this.dimension.simulation, update);
    }

    this.ticks.delete(tick);
    tickArrayPool.push(updates);

    return true;
  }
}
