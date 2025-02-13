import { Thread, Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import { VoxelUpdateTasks } from "../Tasks.types";
import { VoxelUpdate } from "./VoxelUpdate";
import { VoxelUpdateTask } from "../VoxelUpdateTask";
import { LocationData } from "Math";
import { EreaseAndUpdate } from "./EreaseUpdate";
import { PaintAndUpdate } from "./PaintUpdate";
export default function (props: {
  onDone(taks: VoxelUpdateTask, origin: Thread): void;
}) {
  Threads.registerTask<VoxelUpdateTasks>(
    TasksIds.VoxelUpdate,
    async (data, origin) => {
      const tasks = await VoxelUpdate(data);
      if (!tasks) return;
      props.onDone(tasks, origin);
    }
  );

  Threads.registerTask<LocationData>(
    TasksIds.VoxelErase,
    async (data, origin) => {
      const tasks = await EreaseAndUpdate(data);
      if (!tasks) return;
      props.onDone(tasks, origin);
    }
  );

  Threads.registerTask<VoxelUpdateTasks>(
    TasksIds.VoxelPaint,
    async (data, origin) => {
      const tasks = await PaintAndUpdate(data);
      if (!tasks) return;
      props.onDone(tasks, origin);
    }
  );
}
