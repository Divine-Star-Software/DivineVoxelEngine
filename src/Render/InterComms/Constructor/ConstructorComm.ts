//types
import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
import type { VoxelSubstanceType } from "Meta/index.js";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { ConstructorToRenderMessages } from "../../../Constants/InterComms/ConstructorToRender.js";

const handleUpdate = (substance: VoxelSubstanceType, data: any) => {
 const chunkX = data[2];
 const chunkY = data[3];
 const chunkZ = data[4];
 const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(
  chunkX,
  chunkY,
  chunkZ
 );
 /**
  * @TODO change over the handle update function to handle the new data index
  */
 DVER.meshManager.handleChunkUpdate(substance, chunkKey, data);
};

const substanceFunctionMap = {
 0: (data: any) => {
  handleUpdate("solid", data);
 },
 1: (data: any) => {
  handleUpdate("flora", data);
 },
 2: (data: any) => {
  handleUpdate("fluid", data);
 },
 3: (data: any) => {
  handleUpdate("magma", data);
 },
};
export const GetNewConstructorComm = (
 count: number,
 port: InterCommPortTypes
) => {
 const newComm: InterCommInterface = CreateInterComm(
  `render-constructor-${count}`,
  { ready: false }
 );
 newComm.messageFunctions[ConstructorToRenderMessages.setChunk] = (data) => {
  const substance: 0 | 1 | 2 | 3 = data[1];
  substanceFunctionMap[substance](data);
 };
 newComm.messageFunctions[ConstructorToRenderMessages.removeChunk] = (data) => {
  const substance: VoxelSubstanceType = data[1];
  const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(
   data[2],
   data[3],
   data[4]
  );
  DVER.meshManager.removeChunkMesh(substance, chunkKey);
 };

 newComm.messageFunctions[ConstructorToRenderMessages.constructEntity] = (
  data
 ) => {
  DVER.meshManager.handleEntityUpdate(data[1], data[2], data[3], data);
 };
 newComm.messageFunctions[ConstructorToRenderMessages.constructItem] = (
  data
 ) => {
  DVER.meshManager.handleItemUpdate(data[1], data[2], data[3], data);
 };
 newComm.setPort(port);
 return newComm;
};
