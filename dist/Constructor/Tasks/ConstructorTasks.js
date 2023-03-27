import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "threadcomm";
import { EreaseAndUpdate, PaintAndUpdate, VoxelUpdate, } from "./Functions/VoxelUpdate.js";
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
        nodeMesh: ThreadComm.registerTasks("build-node-mesh", (data, onDone) => {
            if (data[1] == "#dve_node_texture") {
                const [returnData, transfers] = DVEC.builder.textureProcessor.processTexture(data);
                if (onDone)
                    onDone(returnData, transfers);
            }
            if (onDone)
                onDone(false);
        }, "deferred"),
        chunk: {
            tasks: ThreadComm.registerTasks(ConstructorTasks.buildChunk, async (buildData, onDone) => {
                const location = buildData.data[0];
                await DVEC.builder.buildChunk(location, buildData.data[1]);
                if (onDone)
                    onDone();
            }),
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
                DVEC.builder.buildChunk([...location]);
            }
            if (onDone)
                onDone();
        }, "deferred"),
    },
    voxelUpdate: {
        update: ThreadComm.registerTasks(ConstructorTasks.voxelUpdate, async (data, onDone) => {
            await VoxelUpdate(data);
            if (onDone)
                onDone();
        }, "deferred"),
        erase: ThreadComm.registerTasks(ConstructorTasks.voxelErease, async (data, onDone) => {
            await EreaseAndUpdate(data);
            if (onDone)
                onDone();
        }, "deferred"),
        paint: ThreadComm.registerTasks(ConstructorTasks.voxelPaint, async (data, onDone) => {
            await PaintAndUpdate(data);
            if (onDone)
                onDone();
        }, "deferred"),
    },
    explosion: ThreadComm.registerTasks(ConstructorTasks.explosion, async (data) => {
        await DVEC.propagation.expolosion.run(TasksRequest.getExplosionRequests(data[0], data[1], data[2], data[3]));
    }),
    worldSun: ThreadComm.registerTasks(ConstructorTasks.worldSun, (data, onDone) => {
        DVEC.propagation.worldSun.run(TasksRequest.getWorldSunRequests(data[0], data[1]));
        if (onDone)
            onDone();
    }, "deferred"),
    worldGen: {
        generate: ThreadComm.registerTasks(ConstructorTasks.generate, (data, onDone) => {
            if (!onDone)
                return;
            DVEC.worldGen.generate(data, "generate", onDone);
        }, "deferred"),
        decorate: ThreadComm.registerTasks(ConstructorTasks.decorate, (data, onDone) => {
            if (!onDone)
                return;
            DVEC.worldGen.generate(data, "decorate", onDone);
        }, "deferred"),
    },
    anaylzer: {
        propagation: ThreadComm.registerTasks(ConstructorTasks.analyzerPropagation, async (data, onDone) => {
            await DVEC.analyzer.runPropagation(data);
            if (onDone)
                onDone();
        }, "deferred"),
        update: ThreadComm.registerTasks(ConstructorTasks.analyzerUpdate, async (data, onDone) => {
            await DVEC.analyzer.runUpdate(data);
            if (onDone)
                onDone();
        }, "deferred"),
    },
};
