export const BuilderComms = {};
/**# Builder Comm
 * ---
 * Handles communication with the mesh builders thread.
 */
export class BuilderComm {
    DVEW;
    count = 0;
    numBuilders = 0;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    voxelBuildOrder = ["solid", "flora", "magma"];
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
    connectBuilder(port) {
        this.builders.push(port);
        this.numBuilders++;
        port.onmessage = (event) => {
            if (this.DVEW.voxelManager.shapMapIsSet())
                return;
            if (event.data[0] == "connect-shape-map") {
                this.DVEW.voxelManager.setShapeMap(event.data[1]);
            }
        };
    }
    requestFullChunkBeRemoved(chunkX, chunkZ) {
        this.mainThreadCom.postMessage(["remove-chunk", chunkX, chunkZ]);
    }
    async requestFullChunkBeBuiltAsync(chunkX, chunkY, chunkZ, template) {
        let i = this.voxelBuildOrder.length;
        while (i--) {
            const type = this.voxelBuildOrder[i];
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0)
                continue;
            if (type == "fluid") {
                continue;
            }
            else {
                const positions = new Uint16Array(baseTemplate.positionTemplate);
                const faces = new Uint8Array(baseTemplate.faceTemplate);
                const shapes = new Uint16Array(baseTemplate.shapeTemplate);
                const uvs = new Uint16Array(baseTemplate.uvTemplate);
                const colors = new Float32Array(baseTemplate.colorTemplate);
                const light = new Float32Array(baseTemplate.lightTemplate);
                const ambientOcclusion = new Float32Array(baseTemplate.aoTemplate);
                this.builders[this.count].postMessage([
                    this.voxelTypeMap[type],
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
                ]),
                    [
                        positions.buffer,
                        faces.buffer,
                        shapes.buffer,
                        uvs.buffer,
                        colors.buffer,
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
    requestFullChunkBeBuilt(chunkX, chunkY, chunkZ, template) {
        let i = this.voxelBuildOrder.length;
        while (i--) {
            const type = this.voxelBuildOrder[i];
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0)
                continue;
            if (type == "fluid") {
                continue;
            }
            else {
                const positions = new Uint16Array(baseTemplate.positionTemplate);
                const faces = new Uint8Array(baseTemplate.faceTemplate);
                const shapes = new Uint16Array(baseTemplate.shapeTemplate);
                const uvs = new Uint16Array(baseTemplate.uvTemplate);
                const colors = new Float32Array(baseTemplate.colorTemplate);
                const light = new Float32Array(baseTemplate.lightTemplate);
                const ambientOcclusion = new Float32Array(baseTemplate.aoTemplate);
                this.builders[this.count].postMessage([
                    this.voxelTypeMap[type],
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
                ]),
                    [
                        positions.buffer,
                        faces.buffer,
                        shapes.buffer,
                        uvs.buffer,
                        colors.buffer,
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
}