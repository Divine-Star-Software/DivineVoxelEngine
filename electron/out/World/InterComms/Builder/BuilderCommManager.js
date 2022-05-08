//comms
import { GetNewBuilderComm } from "./BuilderComm.js";
/**# Builder Comm Manager
 * ---
 * Handles all builder inter comms.
 */
export class BuilderCommManager {
    DVEW;
    voxelBuildOrder = ["solid", "flora", "magma"];
    voxelTypeMap = {
        solid: 0,
        flora: 1,
        magma: 3,
    };
    count = 0;
    numBuilders = 0;
    builders = [];
    ready = {};
    buildersConnected = 0;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    addBuilder(port) {
        const newComm = GetNewBuilderComm(this.numBuilders + 1, port);
        this.builders.push(newComm);
        const builder = this;
        newComm.listenForMessage("ready", () => {
            builder.ready[newComm.name] = true;
            builder.buildersConnected++;
        });
        this.numBuilders++;
    }
    syncChunkInAllBuilders(chunkX, chunkY, chunkZ) {
        for (const builder of this.builders) {
            this.DVEW.matrixCentralHub.syncChunkInThread(builder.name, chunkX, chunkY, chunkZ);
        }
    }
    releaseChunkInAllBuilders(chunkX, chunkY, chunkZ) {
        for (const builder of this.builders) {
            this.DVEW.matrixCentralHub.releaseChunkInThread(builder.name, chunkX, chunkY, chunkZ);
        }
    }
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
    }
    requestFullChunkBeRemoved(chunkX, chunkY, chunkZ) { }
    requestFullChunkBeBuilt(chunkX, chunkY, chunkZ) {
        const comm = this.builders[this.count];
        comm.sendMessage(7, [chunkX, chunkY, chunkZ]);
        this.count++;
        if (this.count >= this.numBuilders) {
            this.count = 0;
        }
    }
    requestFullChunkBeBuiltO(chunkX, chunkY, chunkZ, template) {
        let i = this.voxelBuildOrder.length;
        while (i--) {
            const type = this.voxelBuildOrder[i];
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0)
                continue;
            const positions = new Uint16Array(baseTemplate.positionTemplate);
            const faces = new Uint8Array(baseTemplate.faceTemplate);
            const shapes = new Uint16Array(baseTemplate.shapeTemplate);
            const uvs = new Uint16Array(baseTemplate.uvTemplate);
            const colors = new Float32Array(baseTemplate.colorTemplate);
            const light = new Float32Array(baseTemplate.lightTemplate);
            const ambientOcclusion = new Float32Array(baseTemplate.aoTemplate);
            this.builders[this.count].sendMessage(this.voxelTypeMap[type], [
                chunkX,
                chunkY,
                chunkZ,
                positions.buffer,
                faces.buffer,
                shapes.buffer,
                uvs.buffer,
                colors.buffer,
                light.buffer,
                ambientOcclusion.buffer,
            ], [
                positions.buffer,
                faces.buffer,
                shapes.buffer,
                uvs.buffer,
                colors.buffer,
                light.buffer,
                ambientOcclusion.buffer,
            ]);
            this.count++;
            if (this.count >= this.numBuilders) {
                this.count = 0;
            }
        }
    }
}
