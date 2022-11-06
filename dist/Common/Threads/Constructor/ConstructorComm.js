import { ConstructorTasks } from "../Contracts/ConstructorTasks.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const ccm = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
});
export const CCM = Object.assign(ccm, {
    tasks: {
        build: {
            chunk: (data) => {
                return CCM.runTask(ConstructorTasks.buildChunk, data);
            },
            entity: (x, y, z, width, depth, height, composed, voxelData, voxelStateData) => {
                const transferArray = [];
                const dataArray = [];
                for (let i = 0; i < voxelData.length; i++) {
                    dataArray.push(voxelData[i], voxelStateData[i]);
                    transferArray.push(voxelData[i].buffer, voxelStateData[i].buffer);
                }
                return ccm.runTask(ConstructorTasks.constructEntity, [x, y, z, width, depth, height, composed, ...transferArray], transferArray);
            },
            item: (data) => {
                return CCM.runTask(ConstructorTasks.constructItem, data);
            },
        },
    },
});
