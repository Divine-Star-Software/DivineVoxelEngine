import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const richWorldCommBase = ThreadComm.createComm("rich-world");
const richWorldComm = Object.assign(richWorldCommBase, {
    setInitalData(data) {
        richWorldComm.runTasks("set-voxel", data);
    },
    removeRichData(data) {
        richWorldComm.runTasks("remove-voxel", data);
    },
});
export const RichWorldComm = richWorldComm;
