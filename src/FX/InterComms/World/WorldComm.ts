import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const worldComm = ThreadComm.createComm("fx", {});
export const WorldComm = worldComm;
