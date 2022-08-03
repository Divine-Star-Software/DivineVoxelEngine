import { WorldToRichWorldMessages } from "../../../Constants/InterComms/WorldToRichWorld.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVERW } from "../../DivineStarVoxelEngineRichWorld.js";
const worldComm = CreateInterComm("data-world", {});
export const WorldComm = worldComm;
worldComm.onMessage = (event) => {
    DVERW.matrixHub.onMessage(event, (messageEvent) => { });
    if (event.data[0] == "set-world-port") {
        DVERW.__connectedToWorld = true;
    }
};
worldComm.messageFunctions[WorldToRichWorldMessages.setInitalData] = (data) => {
    const voxelId = data[1];
    const x = data[2];
    const y = data[3];
    const z = data[4];
    const voxel = DVERW.voxelManager.getVoxelData(voxelId);
    if (voxel && voxel.rich) {
        DVERW.richData.setData(x, y, z, voxel.rich.initalData);
    }
};
worldComm.messageFunctions[WorldToRichWorldMessages.removeRichData] = (data) => {
    const x = data[1];
    const y = data[2];
    const z = data[3];
    DVERW.richData.removeData(x, y, z);
};
