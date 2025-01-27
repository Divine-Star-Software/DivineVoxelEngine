import { Thread, Threads } from "@amodx/threads";
import { WorldRegister } from "../World/WorldRegister";
import { WorldSpaces } from "../World/WorldSpaces";
import { MeshChunk } from "../Mesher/Functions/MeshChunk";
import { TasksIds } from "../Tasks/TasksIds";
import { LocationData } from "../Math";
import { SetChunkMeshTask } from "../Renderer/Renderer.types";

export default function (rendererThread: Thread) {
  Threads.registerTask<LocationData>(TasksIds.BuildChunk, (location) => {
    const chunk = MeshChunk(location);
    console.log("MESH CHUNK", location, chunk);
    if (!chunk) return;
    rendererThread.runTask<SetChunkMeshTask>("set-chunk", chunk[0], chunk[1]);
  });

  Threads.registerTask<LocationData>(TasksIds.BuildColumn, (location) => {
    WorldRegister.setDimension(location[0]);
    const columnPositon = WorldSpaces.column.getPositionXYZ(
      location[1],
      location[2],
      location[3]
    );
    const column = WorldRegister.column.get(
      columnPositon.x,
      columnPositon.y,
      columnPositon.z
    );
    if (!column) {
      console.warn("Tried building a column that does not exists.", [
        columnPositon.x,
        columnPositon.y,
        columnPositon.z,
      ]);
      return;
    }
    if (column.chunks.length == 0) {
      console.warn("Tried building a column with no chunks.", column.position);
      return;
    }

    for (let i = 0; i < column.chunks.length; i++) {
      const chunk = column.chunks[i];
      if (!chunk) continue;
      const chunkMesh = MeshChunk([
        location[0],
        column.position[0],
        column.position[1] + i * WorldSpaces.chunk.getHeight(),
        column.position[2],
      ]);
      if (!chunkMesh) continue;
      rendererThread.runTask<SetChunkMeshTask>(
        "set-chunk",
        chunkMesh[0],
        chunkMesh[1]
      );
    }
  });
}
