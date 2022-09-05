import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const dataCommBase = CreateInterComm("render-data", {});
const dataComm = Object.assign(dataCommBase, {
    $INIT() {
        const channel = new MessageChannel();
        DVER.worldComm.sendMessage("connect-data", [], [channel.port1]);
        dataComm.sendMessage("connect-world", [], [channel.port2]);
    },
});
export const DataComm = dataComm;
