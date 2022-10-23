import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { ConstructorTasks } from "../../../Data/Constants/InterComms/ConstructorTasks.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { WorldTasks } from "../../../Data/Constants/InterComms/WorldTasks.js";
import { DataSync } from "../../Data/DataSync.js";
const ccm = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
});
ccm.listenForMessage(WorldTasks.addToRebuildQue, (data) => {
    const x = data[1];
    const y = data[2];
    const z = data[3];
    const substance = data[4];
    DVEW.queues.build.chunk.add([0, x, y, z, 1]);
});
ccm.listenForMessage(WorldTasks.runRebuildQue, () => {
    DVEW.queues.build.chunk.run();
});
ccm.listenForMessage(WorldTasks.syncShapeMap, (data) => {
    DVEW.dataSync.voxelDataCreator.setShapeMap(data[1]);
});
ccm.listenForMessage(WorldTasks.addToRGBLightUpdateQue, (data) => {
    const x = data[1];
    const y = data[2];
    const z = data[3];
    DVEW.queues.rgb.update.add([x, y, z]);
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
DataSync.registerComm(CCM);
