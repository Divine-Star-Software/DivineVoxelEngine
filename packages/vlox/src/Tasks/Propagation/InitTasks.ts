import { Threads } from "@amodx/threads";
import {
  ExplosionTasks,
  VoxelUpdateTasks,
  WorldSunTask,
} from "../Tasks.types";
import { TasksIds } from "../TasksIds";
import { UpdateTask } from "../Update/UpdateTask";
import { PaintAndUpdate } from "../Update/VoxelUpdate";
import { Propagation } from "./Propagation";

export default function InitTasks() {
  const propagation = new Propagation();
  Threads.registerTasks<VoxelUpdateTasks>(
    TasksIds.VoxelPaint,
    async (data, onDone) => {
      await PaintAndUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<ExplosionTasks>(TasksIds.Explosion, async (data) => {
    await propagation.explosion(new UpdateTask(), data[1]);
  });

  Threads.registerTasks<WorldSunTask>(
    TasksIds.WorldSun,
    (data, onDone) => {
      const task = new UpdateTask();
      task.setOrigin(data[0]);
      propagation.worldSun(task);
      if (onDone) onDone();
    },
    "deferred"
  );
}
