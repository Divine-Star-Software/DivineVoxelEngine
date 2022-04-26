import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const builderComm = CreateInterComm("world-builder", {});
builderComm.onSetPort((port) => {
    DVEW.matrixCentralHub.registerThread("builder", port);
});
export const BuilderComm = builderComm;
