import { CreateInterComm } from "../../../Comms/InterComm.js";
const worldComm = CreateInterComm("server-world", {});
export const WorldComm = worldComm;
