import { ThreadComm } from "threadcomm";
const worldComm = ThreadComm.createComm("world", {});
export const WorldComm = worldComm;
