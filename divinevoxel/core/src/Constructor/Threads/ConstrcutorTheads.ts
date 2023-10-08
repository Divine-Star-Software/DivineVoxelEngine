import { ThreadComm } from "@divinestar/threads/";

export const ParentComm = ThreadComm.parent;
export const RichWorldComm = ThreadComm.createComm("rich-world");
export const WorldComm = ThreadComm.createComm("world");
