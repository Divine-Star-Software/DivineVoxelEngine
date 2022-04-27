//comms
import { GetNewBuilderComm } from "./BuilderComm.js";
/**# Builder Comm Manager
 * ---
 * Handles all builder inter comms.
 */
export class BuilderCommManager {
    voxelBuildOrder = ["solid", "flora", "magma"];
    voxelTypeMap = {
        solid: 0,
        flora: 1,
        magma: 3,
    };
    count = 0;
    numBuilders = 0;
    builders = [];
    addBuilder(port) {
        const newComm = GetNewBuilderComm(this.builders.length + 1, port);
        this.builders.push(newComm);
        this.numBuilders++;
    }
    requestFullChunkBeRemoved(chunkX, chunkY, chunkZ) {
    }
    requestFullChunkBeBuilt(chunkX, chunkY, chunkZ, template) {
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
