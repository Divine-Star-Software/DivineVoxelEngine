import { Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import {  VoxelUpdateTasks } from "../Tasks.types";
import { VoxelUpdate, EreaseAndUpdate, PaintAndUpdate } from "./VoxelUpdate";
import { UpdateTask } from "./UpdateTask";
import { LocationData } from "Math";
export default function (props: { onDone(taks: UpdateTask): void }) {
  Threads.registerTask<VoxelUpdateTasks>(TasksIds.VoxelUpdate, async (data) => {
    const tasks = await VoxelUpdate(data);
    if (!tasks) return;
    props.onDone(tasks);
  });

  Threads.registerTask<LocationData>(TasksIds.VoxelErease, async (data) => {
    const tasks = await EreaseAndUpdate(data);
    if (!tasks) return;
    props.onDone(tasks);
  });

  Threads.registerTask<VoxelUpdateTasks>(TasksIds.VoxelPaint, async (data) => {
    const tasks = await PaintAndUpdate(data);
    if (!tasks) return;
    props.onDone(tasks);
  });
}
