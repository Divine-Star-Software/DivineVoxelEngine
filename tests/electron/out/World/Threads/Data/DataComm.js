import { DataSync } from "../../Data/DataSync.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const dataComm = ThreadComm.createComm("data-loader", {});
export const DataComm = dataComm;
DataSync.registerComm(DataComm);
