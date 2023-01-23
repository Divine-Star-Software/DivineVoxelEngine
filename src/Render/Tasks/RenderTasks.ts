import type {
 RemoveChunkMeshTasks,
 RemoveChunksOutsideDistance,
 SetChunkMeshTask,
} from "Meta/Tasks/RenderTasks.types";
import type { LocationData } from "Meta/Data/CommonTypes.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DVER } from "../DivineVoxelEngineRender.js";
import { Distance3D } from "../../Libs/Math/Functions/Distance3d.js";
import { MeshManager } from "../Scene/MeshManager.js";

export const RenderTasks = {
 setChunk: ThreadComm.registerTasks<SetChunkMeshTask>("set-chunk", (data) => {
  DVER.meshManager.updateChunk(data);
 }),
 removeChunk: ThreadComm.registerTasks<RemoveChunkMeshTasks>(
  "remove-chunk",
  (data) => {
   DVER.meshManager.removeChunk(data);
  }
 ),
 removeColumn: ThreadComm.registerTasks<LocationData>(
  "remove-column",
  (data) => {
   DVER.meshManager.removeColumn(data);
  }
 ),
 removeColumnsOutsideRadius:
  ThreadComm.registerTasks<RemoveChunksOutsideDistance>(
   "remove-column-outside-radius",
   (data) => {
    const dimesnionId = data[0];
    const x = data[1];
    const y = data[2];
    const z = data[3];
    const maxRadius = data[4];
    const register = DVER.renderManager.meshRegister;
    const dimension = register.dimensions.get(dimesnionId);
    if (!dimension) return;
    dimension.forEach((region) => {
     region.columns.forEach((column) => {
      const pos = column.position;
      const distnace = Distance3D(pos[0], 0, pos[2], x, 0, z);
      if (distnace > maxRadius) {

        MeshManager.removeColumn([dimesnionId, pos[0], pos[1], pos[2]])
      }
     });
    });
   }
  ),
};
