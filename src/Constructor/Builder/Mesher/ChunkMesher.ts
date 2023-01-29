//types
import type { VoxelTemplateSubstanceType } from "Meta/index";
import type { FullVoxelSubstanceTemplate } from "Meta/Constructor/VoxelTemplate.types.js";
import type { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";
//objects
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { VoxelMesher } from "../Tools/VoxelMesher.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";

export const ChunkMesher = {
 voxelBuildOrder: <VoxelTemplateSubstanceType[]>[
  "solid",
  "flora",
  "liquid",
  "magma",
 ],

 buildChunkMesh(
  location: LocationData,
  template: FullVoxelSubstanceTemplate,
  LOD = 1
 ) {
  let i = this.voxelBuildOrder.length;

  const chunks: SetChunkMeshTask = [location, []];
  const trasnfers: any[] = [];

  while (i--) {
   const type = this.voxelBuildOrder[i];
   const baseTemplate = template[type];

   if (baseTemplate.positionTemplate.length == 0) {
    chunks[1].push([type, false]);
    continue;
   }

   const meshData = VoxelMesher.$buildMesh(type, baseTemplate, LOD, location);
   if (!meshData) return;
   chunks[1].push([
    type,
    //@ts-ignore
    ...meshData[0],
   ]);
   trasnfers.push(...meshData[1]);
  }

  DVEC.parentComm.runTasks<SetChunkMeshTask>("set-chunk", chunks, trasnfers);
 },
};
