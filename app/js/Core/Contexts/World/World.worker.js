import { Util } from "../../../Global/Util.helper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { BuilderManagerWorker } from "./BuilderManager.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { ChunkMap } from "./Chunks/ChunkMap.js";
import { WorldData } from "./WorldData/WorldData.js";
import { PlayerWatcher } from "./WorldGen/PlayerWatcher.js";
import { RegisterDefaultVoxels } from "./Voxels/Functions/RegisterDefaultVoxel.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
const worker = self;
const UTIL = new Util();
const builderManager = new BuilderManagerWorker();
builderManager.setMainThreadCom(worker);
const chunkMap = new ChunkMap();
const worldData = new WorldData(builderManager, chunkMap, UTIL);
const playerWatcher = new PlayerWatcher(worldData);
const voxelHelper = new VoxelHelper(UTIL);
const voxelManager = new VoxelManager();
RegisterDefaultVoxels(voxelManager, voxelHelper);
const chunkProccesor = new ChunkProcessor(worldData, voxelManager, playerWatcher, UTIL);
worldData.setChunkProcessor(chunkProccesor);
worker.worldData = worldData;
worker.playerWatcher = playerWatcher;
worker.builderManager = builderManager;
worker.chunkProccesor = chunkProccesor;
const start = () => {
    let chunkNum = 20;
    let totalChunks = chunkNum * 16 - 144;
    for (let i = -144; i < totalChunks; i += 16) {
        for (let k = -144; k < totalChunks; k += 16) {
            worldData.generateChunk(i, k);
        }
    }
    for (let i = -144; i < totalChunks; i += 16) {
        for (let k = -144; k < totalChunks; k += 16) {
            const chunk = worldData.getChunk(i, k);
            if (!chunk)
                continue;
            const template = chunkProccesor.makeChunkTemplate(chunk, i, k);
            // sendChunkData("new", i, k, data);
            builderManager.requestChunkBeBuilt(i, k, template);
            //     animationComm.sendChunkTemplateUpdate(i,k,template[1],template[2]);
        }
    }
    playerWatcher.startWatchingPlayer();
};
addEventListener("message", (event) => {
    const eventData = event.data;
    const message = eventData[0];
    if (message == "block-add") {
        const chunkXZ = UTIL.calculateGameZone(eventData[1], eventData[3]);
        worldData.requestBlockAdd(chunkXZ[0], chunkXZ[1], eventData[1], eventData[2], eventData[3]);
    }
    if (message == "block-remove") {
        const chunkXZ = UTIL.calculateGameZone(eventData[1], eventData[3]);
        worldData.requestBlockRemove(chunkXZ[0], chunkXZ[1], eventData[1], eventData[2], eventData[3]);
    }
    if (eventData == "start") {
        start();
        return;
    }
    if (message == "block-data-recieve") {
        const blockData = eventData[1];
        console.log(blockData);
    }
    if (message == "connect-builder") {
        const port = event.ports[0];
        builderManager.addBuilder(port);
    }
    if (message == "connect-player") {
        playerWatcher.setPlayerSharedArrays(event.data[1], event.data[2], event.data[3]);
    }
});
