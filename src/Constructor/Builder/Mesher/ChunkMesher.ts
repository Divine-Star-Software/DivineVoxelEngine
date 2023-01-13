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

  const chunks: SetChunkMeshTask = [dimension, chunkX, chunkY, chunkZ, []];
  const trasnfers: any[] = [];

  while (i--) {
   const type = this.voxelBuildOrder[i];
   const baseTemplate = template[type];

   if (baseTemplate.positionTemplate.length == 0) {
    chunks[4].push([type, false]);
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

   chunks[4].push([
    type,
    //@ts-ignore
    ...meshData[0],
   ]);
   trasnfers.push(...meshData[1]);
  }

  DVEC.parentComm.runTasks<SetChunkMeshTask>("set-chunk", chunks, trasnfers);
 },
};
