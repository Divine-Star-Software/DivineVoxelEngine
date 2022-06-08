//comms
import { GetNewConstructorComm } from "./ConstructorComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { WorldToConstructorMessages } from "../../../Shared/InterComms/WorldToConstructor.js";
/**# World Gen Comm Manager
 * ---
 * Handles all world gen comms. .
 */
export const ConstructorCommManager = {
    count: 0,
    numConstructors: 0,
    __numLightUpdates: 0,
    constructors: [],
    constructorsConnected: 0,
    $INIT(statesSAB) {
        for (const constructor of this.constructors) {
            constructor.sendMessage(WorldToConstructorMessages.setQueueStates, [
                statesSAB,
            ]);
        }
    },
    addThread(port) {
        const newComm = GetNewConstructorComm(this.numConstructors + 1, port);
        this.constructors.push(newComm);
    },
    syncChunkInAllThreads(chunkX, chunkY, chunkZ) {
        for (const constructor of this.constructors) {
            DVEW.matrixCentralHub.syncChunkInThread(constructor.name, chunkX, chunkY, chunkZ);
        }
    },
    releaseChunkInAllThreads(chunkX, chunkY, chunkZ) {
        for (const constructor of this.constructors) {
            DVEW.matrixCentralHub.releaseChunkInThread(constructor.name, chunkX, chunkY, chunkZ);
        }
    },
    syncRegionInAllThreads(regionX, regionY, regionZ) {
        for (const constructor of this.constructors) {
            DVEW.matrixCentralHub.syncRegionInThread(constructor.name, regionX, regionY, regionZ);
        }
    },
    releaseRegionInAllThreads(regionX, regionY, regionZ) {
        for (const constructor of this.constructors) {
            DVEW.matrixCentralHub.releaseRegionInThread(constructor.name, regionX, regionY, regionZ);
        }
    },
    isReady() {
        if (!this.constructorsConnected)
            return false;
        if (this.constructorsConnected < this.numConstructors)
            return false;
        return true;
    },
    __handleCount() {
        this.count++;
        if (this.count >= this.numConstructors) {
            this.count = 0;
        }
    },
    requestFullChunkBeBuilt(chunkX, chunkY, chunkZ) {
        const comm = this.constructors[this.count];
        DVEW.queues._numChunksRebuilding++;
        comm.sendMessage(WorldToConstructorMessages.buildChunk, [
            chunkX,
            chunkY,
            chunkZ,
        ]);
        this.__handleCount();
    },
    runRGBFloodFillAt(x, y, z) {
        const comm = this.constructors[this.count];
        comm.sendMessage(WorldToConstructorMessages.RGBlightUpdate, [x, y, z]);
        this.__handleCount();
    },
    runRGBFloodRemoveAt(x, y, z) {
        const comm = this.constructors[this.count];
        comm.sendMessage(WorldToConstructorMessages.RGBlightRemove, [x, y, z]);
        this.__handleCount();
    },
    runSunLightForWorldColumn(x, z, maxY) {
        const comm = this.constructors[this.count];
        comm.sendMessage(WorldToConstructorMessages.fillWorldColumnWithSunLight, [
            x,
            z,
            maxY,
        ]);
        this.__handleCount();
    },
    runSunFillAtMaxY(x, y, maxY) {
        const comm = this.constructors[this.count];
        comm.sendMessage(WorldToConstructorMessages.runSunLightUpdateAtMaxY, [
            x,
            y,
            maxY,
        ]);
        this.__handleCount();
    },
    runSunFillAt(x, y, z) {
        const comm = this.constructors[this.count];
        comm.sendMessage(WorldToConstructorMessages.sunLightUpdate, [x, y, z]);
        this.__handleCount();
    },
    runSunRemoveAt(x, y, z) {
        const comm = this.constructors[this.count];
        comm.sendMessage(WorldToConstructorMessages.sunLightRemove, [x, y, z]);
        this.__handleCount();
    },
};
