import InitDataSync from "../Contexts/Base/Remote/InitDataSync";
import { DivineVoxelEngineWorld } from "../Contexts/World/DivineVoxelEngineWorld";
import { Thread, Threads } from "@amodx/threads/";
import InitWorldTasks from "../World/InitTasks";
import { Environment } from "../Util/Environment";
import { WorldStorageInterface } from "World/Types/WorldStorage.interface";
type StartWorldProps = {
  worldStorage?: WorldStorageInterface;
};
export async function StartWorld(props: StartWorldProps = {}) {
  const DVEW = new DivineVoxelEngineWorld();

  DivineVoxelEngineWorld.environment = Environment.isNode()
    ? "node"
    : "browser";
  Threads.threadName = "world";
  let parent = "render";
  if (DivineVoxelEngineWorld.environment == "node") {
    parent = "server";
  }
  await Threads.init("world", self, parent);
  let ready = false;
  InitDataSync({
    onSync(data) {
      if (data.threads.nexus) {
        DVEW.threads.addThread(DVEW.threads.nexus);
      }
      ready = true;
    },
  });

  await new Promise((resolve) => {
    const readyCheck = () => {
      if (ready) return resolve(true);
      setTimeout(readyCheck, 10);
    };
    readyCheck();
  });

  const threads: Thread[] = [
    DVEW.threads.parent,
    ...DVEW.threads.meshers.getThreads(),
    ...DVEW.threads.generators.getThreads(),
  ];
  if (DVEW.threads.nexus.isPortSet) {
    threads.push(DVEW.threads.nexus);
  }

  InitWorldTasks({
    threads,
    worldStorage: props.worldStorage,
  });
  return DVEW;
}
