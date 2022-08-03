import { WorldToRichWorldMessages } from "../../../Constants/InterComms/WorldToRichWorld.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const richWorldCommBase = CreateInterComm("world-rich-world", {});
const richWorldComm = Object.assign(richWorldCommBase, {
    setInitalData(voxelId, x, y, z) {
        richWorldComm.sendMessage(WorldToRichWorldMessages.setInitalData, [
            voxelId,
            x,
            y,
            z,
        ]);
    },
    removeRichData(x, y, z) {
        richWorldComm.sendMessage(WorldToRichWorldMessages.removeRichData, [x, y, z]);
    },
});
richWorldComm.onSetPort((port) => {
    DVEW.matrixCentralHub.registerThread("rich-world", port);
});
export const RichWorldComm = richWorldComm;
