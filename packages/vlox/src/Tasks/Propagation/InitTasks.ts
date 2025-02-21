import { Threads } from "@amodx/threads";
import { ExplosionTasks } from "../Tasks.types";
import { TasksIds } from "../TasksIds";
import { VoxelUpdateTask } from "../VoxelUpdateTask";

import { WorldSpaces } from "../../World/WorldSpaces";
import { RunWorldSun } from "./Illumanation/WorldSun";
import { ExplosionManager } from "./Explosion/ExplosionManager";
import { WorldRGB } from "./Illumanation/WorldRGB";

import { WorldRegister } from "../../World/WorldRegister";
import { Sector } from "../../World";
import { getLocationData } from "../../Util/LocationData";
import { PropagationUpdate } from "./PropagationUpdate";

export default function InitTasks() {
  const task = new VoxelUpdateTask();

  Threads.registerBinaryTask(TasksIds.PropagationUpdate, (view) => {
    const location = getLocationData(view);
    PropagationUpdate(location);
  });

  Threads.registerBinaryTask(TasksIds.WorldPropagation, (view) => {
    const location = getLocationData(view);
    task.setOrigin(...location);
    WorldRGB(task);
    WorldRegister.sectors
      .get(...location)!
      .setBitFlag(Sector.FlagIds.isWorldPropagationDone, true);
  });

  Threads.registerTask<ExplosionTasks>(TasksIds.Explosion, async (data) => {
    const location = data[0];
    const sectorPosition = WorldSpaces.sector.getPosition(
      location[1],
      location[2],
      location[3]
    );

    task.setOriginAt([
      location[0],
      sectorPosition.x,
      sectorPosition.y,
      sectorPosition.z,
    ]);
    ExplosionManager.runExplosion(task, data[1]);
  });

  Threads.registerBinaryTask(TasksIds.WorldSun, (view) => {
    const location = getLocationData(view);
    task.setOrigin(...location);
    RunWorldSun(task);
  });
}
