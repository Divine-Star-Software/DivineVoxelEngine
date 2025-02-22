import { Thread, Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import { VoxelUpdateTasks } from "../Tasks.types";
import { VoxelUpdate } from "./VoxelUpdate";
import { VoxelUpdateTask } from "../VoxelUpdateTask";
import { LocationData } from "Math";
import { EraseUpdate } from "./EraseUpdate";
import { PaintAndUpdate } from "./PaintUpdate";
export default function (props: {
  onDone(taks: VoxelUpdateTask, origin: Thread): void;
}) {
  Threads.registerTask<VoxelUpdateTasks>(
    TasksIds.VoxelUpdate,
    (data, origin) => {
      const tasks = VoxelUpdate(data);
      if (!tasks) return;
      props.onDone(tasks, origin);
    }
  );

  Threads.registerTask<LocationData>(TasksIds.VoxelErase, (data, origin) => {
    const tasks = EraseUpdate(data);
    if (!tasks) return;
    props.onDone(tasks, origin);
  });

  Threads.registerTask<VoxelUpdateTasks>(
    TasksIds.VoxelPaint,
    (data, origin) => {
      const tasks = PaintAndUpdate(data);
      if (!tasks) return;
      props.onDone(tasks, origin);
    }
  );
}
