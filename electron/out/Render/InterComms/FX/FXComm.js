import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const fxCommBase = CreateInterComm("render-fx", {});
const fxComm = Object.assign(fxCommBase, {
    $INIT() {
        const channel = new MessageChannel();
        DVER.worldComm.sendMessage("connect-fx", [], [channel.port1]);
        fxComm.sendMessage("connect-world", [], [channel.port2]);
    },
});
export const FXComm = fxComm;
