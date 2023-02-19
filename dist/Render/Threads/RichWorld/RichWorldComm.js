import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "threadcomm";
ThreadComm;
const richWorldCommBase = ThreadComm.createComm("rich-world");
const richWorldComm = Object.assign(richWorldCommBase, {
    $INIT() {
        richWorldComm.connectToComm(DVER.worldComm);
    },
});
export const RichWorldComm = richWorldComm;
