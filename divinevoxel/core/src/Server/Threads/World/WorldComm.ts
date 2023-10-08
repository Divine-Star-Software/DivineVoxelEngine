import { ThreadComm } from "@divinestar/threads/";
const worldComm = ThreadComm.createComm("world", {});
export const WorldComm = worldComm;
