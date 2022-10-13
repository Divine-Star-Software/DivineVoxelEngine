import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

const fxComm = ThreadComm.createComm("world-fx");
fxComm.onSetPort((port) => {
 DVEW.matrixCentralHub.registerThread("fx", port);
});
export const FXComm = fxComm;
