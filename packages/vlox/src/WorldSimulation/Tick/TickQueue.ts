import { DimensionSegment } from "../Internal/Classes/DimensionSegment";
import { VoxelUpdateTick } from "./VoxelUpdateTick";
import { VoxelUpdateRegister } from "./VoxelUpdateRegister";
import "./Types/index";
const tickArrayPool: VoxelUpdateTick[][] = [];

export class TickQueue {
  constructor(public dimension: DimensionSegment) {}
  ticks = new Map<number, VoxelUpdateTick[]>();
  _lastTick = 0;

  addTick(data: VoxelUpdateTick, delay = 0) {
    const trueTick = this._lastTick + 1 + delay;
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
    this._lastTick = tick;

    const updates = this.ticks.get(tick);

    if (!updates) return false;

    while (updates.length) {
      const update = updates.shift()!;
      const type = VoxelUpdateRegister.getUpdateType(update.type);
      type.run(this.dimension.simulation, update);
    }

    this.ticks.delete(tick);
    tickArrayPool.push(updates);

    return true;
  }
}
