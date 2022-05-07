import { DVEFB } from "../../DivineVoxelEngineFluidBuilder.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const worldComm = CreateInterComm("fluid-builder-builder", {});
export const WorldComm = worldComm;
worldComm.onSetPort((port) => {
    worldComm.sendMessage("connect-shape-map", [DVEFB.shapeManager.shapeMap]);
});
worldComm.onMessage = (event) => {
};
worldComm.messageFunctions = {};
