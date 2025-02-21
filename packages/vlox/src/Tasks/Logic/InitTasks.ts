import { Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import { VoxelUpdateTask } from "../VoxelUpdateTask";
import { VoxelLogicUpdate } from "./VoxelLogicUpdate";
import { getLocationData } from "../../Util/LocationData";

export default function () {
  const tasks = new VoxelUpdateTask();
  Threads.registerBinaryTask(TasksIds.LogicUpdate, (view) => {
    const location = getLocationData(view);
    VoxelLogicUpdate(tasks, location);
  });
}
