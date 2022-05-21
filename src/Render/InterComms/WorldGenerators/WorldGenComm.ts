//types
import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
export const GetNewWorldGenComm = (count: number, port: InterCommPortTypes) => {
 const newComm: InterCommInterface =  CreateInterComm("render-world-gen-base", { ready: false });
 newComm.name = `worldgen-${count}`;
 newComm.messageFunctions = {};
 newComm.setPort(port);
 return newComm;
};
