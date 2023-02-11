import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { EreaseAndUpdate, PaintAndUpdate } from "./Functions/VoxelUpdate.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { TasksRequest } from "./TasksRequest.js";
const chunkTool = new ChunkDataTool();
export const Tasks = {
    data: {
        syncTextures: ThreadComm.registerTasks("sync-uv-texuture-data", (data) => {
            DVEC.builder.textureManager.setUVTextureMap(data);
            DVEC.hooks.texturesRegistered.run(DVEC.builder.textureManager);
        }),
    },
    build: {
        chunk: {
            tasks: ThreadComm.registerTasks(ConstructorTasks.buildChunk, async (buildData) => {
                if (buildData.priority == 0) {
                    Tasks.build.chunk.run(buildData.data);
                    return;
                }
                DVEC.tasksQueue.addTasks(buildData.priority, buildData.data, Tasks.build.chunk.run);
            }),
            async run(data) {
                const location = data[0];
                await DVEC.builder.buildChunk(location, data[1]);
            },
        },
        column: ThreadComm.registerTasks(ConstructorTasks.buildColumn, async (data, onDone) => {
            const column = WorldRegister.column.get(data[0]);
            if (!column)
                return false;
            if (column.chunks.size == 0)
                return false;
            let totalChunks = 0;
            const location = data[0];
            for (const [key, chunk] of column.chunks) {
                chunkTool.setChunk(chunk);
                const chunkPOS = chunkTool.getPositionData();
                location[1] = chunkPOS.x;
                location[2] = chunkPOS.y;
                location[3] = chunkPOS.z;
                totalChunks++;
                DVEC.tasksQueue.addTasks(2, [[...location], data[1]], async (data) => {
                    await Tasks.build.chunk.run(data);
                    totalChunks--;
                    if (totalChunks == 0) {
                        if (onDone)
                            onDone(true);
                    }
                });
            }
        }, "deffered"),
    },
    voxelUpdate: {
        erase: ThreadComm.registerTasks(ConstructorTasks.voxelErease, async (data, onDone) => {
            await EreaseAndUpdate(data);
            if (onDone)
                onDone();
        }, "deffered"),
        paint: ThreadComm.registerTasks(ConstructorTasks.voxelPaint, async (data, onDone) => {
            await PaintAndUpdate(data);
            if (onDone)
                onDone();
        }, "deffered"),
    },
    explosion: ThreadComm.registerTasks(ConstructorTasks.explosion, async (data) => {
        await DVEC.propagation.expolosion.run(TasksRequest.getExplosionRequests(data[0], data[1], data[2], data[3]));
    }),
    worldSun: ThreadComm.registerTasks(ConstructorTasks.worldSun, (data, onDone) => {
        DVEC.tasksQueue.addTasks(2, data, () => {
            DVEC.propagation.worldSun.run(TasksRequest.getWorldSunRequests(data[0], data[1]));
            if (onDone)
                onDone();
        });
    }, "deffered"),
    worldGen: {
        generate: ThreadComm.registerTasks(ConstructorTasks.generate, (data, onDone) => {
            if (!onDone)
                return;
            DVEC.tasksQueue.addTasks(2, data, () => {
                DVEC.worldGen.generate(data, onDone);
            });
        }, "deffered"),
    },
    anaylzer: {
        propagation: ThreadComm.registerTasks(ConstructorTasks.analyzerPropagation, async (data, onDone) => {
            await DVEC.analyzer.runPropagation(data);
            if (onDone)
                onDone();
        }, "deffered"),
        update: ThreadComm.registerTasks(ConstructorTasks.analyzerUpdate, async (data, onDone) => {
            await DVEC.analyzer.runUpdate(data);
            if (onDone)
                onDone();
        }, "deffered"),
    },
    flow: {
        update: ThreadComm.registerTasks(ConstructorTasks.flowUpdate, async (data) => {
            const tasks = TasksRequest.getFlowUpdateRequest(data[0], data[1], data[2]);
            tasks.start();
            await DVEC.propagation.flow.update(tasks);
            tasks.stop();
        }),
        remove: ThreadComm.registerTasks(ConstructorTasks.flowRemove, async (data) => {
            const tasks = TasksRequest.getFlowUpdateRequest(data[0], data[1], data[2]);
            tasks.start();
            await DVEC.propagation.flow.remove(tasks);
            tasks.stop();
        }),
    },
    rgb: {
        update: ThreadComm.registerTasks(ConstructorTasks.RGBlightUpdate, (data) => {
            const tasks = TasksRequest.getLightUpdateRequest(data[0], data[1], data[2]);
            const [dimension, x, y, z] = data[0];
            tasks.queues.rgb.update.push(x, y, z);
            tasks.start();
            DVEC.propagation.rgb.update(tasks);
            tasks.stop();
        }),
        remove: ThreadComm.registerTasks(ConstructorTasks.RGBlightRemove, (data) => {
            const tasks = TasksRequest.getLightUpdateRequest(data[0], data[1], data[2]);
            const [dimension, x, y, z] = data[0];
            tasks.queues.rgb.rmeove.push(x, y, z);
            tasks.start();
            DVEC.propagation.rgb.remove(tasks);
            tasks.stop();
        }),
    },
    sun: {
        update: ThreadComm.registerTasks(ConstructorTasks.sunLightUpdate, (data) => {
            const tasks = TasksRequest.getLightUpdateRequest(data[0], data[1], data[2]);
            const [dimension, x, y, z] = data[0];
            tasks.queues.sun.update.push(x, y, z);
            tasks.start();
            DVEC.propagation.sun.update(tasks);
            tasks.stop();
        }),
        remove: ThreadComm.registerTasks(ConstructorTasks.sunLightRemove, (data) => {
            const tasks = TasksRequest.getLightUpdateRequest(data[0], data[1], data[2]);
            const [dimension, x, y, z] = data[0];
            tasks.queues.sun.rmeove.push(x, y, z);
            tasks.start();
            DVEC.propagation.sun.remove(tasks);
            tasks.stop();
        }),
    },
};
