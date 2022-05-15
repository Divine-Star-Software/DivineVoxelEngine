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
    ready: {},
    buildersConnected: 0,
    addBuilder(port) {
        const newComm = GetNewBuilderComm(this.numBuilders + 1, port);
        this.builders.push(newComm);
        const builder = this;
        newComm.listenForMessage("ready", () => {
            builder.ready[newComm.name] = true;
            builder.buildersConnected++;
        });
        this.numBuilders++;
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
    isReady() {
        if (!this.buildersConnected)
            return false;
        if (this.buildersConnected < this.numBuilders)
            return false;
        for (const ready of Object.keys(this.ready)) {
            if (this.ready[ready] == false) {
                return false;
            }
        }
        return true;
    },
    requestFullChunkBeRemoved(chunkX, chunkY, chunkZ) { },
    requestFullChunkBeBuilt(chunkX, chunkY, chunkZ) {
        const comm = this.builders[this.count];
        comm.sendMessage(7, [chunkX, chunkY, chunkZ]);
        this.count++;
        if (this.count >= this.numBuilders) {
            this.count = 0;
        }
    },
};
