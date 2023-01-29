import type {
 RemoveChunkMeshTasks,
 RemoveChunksOutsideDistance,
 SetChunkMeshTask,
} from "Meta/Tasks/RenderTasks.types";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import { Distance3D } from "../../Math/Functions/Distance3d.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { MeshManager } from "../Scene/MeshManager.js";
import { MeshRegister } from "../../Render/Scene/MeshRegister.js";

export const RenderTasks = {
 setChunk: ThreadComm.registerTasks<SetChunkMeshTask>("set-chunk", (data) => {
  MeshManager.chunks.update(data);
 }),
 removeChunk: ThreadComm.registerTasks<RemoveChunkMeshTasks>(
  "remove-chunk",
  (data) => {
   MeshManager.chunks.remove(data);
  }
 ),
 removeColumn: ThreadComm.registerTasks<LocationData>(
  "remove-column",
  (data) => {
   MeshManager.chunks.removeColumn(data);
  }
 ),
 removeColumnsOutsideRadius:
  ThreadComm.registerTasks<RemoveChunksOutsideDistance>(
   "remove-column-outside-radius",
   (data) => {
    const [dimesnionId, x, y, z] = data[0];
    const maxRadius = data[1];
    const dimension = MeshRegister.dimensions.get(dimesnionId);
    if (!dimension) return;
    dimension.forEach((region) => {
     region.columns.forEach((column) => {
      const location = column.location;
      const distnace = Distance3D(location[1], 0, location[3], x, 0, z);
      if (distnace > maxRadius) {
       MeshManager.chunks.removeColumn(location);
      }
     });
    });
   }
  ),
};
