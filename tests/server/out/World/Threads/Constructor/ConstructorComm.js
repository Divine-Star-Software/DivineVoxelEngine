import { DataSync } from "../../Data/DataSync.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
export const CCM = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
});
DataSync.registerComm(CCM);
