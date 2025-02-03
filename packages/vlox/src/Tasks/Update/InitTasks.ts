import { Thread, Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import { VoxelUpdateTasks } from "../Tasks.types";
import { VoxelUpdate, EreaseAndUpdate, PaintAndUpdate } from "./VoxelUpdate";
import { UpdateTask } from "./UpdateTask";
import { LocationData } from "Math";
export default function (props: {
  onDone(taks: UpdateTask, origin: Thread): void;
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
    TasksIds.VoxelErease,
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
