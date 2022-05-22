//comms
import { GetNewBuilderComm } from "./BuilderComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
/**# Builder Comm Manager
 * ---
 * Handles all builder inter comms.
 */
export const BuilderCommManager = {
    count: 0,
    numBuilders: 0,
    builders: [],
    buildersConnected: 0,
    addBuilder(port) {
        const newComm = GetNewBuilderComm(this.numBuilders + 1, port);
        this.builders.push(newComm);
    },
    syncChunkInAllBuilders(chunkX, chunkY, chunkZ) {
        for (const builder of this.builders) {
            DVEW.matrixCentralHub.syncChunkInThread(builder.name, chunkX, chunkY, chunkZ);
        }
    },
    releaseChunkInAllBuilders(chunkX, chunkY, chunkZ) {
        for (const builder of this.builders) {
            DVEW.matrixCentralHub.releaseChunkInThread(builder.name, chunkX, chunkY, chunkZ);
        }
    },
    syncRegionInAllBuilders(regionX, regionY, regionZ) {
        for (const builder of this.builders) {
            DVEW.matrixCentralHub.syncRegionInThread(builder.name, regionX, regionY, regionZ);
        }
    },
    releaseRegionInAllBuilders(regionX, regionY, regionZ) {
        for (const builder of this.builders) {
            DVEW.matrixCentralHub.releaseRegionInThread(builder.name, regionX, regionY, regionZ);
        }
    },
    isReady() {
        if (!this.buildersConnected)
            return false;
        if (this.buildersConnected < this.numBuilders)
            return false;
        return true;
    },
    requestFullChunkBeBuilt(chunkX, chunkY, chunkZ) {
        const comm = this.builders[this.count];
        DVEW.queues._numChunksRebuilding++;
        comm.sendMessage(0, [chunkX, chunkY, chunkZ]);
        this.count++;
        if (this.count >= this.numBuilders) {
            this.count = 0;
        }
    },
};
