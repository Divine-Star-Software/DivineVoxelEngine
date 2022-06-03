import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

export const GetNewBuilderComm = (count: number, port: InterCommPortTypes) => {
 const threadName = `builder-${count}`;
 const newComm: InterCommInterface = CreateInterComm(threadName, {
  ready: false,
 });
 newComm.onSetPort((port) => {
  DVEW.matrixCentralHub.registerThread(threadName, port);
  if (DVEW.settings.settings.world?.voxelPaletteMode == "global") {
   DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(threadName);
  }
 });
 DVEW.builderCommManager.numBuilders++;
 newComm.setPort(port);
 newComm.messageFunctions = {
  ready: (data, event) => {

   DVEW.builderCommManager.buildersConnected++;
  },
  0: (data, event) => {
   DVEW.queues._numChunksRebuilding--;
  },
 };
 return newComm;
};
