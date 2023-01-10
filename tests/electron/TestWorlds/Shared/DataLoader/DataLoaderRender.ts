import type { DivineVoxelEngineRender } from "../../../out/Render/DivineVoxelEngineRender";
export const $INITDataLoader = (DVER : DivineVoxelEngineRender) => {
    let worldName = localStorage.getItem("current-world");
    worldName = !worldName ? "unkown" : worldName;
    DVER.dataComm.runTasks("set-path",[worldName]);
}