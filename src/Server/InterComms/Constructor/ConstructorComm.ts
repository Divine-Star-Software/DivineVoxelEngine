//types
import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
//objects

import { CreateInterComm } from "../../../Comms/InterComm.js";

export const GetNewConstructorComm = (
 count: number,
 port: InterCommPortTypes
) => {
 const newComm: InterCommInterface = CreateInterComm(
  `server-constructor-${count}`,
  { ready: false }
 );

 newComm.setPort(port);
 return newComm;
};
