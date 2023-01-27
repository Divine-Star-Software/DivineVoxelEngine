import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
ThreadComm;
const richWorldCommBase = ThreadComm.createComm("rich-world");
const richWorldComm = Object.assign(richWorldCommBase, {
    $INIT() {
        richWorldComm.connectToComm(DVER.worldComm);
    },
});
export const RichWorldComm = richWorldComm;
