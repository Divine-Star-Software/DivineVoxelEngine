import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "threadcomm";
const fxCommBase = ThreadComm.createComm("fx", {});
const fxComm = Object.assign(fxCommBase, {
    $INIT() {
        fxComm.connectToComm(DVER.worldComm);
    },
});
export const FXComm = fxComm;
