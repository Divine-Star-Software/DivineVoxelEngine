import { Threads } from "@amodx/threads";
import { BuildTasks, PriorityTask } from "../Tasks.types";
import { WorldRegister } from "../../Data/World/WorldRegister";
import { WorldSpaces } from "../../Data/World/WorldSpaces";
import { DVEMesher } from "../../Mesher/Mesher";
import { TasksIds } from "../TasksIds";
import { BuildNodeMesh } from "../../Mesher/Tasks/BuidlerTasks.types";

export default function (mesher: DVEMesher) {
  Threads.registerTasks<BuildNodeMesh>(
    "build-node-mesh",
    (data, onDone) => {
      const nodeData = mesher.nodes.buildNode(data);
      if (!nodeData) return onDone ? onDone(false) : 0;
      onDone ? onDone(nodeData[0], nodeData[1]) : 0;
    },
    "deferred"
  );

  Threads.registerTasks<PriorityTask<BuildTasks>>(
    TasksIds.BuildChunk,
    async (buildData, onDone) => {
      WorldRegister.instance.cache.enable();
      const location = buildData.data[0];
      await mesher.meshChunk(location, buildData.data[1], 0);
      if (onDone) onDone();
      WorldRegister.instance.cache.disable();
    }
  );

  Threads.registerTasks<BuildTasks>(
    TasksIds.BuildColumn,
    async (data, onDone) => {
      WorldRegister.instance.setDimension(data[0][0]);
      const column = WorldRegister.instance.column.get(
        data[0][1],
        data[0][2],
        data[0][2]
      );
      if (!column) {
        console.warn("Tried building a column that does not exists.", data);
        return false;
      }
      if (column.chunks.length == 0) return false;
      const location = data[0];
      WorldRegister.instance.cache.enable();
      for (let i = 0; i < column.chunks.length; i++) {
        const chunk = column.chunks[i];
        if (!chunk) continue;

        mesher.meshChunk(
          [
            location[0],
            location[1],
            location[2] + i * WorldSpaces.chunk.getHeight(),
            location[3],
          ],
          1,
          100
        );
      }

      if (onDone) onDone();
      WorldRegister.instance.cache.disable();
    },
    "deferred"
  );
}
