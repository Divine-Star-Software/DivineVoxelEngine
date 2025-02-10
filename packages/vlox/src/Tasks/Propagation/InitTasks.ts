import { Threads } from "@amodx/threads";
import { ExplosionTasks } from "../Tasks.types";
import { TasksIds } from "../TasksIds";
import { VoxelUpdateTask } from "../VoxelUpdateTask";

import { LocationData } from "../../Math";
import { WorldSpaces } from "../../World/WorldSpaces";
import { RunWorldSun } from "./Illumanation/WorldSun";
import { ExplosionManager } from "./Explosion/ExplosionManager";
import { WorldRGB } from "./Illumanation/WorldRGB";
import { WorldFlow } from "./Flow/WorldFlow";

export default function InitTasks() {

  Threads.registerTask<LocationData>(TasksIds.Propagation, async (location) => {
    const task = new VoxelUpdateTask();
    task.setOrigin(location);
    WorldRGB(task);
  //  task.setOrigin(location);
   // WorldFlow(task);
  });

  Threads.registerTask<ExplosionTasks>(TasksIds.Explosion, async (data) => {
    const location = data[0];
    const sectorPosition = WorldSpaces.sector.getPosition(
      location[1],
      location[2],
      location[3]
    );
    const task = new VoxelUpdateTask();
    task.setOrigin([
      location[0],
      sectorPosition.x,
      sectorPosition.y,
      sectorPosition.z,
    ]);
    ExplosionManager.runExplosion(task, data[1]);
  });

  Threads.registerTask<LocationData>(TasksIds.WorldSun, (location) => {
    const sectorPosition = WorldSpaces.sector.getPosition(
      location[1],
      location[2],
      location[3]
    );
    const task = new VoxelUpdateTask();
    task.setOrigin([
      location[0],
      sectorPosition.x,
      sectorPosition.y,
      sectorPosition.z,
    ]);
    RunWorldSun(task);
  });
}
