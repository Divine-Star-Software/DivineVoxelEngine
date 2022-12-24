//types
import type { VoxelTemplateSubstanceType } from "Meta/index";
import type { FullChunkTemplate } from "Meta/Constructor/ChunkTemplate.types.js";
import type {
 RemoveChunkMeshTasks,
 SetChunkMeshTask,
} from "Meta/Tasks/RenderTasks.types.js";
//objects
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { VoxelMesher } from "../Tools/VoxelMesher.js";

export const ChunkMesher = {
 voxelBuildOrder: <VoxelTemplateSubstanceType[]>[
  "solid",
  "flora",
  "liquid",
  "magma",
 ],

 buildChunkMesh(
  dimension: string,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  template: FullChunkTemplate,
  LOD = 1
 ) {
  let i = this.voxelBuildOrder.length;

  while (i--) {
   const type = this.voxelBuildOrder[i];
   const baseTemplate = template[type];

   if (baseTemplate.positionTemplate.length == 0) {
    DVEC.parentComm.runTasks<RemoveChunkMeshTasks>("remove-chunk", [
     dimension,
     type,
     chunkX,
     chunkY,
     chunkZ,
    ]);
    continue;
   }

   const meshData = VoxelMesher.$buildMesh(
    type,
    baseTemplate,
    LOD,
    chunkX,
    chunkY,
    chunkZ
   );

   DVEC.parentComm.runTasks<SetChunkMeshTask>(
    "set-chunk",
    [
     dimension,
     type,
     chunkX,
     chunkY,
     chunkZ,
     //@ts-ignore
     ...meshData[0],
    ],
    meshData[1]
   );
  }
 },
};
