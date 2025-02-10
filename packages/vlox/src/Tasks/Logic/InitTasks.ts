import { Thread, Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import { VoxelUpdateTask } from "../VoxelUpdateTask";
import { LocationData } from "../../Math";
import { VoxelLogicUpdate } from "./VoxelLogicUpdate";
export default function () {
  const tasks = new VoxelUpdateTask();
  Threads.registerTask<LocationData>(
    TasksIds.LogicUpdate,
    async (data, origin) => {
      VoxelLogicUpdate(tasks, data);
    }
  );
}
