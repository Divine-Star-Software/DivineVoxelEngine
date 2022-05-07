import { DVEB } from "../../DivineVoxelEngineBuilder.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const fluidBuilderComm = CreateInterComm("builder-fluid-builder", {});
export const FluidBuilderComm = fluidBuilderComm;
fluidBuilderComm.messageFunctions = {
    "connect-fluid-shape-map": (data) => {
        DVEB.voxelManager.setFluidShapeMap(data[1]);
    },
};
