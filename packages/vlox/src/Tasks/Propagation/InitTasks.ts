import { Threads } from "@amodx/threads";
import { ExplosionTasks } from "../Tasks.types";
import { TasksIds } from "../TasksIds";
import { UpdateTask } from "../Update/UpdateTask";

import { LocationData } from "../../Math";
import { WorldSpaces } from "../../World/WorldSpaces";
import { RunWorldSun } from "./Illumanation/WorldSun";
import { ExplosionManager } from "./Explosion/ExplosionManager";
import { WorldRGB } from "./Illumanation/WorldRGB";
import { WorldFlow } from "./Flow/WorldFlow";

export default function InitTasks() {

  Threads.registerTask<LocationData>(TasksIds.Propagation, async (location) => {
    const task = new UpdateTask();
    task.setOrigin(location);
    WorldRGB(task);
  //  task.setOrigin(location);
   // WorldFlow(task);
  });

  Threads.registerTask<ExplosionTasks>(TasksIds.Explosion, async (data) => {
    const location = data[0];
    const columnPositon = WorldSpaces.column.getPositionXYZ(
      location[1],
      location[2],
      location[3]
    );
    const task = new UpdateTask();
    task.setOrigin([
      location[0],
      columnPositon.x,
      columnPositon.y,
      columnPositon.z,
    ]);
    ExplosionManager.runExplosion(task, data[1]);
  });

  Threads.registerTask<LocationData>(TasksIds.WorldSun, (location) => {
    const columnPositon = WorldSpaces.column.getPositionXYZ(
      location[1],
      location[2],
      location[3]
    );
    const task = new UpdateTask();
    task.setOrigin([
      location[0],
      columnPositon.x,
      columnPositon.y,
      columnPositon.z,
    ]);
    RunWorldSun(task);
  });
}
