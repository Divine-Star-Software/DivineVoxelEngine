/**# Builder Manager Worker
 * ---
 * Handles communication with the mesh builders thread.
 */
export class BuilderManager {
    count = 0;
    numBuilders = 0;
    voxelBuildOrder = ["solid", "flora", "fluid", "magma"];
    voxelTypeMap = {
        solid: 0,
        flora: 1,
        fluid: 2,
        magma: 3,
        transparent: -1,
    };
    mainThreadCom;
    builders = [];
    setMainThreadCom(worker) {
        this.mainThreadCom = worker;
    }
    addBuilder(port) {
        this.builders.push(port);
        this.numBuilders++;
    }
    requestChunkBeRemoved(chunkX, chunkZ) {
        this.mainThreadCom.postMessage(["remove-chunk", chunkX, chunkZ]);
    }
    requestFullChunkBeBuilt(chunkX, chunkZ, template) {
        for (const type of this.voxelBuildOrder) {
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0)
                continue;
            const positions = new Uint16Array(baseTemplate.positionTemplate);
            const faces = new Uint8Array(baseTemplate.faceTemplate);
            const shapes = new Uint16Array(baseTemplate.shapeTemplate);
            const uvs = new Uint16Array(baseTemplate.uvTemplate);
            const light = new Float32Array(baseTemplate.ligtTemplate);
            const ambientOcclusion = new Float32Array(baseTemplate.aoTemplate);
            this.builders[this.count].postMessage([
                this.voxelTypeMap[type],
                chunkX,
                chunkZ,
                positions.buffer,
                faces.buffer,
                shapes.buffer,
                uvs.buffer,
                light.buffer,
                ambientOcclusion.buffer,
            ]),
                [
                    positions.buffer,
                    faces.buffer,
                    shapes.buffer,
                    uvs.buffer,
                    light.buffer,
                    ambientOcclusion.buffer,
                ];
            this.count++;
            if (this.count >= this.numBuilders) {
                this.count = 0;
            }
        }
    }
}
