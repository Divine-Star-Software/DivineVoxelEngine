import { LocationData } from "../../../Math/index.js";
import { WorldSimulationDimensions } from "../WorldSimulationDimensions.js";
import { DimensionSegment } from "./DimensionSegment.js";

export type WorldSimulationTaskBase = {
  id: string;
  propagationBlocking?: boolean;
  run(
    location: LocationData,
    onDone: () => void,
    dimension: DimensionSegment
  ): void;
};

export class IWGTaskBase {
  constructor(public data: WorldSimulationTaskBase) {}

  add(dimensionId: number, x: number, y: number, z: number) {
    const dimension = WorldSimulationDimensions.getDimension(dimensionId);
    const task = dimension.getTask(this.data.id);
    if (task.vistedMap.has(x, y, z)) return;
    if (this.data.propagationBlocking && dimension.inProgress.has(x, y, z))
      return;
    task.queue.push(x, y, z);
    task.vistedMap.add(x, y, z);
  }

  remove(dimensionId: number, x: number, y: number, z: number) {
    const dimension = WorldSimulationDimensions.getDimension(dimensionId);
    const task = dimension.getTask(this.data.id);
    task.vistedMap.remove(x, y, z);
    if (this.data.propagationBlocking) {
      dimension.inProgress.remove(x, y, z);
    }
  }

  cancelAll(dimensionId: number | null = null) {
    if (dimensionId) {
      const dimension = WorldSimulationDimensions.getDimension(dimensionId);
      const task = dimension.getTask(this.data.id);
      task.clear();
    } else {
      for (const [key, dimension] of WorldSimulationDimensions._dimensions) {
        dimension.clearAllTasks();
      }
    }
  }

  runTask(max = 1000) {
    for (const [key, dimension] of WorldSimulationDimensions._dimensions) {
      const task = dimension.getTask(this.data.id);
      if (task.waitingFor < 0) task.waitingFor = 0;
      if (task.waitingFor >= max) continue;
      while (task.waitingFor < max && task.queue.length) {
        const x = task.queue.shift()!;
        const y = task.queue.shift()!;
        const z = task.queue.shift()!;
        task.waitingFor++;
        if (this.data.propagationBlocking) {
          dimension.inProgress.add(x, y, z);
        }
        this.data.run(
          [dimension.id, x, y, z],
          () => {
            task.vistedMap.remove(x, y, z);
            if (this.data.propagationBlocking) {
              dimension.inProgress.remove(x, y, z);
            }
            task.waitingFor--;
          },
          dimension
        );
      }
    }
  }
}
