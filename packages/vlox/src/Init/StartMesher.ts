import InitDataSync from "../Contexts/Base/Remote/InitDataSync";

import { Threads } from "@amodx/threads";
import { Environment } from "../Util/Environment";
import { WorldRegister } from "../World/WorldRegister";
import InitMesherTasks from "../Mesher/InitTask";
import InitWorldDataSync from "../Contexts/Base/Remote/InitWorldDataSync";
import InitMesher from "../Mesher/InitMesher";
import { DivineVoxelEngineMesher } from "../Contexts/Mesher";
export async function StartMesher(data: {} = {}) {

  WorldRegister.proxy = true;
  const DVEM = new DivineVoxelEngineMesher();


  DivineVoxelEngineMesher.environment = Environment.isNode()
    ? "node"
    : "browser";
  let parent = "render";
  if (DivineVoxelEngineMesher.environment == "node") {
    parent = "server";
  }

  await Threads.init("mesher", self, parent);

  let ready = false;

  InitDataSync({
    onSync(data) {
      InitMesher(data.voxels.materials.palette, data.voxels.models);
      ready = true;
    },
  });

  Threads.registerTask("clear-all", () => {
    WorldRegister.clearAll();
  });

  await new Promise((resolve) => {
    const readyCheck = () => {
      if (ready) return resolve(true);
      setTimeout(readyCheck, 10);
    };
    readyCheck();
  });

  InitWorldDataSync(DVEM.threads.world);
  InitMesherTasks(DVEM.threads.parent);
  return DVEM;
}
