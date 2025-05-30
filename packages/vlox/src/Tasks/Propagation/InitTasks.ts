import { Threads } from "@amodx/threads";
import { TasksIds } from "../TasksIds";
import { VoxelUpdateTask } from "../VoxelUpdateTask";
import { RunWorldSun } from "./Illumanation/WorldSun";
import { WorldRGB } from "./Illumanation/WorldRGB";
import { WorldRegister } from "../../World/WorldRegister";
import { Sector } from "../../World";
import { getLocationData } from "../../Util/LocationData";

export default function InitTasks() {
  const task = new VoxelUpdateTask();

  Threads.registerBinaryTask(TasksIds.WorldPropagation, (view) => {
    const location = getLocationData(view);
    task.setOrigin(...location);
    WorldRGB(task);
    WorldRegister.sectors
      .get(...location)!
      .setBitFlag(Sector.FlagIds.isWorldPropagationDone, true);
  });

  Threads.registerBinaryTask(TasksIds.WorldSun, (view) => {
    const location = getLocationData(view);
    task.setOrigin(...location);
    RunWorldSun(task);
    WorldRegister.sectors
      .get(...location)!
      .setBitFlag(Sector.FlagIds.isWorldSunDone, true);
  });
}
