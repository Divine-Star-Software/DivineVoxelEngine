import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

const builderComm = CreateInterComm("world-builder-base", {ready:false});
builderComm.messageFunctions = {
 "connect-shape-map": (data, event) => {
  if (!event) return;
  if (DVEW.voxelManager.fluidShapMapIsSet()) return;
  DVEW.voxelManager.setFluidShapeMap(event.data[1]);
 },

};

builderComm.listenForMessage("connect-shape-map", (data, event) => {

 if (!event) return;
 DVEW.voxelManager.setShapeMap(data[1]);
});

export const GetNewBuilderComm = (count: number, port: InterCommPortTypes) => {
 const newComm: InterCommInterface = Object.create(builderComm);
 newComm.onSetPort((port) => {
  const threadName = `builder-${count}`;
  newComm.name = threadName;
  DVEW.matrixCentralHub.registerThread(threadName, port);
  if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
   DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(threadName);
  }
  
 });

 newComm.messageFunctions = {
     "ready" : function(){
        console.log(this);
     }
 }
 newComm.setPort(port);
 return newComm;
};
