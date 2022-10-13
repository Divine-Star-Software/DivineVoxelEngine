import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const worldComm = ThreadComm.createComm("server-world", {});
export const WorldComm = worldComm;
