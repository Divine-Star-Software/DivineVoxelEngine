import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const dataCommBase = ThreadComm.createComm("render-data", {});
const dataComm = Object.assign(dataCommBase, {
    $INIT() {
        const channel = new MessageChannel();
        DVER.worldComm.sendMessage("connect-data", [], [channel.port1]);
        dataComm.sendMessage("connect-world", [], [channel.port2]);
    },
});
export const DataComm = dataComm;
