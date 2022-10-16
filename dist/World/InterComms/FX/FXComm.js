import { DataSync } from "../../Data/DataSync.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const fxComm = ThreadComm.createComm("fx");
export const FXComm = fxComm;
DataSync.registerComm(FXComm);
