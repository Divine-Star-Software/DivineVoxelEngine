import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const builderComm = CreateInterComm("world-builder-base", {});
builderComm.messageFunctions = {
    "connect-shape-map": (data, event) => {
        if (!event)
            return;
        if (DVEW.voxelManager.fluidShapMapIsSet())
            return;
        DVEW.voxelManager.setFluidShapeMap(event.data[1]);
    },
};
builderComm.listenForMessage("connect-shape-map", (data, event) => {
    if (!event)
        return;
    DVEW.voxelManager.setShapeMap(data[1]);
});
export const GetNewBuilderComm = (count, port) => {
    const newComm = Object.create(builderComm);
    newComm.onSetPort((port) => {
        DVEW.matrixCentralHub.registerThread(`builder-${count}`, port);
        if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
            DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(`builder-${count}`);
        }
    });
    newComm.setPort(port);
    return newComm;
};
