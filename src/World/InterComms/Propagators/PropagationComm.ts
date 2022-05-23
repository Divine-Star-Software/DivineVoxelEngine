import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";


export const GetNewPropagationComm = (count: number, port: InterCommPortTypes) => {
 const threadName = `propagation-${count}`;
 const newComm: InterCommInterface = CreateInterComm(threadName, {
  ready: false,
 });
 newComm.onSetPort((port) => {
  newComm.name = threadName;
  DVEW.matrixCentralHub.registerThread(threadName, port);
  if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
   DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(threadName);
  }
 });
 newComm.setPort(port);
 DVEW.propagationCommManager.numWorldGens++;
 newComm.messageFunctions = {
  ready: (data, event) => {
    DVEW.propagationCommManager.worldGensConnected++;
  },
  0: (data, event) => {
   const x = data[1];
   const y = data[2];
   const z = data[3];
   const substance = data[4];
   DVEW.queues.addToRebuildQue(x, y, z, substance);
  },
  1: (data, event) => {
   DVEW.queues._numRGBLightUpdates--;
  },
  2: (data, event) => {
   DVEW.queues._numRGBLightRemoves--;
  },
 };

 return newComm;
};
