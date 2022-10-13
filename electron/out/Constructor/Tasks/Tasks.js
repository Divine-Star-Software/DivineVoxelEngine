import { ConstructorTasks } from "../../Constants/InterComms/ConstructorTasks.js";
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export const Tasks = {
    build: {
        chunk: ThreadComm.registerTasks(ConstructorTasks.buildChunk, (data) => {
            DVEC.DVEB.buildChunk(data[0], data[1], data[2], data[3]);
        }),
        entity: ThreadComm.registerTasks(ConstructorTasks.constructEntity, (data) => {
            const x = data[0];
            const y = data[1];
            const z = data[2];
            const width = data[3];
            const depth = data[4];
            const height = data[5];
            const composed = data[6];
            const arrays = [];
            for (let i = 8; i < 8 + 2 * composed; i += 2) {
                arrays.push(new Uint32Array(data[i]), new Uint32Array(data[i + 1]));
            }
            DVEC.DVEB.entityConstructor.setEntityData(x, y, z, width, depth, height, composed, arrays);
            DVEC.DVEB.constructEntity();
        }),
        item: ThreadComm.registerTasks(ConstructorTasks.constructItem, (data) => {
            const itemId = data[0];
            const x = data[1];
            const y = data[2];
            const z = data[3];
            DVEC.DVEB.itemMesher.createItem(itemId, x, y, z);
        }),
    },
    rgb: {
        update: ThreadComm.registerTasks(ConstructorTasks.RGBlightUpdate, (data) => {
            const x = data[0];
            const y = data[1];
            const z = data[2];
            DVEC.DVEP.runRGBFloodFill(x, y, z);
        }),
        remove: ThreadComm.registerTasks(ConstructorTasks.RGBlightRemove, (data) => {
            const x = data[0];
            const y = data[1];
            const z = data[2];
            DVEC.DVEP.runRGBFloodRemove(x, y, z);
        }),
    },
    worldSun: {
        fillWorldColumn: ThreadComm.registerTasks(ConstructorTasks.fillWorldColumnWithSunLight, (data) => {
            //run sun light propagation for world column
            const x = data[0];
            const z = data[1];
            const maxY = data[2];
            DVEC.DVEP.runSunLightForWorldColumn(x, z, maxY);
        }),
        updateAtMaxY: ThreadComm.registerTasks(ConstructorTasks.runSunLightUpdateAtMaxY, (data) => {
            const x = data[0];
            const z = data[1];
            const maxY = data[2];
            DVEC.DVEP.runSunFloodFillAtMaxY(x, z, maxY);
        }),
        floodAtMaxY: ThreadComm.registerTasks(ConstructorTasks.runSunLightUpdateMaxYFlood, (data) => {
            const x = data[0];
            const z = data[1];
            const maxY = data[2];
            DVEC.DVEP.runSunFloodFillMaxYFlood(x, z, maxY);
        }),
    },
    sun: {
        update: ThreadComm.registerTasks(ConstructorTasks.sunLightUpdate, (data) => {
            const x = data[0];
            const y = data[1];
            const z = data[2];
            DVEC.DVEP.runSunLightUpdate(x, y, z);
        }),
        remove: ThreadComm.registerTasks(ConstructorTasks.sunLightRemove, (data) => {
            const x = data[0];
            const y = data[1];
            const z = data[2];
            DVEC.DVEP.runSunLightRemove(x, y, z);
        }),
    },
    flow: {
        update: ThreadComm.registerTasks(ConstructorTasks.runFlow, async (data) => {
            const x = data[0];
            const y = data[1];
            const z = data[2];
            await DVEC.DVEP.runFlowAt(x, y, z);
        }),
        remove: ThreadComm.registerTasks(ConstructorTasks.removeFlow, (data) => {
            const x = data[0];
            const y = data[1];
            const z = data[2];
            DVEC.DVEP.removeFlowAt(x, y, z);
        }),
    },
    worldGen: {
        generate: ThreadComm.registerTasks(ConstructorTasks.generate, async (data) => {
            const x = data[0];
            const z = data[1];
            const genData = data[2];
            await DVEC.DVEWG.generate(x, z, genData);
        }),
    },
};
