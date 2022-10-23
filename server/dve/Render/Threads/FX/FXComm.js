import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const fxCommBase = ThreadComm.createComm("fx", {});
const fxComm = Object.assign(fxCommBase, {
    $INIT() {
        fxComm.connectToComm(DVER.worldComm);
    },
});
export const FXComm = fxComm;
