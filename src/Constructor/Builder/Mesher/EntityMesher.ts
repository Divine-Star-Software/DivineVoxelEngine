import type { ChunkTemplate } from "Meta/Constructor/ChunkTemplate.types";
import { ConstructorToRenderMessages } from "../../../Common/Threads/Contracts/ConstructorToRender.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { VoxelMesher } from "../Tools/VoxelMesher.js";

export const EntityMesher = {
 buildEntityMesh(x: number, y: number, z: number, template: ChunkTemplate) {
  const meshData = VoxelMesher.$buildMesh("solid", template);

  DVEC.parentComm.sendMessage(
   ConstructorToRenderMessages.constructEntity,
   [x, y, z, ...meshData[0]],
   meshData[1]
  );
 },
};
