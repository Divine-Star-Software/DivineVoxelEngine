import { ConstructorTasks } from "../../../Data/Constants/InterComms/ConstructorTasks.js";
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
        rgb: {
            update: (data) => {
                return CCM.runTask(ConstructorTasks.RGBlightUpdate, data);
            },
            remove: (data) => {
                return CCM.runTask(ConstructorTasks.RGBlightRemove, data);
            },
        },
        worldSun: {
            fillWorldColumn: (data) => {
                return CCM.runTask(ConstructorTasks.worldSunStep1, data);
            },
            updateAtMaxY: (data) => {
                return CCM.runTask(ConstructorTasks.worldSunStep2, data);
            },
            floodAtMaxY: (data, threadNumber) => {
                return CCM.runTask(ConstructorTasks.worldSunStep3, data, [], threadNumber);
            },
        },
        sun: {
            update: (data) => {
                return CCM.runTask(ConstructorTasks.sunLightUpdate, data);
            },
            remove: (data) => {
                return CCM.runTask(ConstructorTasks.sunLightRemove, data);
            },
        },
        flow: {
            update: (data) => {
                return CCM.runTask(ConstructorTasks.flowUpdate, data);
            },
            remove: (data) => {
                return CCM.runTask(ConstructorTasks.flowRemove, data);
            },
        },
        worldGen: {
            generate: (data) => {
                return CCM.runTask(ConstructorTasks.generate, data);
            },
        },
    },
});
