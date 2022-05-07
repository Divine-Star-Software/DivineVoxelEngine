/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export class ChunkProcessor {
    DVEB;
    worldBottomY = 0;
    worldTopY = 256;
    chunkTemplates = {};
    voxelByte;
    _3dArray;
    exposedFaces = [];
    worldMatrix;
    constructor(DVEB) {
        this.DVEB = DVEB;
        this.worldMatrix = DVEB.worldMatrix;
        this.voxelByte = DVEB.UTIL.getVoxelByte();
        this._3dArray = DVEB.UTIL.getFlat3DArray();
    }
    syncChunkBounds() {
        this.DVEB.worldBounds.syncBoundsWithFlat3DArray(this._3dArray);
    }
    getBaseTemplateNew() {
        return {
            solid: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
            transparent: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
            flora: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
            fluid: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
            magma: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
        };
    }
    makeAllChunkTemplates(voxels, chunkX, chunkY, chunkZ) {
        const template = this.getBaseTemplateNew();
        let maxX = this.DVEB.worldBounds.chunkXSize;
        let maxZ = this.DVEB.worldBounds.chunkZSize;
        let maxY = this.DVEB.worldBounds.chunkYSize;
        for (let x = 0; x < maxX; x++) {
            for (let z = 0; z < maxZ; z++) {
                for (let y = 0; y < maxY; y++) {
                    const rawVoxelData = this._3dArray.getValue(x, y, z, voxels);
                    if (this.voxelByte.getId(rawVoxelData) == 0)
                        continue;
                    const voxelCheck = this.DVEB.worldMatrix.getVoxel(chunkX + x, chunkY + y, chunkZ + z);
                    if (!voxelCheck)
                        continue;
                    const voxelObject = this.DVEB.voxelManager.getVoxel(voxelCheck[0]);
                    const voxelState = voxelCheck[1];
                    const baseTemplate = template[voxelObject.data.substance];
                    let faceBit = 0;
                    if (this.DVEB.voxelHelper.voxelFaceCheck(voxelObject, rawVoxelData, x + chunkX, y + chunkY + 1, z + chunkZ)) {
                        faceBit = faceBit | (1 << 0);
                        this.exposedFaces[0] = 1;
                    }
                    else {
                        this.exposedFaces[0] = 0;
                    }
                    if (this.DVEB.voxelHelper.voxelFaceCheck(voxelObject, rawVoxelData, x + chunkX, y + chunkY - 1, z + chunkZ)) {
                        faceBit = faceBit | (1 << 1);
                        this.exposedFaces[1] = 1;
                    }
                    else {
                        this.exposedFaces[1] = 0;
                    }
                    if (this.DVEB.voxelHelper.voxelFaceCheck(voxelObject, rawVoxelData, x + chunkX + 1, y + chunkY, z + chunkZ)) {
                        faceBit = faceBit | (1 << 2);
                        this.exposedFaces[2] = 1;
                    }
                    else {
                        this.exposedFaces[2] = 0;
                    }
                    if (this.DVEB.voxelHelper.voxelFaceCheck(voxelObject, rawVoxelData, x + chunkX - 1, y + chunkY, z + chunkZ)) {
                        faceBit = faceBit | (1 << 3);
                        this.exposedFaces[3] = 1;
                    }
                    else {
                        this.exposedFaces[3] = 0;
                    }
                    if (this.DVEB.voxelHelper.voxelFaceCheck(voxelObject, rawVoxelData, x + chunkX, y + chunkY, z + chunkZ - 1)) {
                        faceBit = faceBit | (1 << 4);
                        this.exposedFaces[4] = 1;
                    }
                    else {
                        this.exposedFaces[4] = 0;
                    }
                    if (this.DVEB.voxelHelper.voxelFaceCheck(voxelObject, rawVoxelData, x + chunkX, y + chunkY, z + chunkZ + 1)) {
                        faceBit = faceBit | (1 << 5);
                        this.exposedFaces[5] = 1;
                    }
                    else {
                        this.exposedFaces[5] = 0;
                    }
                    if (faceBit == 0)
                        continue;
                    voxelObject.process({
                        voxelState: voxelState,
                        voxelData: rawVoxelData,
                        exposedFaces: this.exposedFaces,
                        shapeTemplate: baseTemplate.shapeTemplate,
                        shapeStateTemplate: baseTemplate.shapeStateTemplate,
                        uvTemplate: baseTemplate.uvTemplate,
                        colorTemplate: baseTemplate.colorTemplate,
                        aoTemplate: baseTemplate.aoTemplate,
                        lightTemplate: baseTemplate.lightTemplate,
                        chunkX: chunkX,
                        chunkY: chunkY,
                        chunkZ: chunkZ,
                        x: x,
                        y: y,
                        z: z,
                    }, this.DVEB);
                    // baseTemplate.shapeTemplate.push(voxel.getShapeId(voxelPaletteData));
                    baseTemplate.positionTemplate.push(x, y, z);
                    baseTemplate.faceTemplate.push(faceBit);
                }
            }
        }
        const positions = new Uint16Array(template.fluid.positionTemplate);
        const faces = new Uint8Array(template.fluid.faceTemplate);
        const shapes = new Uint16Array(template.fluid.shapeTemplate);
        const uvs = new Uint16Array(template.fluid.uvTemplate);
        const colors = new Float32Array(template.fluid.colorTemplate);
        const light = new Float32Array(template.fluid.lightTemplate);
        this.DVEB.fluidBuilderComm.sendMessage(0, [
            chunkX,
            chunkY,
            chunkZ,
            positions.buffer,
            faces.buffer,
            shapes.buffer,
            uvs.buffer,
            colors.buffer,
            light.buffer,
        ], [
            positions.buffer,
            faces.buffer,
            shapes.buffer,
            uvs.buffer,
            colors.buffer,
            light.buffer,
        ]);
        return template;
    }
}
