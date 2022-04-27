import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

const builderComm = CreateInterComm("world-builder-base", {});
builderComm.messageFunctions = {
 "connect-shape-map": (data, event) => {
     if(!event)return;
  if (DVEW.voxelManager.fluidShapMapIsSet()) return;
  DVEW.voxelManager.setFluidShapeMap(event.data[1]);
 },
};

export const GetNewBuilderComm = (count: number, port: InterCommPortTypes) => {
 const newComm: InterCommInterface = Object.create(builderComm);
 newComm.onSetPort((port) => {
  DVEW.matrixCentralHub.registerThread(`builder-${count}`, port);
 });
 newComm.setPort(port);
 return newComm;
};
