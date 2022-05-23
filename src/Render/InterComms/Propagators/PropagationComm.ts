//types
import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
export const GetNewPropagationComm = (count: number, port: InterCommPortTypes) => {
 const newComm: InterCommInterface =  CreateInterComm(`propagation-${count}`, { ready: false });
 newComm.messageFunctions = {};
 newComm.setPort(port);
 return newComm;
};
