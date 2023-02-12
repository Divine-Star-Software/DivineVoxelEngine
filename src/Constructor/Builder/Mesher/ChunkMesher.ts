//types

import type { VoxelTemplate } from "Meta/Constructor/VoxelTemplate.types.js";
import type { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";
//objects
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { VoxelMesher } from "../Tools/VoxelMesher.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";

export const ChunkMesher = {
 voxelBuildOrder: <string[]>[
  "#dve_solid",
  "#dve_flora",
  "#dve_liquid",
  "#dve_magma",
 ],

 buildChunkMesh(
  location: LocationData,
  template: Record<string, VoxelTemplate>,
  LOD = 1
 ) {
  let i = this.voxelBuildOrder.length;

  const chunks: SetChunkMeshTask = [location, []];
  const trasnfers: any[] = [];

  for (const key of this.voxelBuildOrder) {
   const baseTemplate = template[key];

   if (!baseTemplate) {
    chunks[1].push([key as any, false]);
    continue;
   }

   const meshData = VoxelMesher.$buildMesh(
    key as any,
    baseTemplate,
    LOD,
    location
   );
   if (!meshData) return;
   chunks[1].push([
    key as any,
    //@ts-ignore
    ...meshData[0],
   ]);
   trasnfers.push(...meshData[1]);
  }
  DVEC.parentComm.runTasks<SetChunkMeshTask>("set-chunk", chunks, trasnfers);
 },
};
