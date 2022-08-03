import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const fxComm = CreateInterComm("world-fx", {});
fxComm.onSetPort((port) => {
    DVEW.matrixCentralHub.registerThread("fx", port);
});
export const FXComm = fxComm;
