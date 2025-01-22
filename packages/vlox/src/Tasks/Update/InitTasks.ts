import { Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import { AnaylzerTask, VoxelUpdateTasks } from "../Tasks.types";
import { VoxelUpdate, EreaseAndUpdate, PaintAndUpdate } from "./VoxelUpdate";
import { UpdateTask } from "./UpdateTask";
export default function (props: { onDone(taks: UpdateTask): void }) {
  Threads.registerTasks<VoxelUpdateTasks>(
    TasksIds.VoxelUpdate,
    async (data, onDone) => {
      const tasks = await VoxelUpdate(data);
      if (!tasks) {
        if (onDone) onDone();
        return;
      }
      props.onDone(tasks);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<AnaylzerTask>(
    TasksIds.VoxelErease,
    async (data, onDone) => {
      const tasks = await EreaseAndUpdate(data);
      if (!tasks) {
        if (onDone) onDone();
        return;
      }
      props.onDone(tasks);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<VoxelUpdateTasks>(
    TasksIds.VoxelPaint,
    async (data, onDone) => {
      const tasks = await PaintAndUpdate(data);
      if (!tasks) {
        if (onDone) onDone();
        return;
      }
      props.onDone(tasks);
      if (onDone) onDone();
    },
    "deferred"
  );
}
