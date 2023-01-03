import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { EreaseAndUpdate, PaintAndUpdate } from "./Functions/VoxelUpdate.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
const chunkTool = new ChunkDataTool();
export const Tasks = {
    build: {
        chunk: ThreadComm.registerTasks(ConstructorTasks.buildChunk, async (data) => {
            const chunkPOS = WorldSpaces.chunk.getPositionXYZ(data[1], data[2], data[3]);
            await DVEC.builder.buildChunk(data[0], chunkPOS.x, chunkPOS.y, chunkPOS.z, data[4]);
        }),
        column: ThreadComm.registerTasks(ConstructorTasks.buildColumn, async (data) => {
            const column = WorldRegister.column.get(data[0], data[1], data[3], data[2]);
            if (!column)
                return false;
            if (column.chunks.size == 0)
                return false;
            for (const [key, chunk] of column.chunks) {
                chunkTool.setChunk(chunk);
                const chunkPOS = chunkTool.getPositionData();
                await DVEC.builder.buildChunk(data[0], chunkPOS.x, chunkPOS.y, chunkPOS.z, data[4]);
            }
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
            for (let i = 7; i < 7 + 2 * composed; i += 2) {
                arrays.push(new Uint32Array(data[i]), new Uint32Array(data[i + 1]));
            }
            DVEC.builder.entityConstructor.setEntityData(x, y, z, width, depth, height, composed, arrays);
            DVEC.builder.constructEntity();
        }),
        item: ThreadComm.registerTasks(ConstructorTasks.constructItem, (data) => {
            const itemId = data[0];
            const x = data[1];
            const y = data[2];
            const z = data[3];
            DVEC.builder.itemMesher.createItem(itemId, x, y, z);
        }),
    },
    voxelUpdate: {
        erase: ThreadComm.registerTasks(ConstructorTasks.voxelErease, async (data) => {
            await EreaseAndUpdate(data);
        }),
        paint: ThreadComm.registerTasks(ConstructorTasks.voxelPaint, async (data) => {
            await PaintAndUpdate(data);
        }),
    },
    rgb: {
        update: ThreadComm.registerTasks(ConstructorTasks.RGBlightUpdate, (data) => {
            DVEC.propagation.runRGBUpdate(data);
        }),
        remove: ThreadComm.registerTasks(ConstructorTasks.RGBlightRemove, (data) => {
            DVEC.propagation.runRGBRemove(data);
        }),
    },
    worldSun: {
        run: ThreadComm.registerTasks(ConstructorTasks.worldSun, (data, onDone) => {
            DVEC.propagation.runWorldSun(data);
            if (onDone)
                onDone();
        }),
    },
    sun: {
        update: ThreadComm.registerTasks(ConstructorTasks.sunLightUpdate, (data) => {
            DVEC.propagation.runSunLightUpdate(data);
        }),
        remove: ThreadComm.registerTasks(ConstructorTasks.sunLightRemove, (data) => {
            DVEC.propagation.runSunLightRemove(data);
        }),
    },
    explosion: {
        run: ThreadComm.registerTasks(ConstructorTasks.explosion, (data) => {
            DVEC.propagation.runExplosion(data);
        }),
    },
    flow: {
        update: ThreadComm.registerTasks(ConstructorTasks.flowUpdate, async (data) => {
            await DVEC.propagation.updateFlowAt(data);
        }),
        remove: ThreadComm.registerTasks(ConstructorTasks.flowRemove, (data) => {
            DVEC.propagation.removeFlowAt(data);
        }),
    },
    worldGen: {
        generate: ThreadComm.registerTasks(ConstructorTasks.generate, (data, onDone) => {
            if (!onDone)
                return;
            DVEC.worldGen.generate(data, onDone);
        }, "deffered"),
    },
};
