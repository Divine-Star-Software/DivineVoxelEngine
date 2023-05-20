import { ThreadComm } from "threadcomm";
import { MeshManager } from "../Scene/MeshManager.js";
import { MeshRegister } from "../../Render/Scene/MeshRegister.js";
export const RenderTasks = {
    setChunk: ThreadComm.registerTasks("set-chunk", (data) => {
        MeshManager.chunks.update(data);
    }),
    removeChunk: ThreadComm.registerTasks("remove-chunk", (data) => {
        MeshManager.chunks.remove(data);
    }),
    removeColumn: ThreadComm.registerTasks("remove-column", (data) => {
        MeshManager.chunks.removeColumn(data);
    }),
    clearAll: ThreadComm.registerTasks("clear-all", (data) => {
        MeshRegister.clearAll();
    }),
    removeColumnsOutsideRadius: ThreadComm.registerTasks("remove-column-outside-radius", (data) => {
        MeshManager.removeColumnsOutsideRadius(data[0], data[1]);
    }),
    setNodeMesh: ThreadComm.registerTasks("set-node-mesh", (data) => { }),
};
