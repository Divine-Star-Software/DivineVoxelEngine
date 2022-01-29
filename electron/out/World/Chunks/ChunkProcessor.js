import { ChunkOcculsionCalcuation, } from "./Functions/ChunkAO.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export class ChunkProcessor {
    DVEW;
    worldBottomY = 0;
    worldTopY = 256;
    chunkOcculsionCalcuation = ChunkOcculsionCalcuation;
    chunkTemplates = {};
    voxelByte;
    /**## substance rules
     * ---
     * defines substance interactions for face culling/adding.
     * First is the voxel being tested. The second are its neighbors
     */
    substanceRules = {
        "solid-solid": false,
        "solid-flora": true,
        "solid-transparent": true,
        "solid-fluid": true,
        "solid-magma": true,
        "transparent-solid": true,
        "transparent-flora": true,
        "transparent-transparent": true,
        "transparent-fluid": true,
        "transparent-magma": true,
        "fluid-solid": false,
        "fluid-flora": true,
        "fluid-transparent": true,
        "fluid-fluid": false,
        "fluid-magma": true,
        "magma-solid": false,
        "magma-flora": true,
        "magma-transparent": true,
        "magma-fluid": true,
        "magma-magma": false,
    };
    exposedFaces = [];
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.worldData = DVEW.worldData;
        this.voxelByte = DVEW.UTIL.getVoxelByte();
    }
    worldData;
    getBaseTemplateNew() {
        return {
            ...{
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
            },
        };
    }
    async makeAllChunkTemplatesAsync(chunk, chunkX, chunkY, chunkZ) {
        const template = this.getBaseTemplateNew();
        const voxels = chunk.voxels;
        const min = chunk.maxMinHeight[0];
        const max = chunk.maxMinHeight[1];
        for (let x = 0; x < 16; x++) {
            if (!voxels[x]) {
                continue;
            }
            for (let z = 0; z < 16; z++) {
                if (!voxels[x][z]) {
                    continue;
                }
                for (const y of voxels[x][z].keys()) {
                    const voxelData = voxels[x][z][y];
                    if (this.voxelByte.getId(voxelData) == 0)
                        continue;
                    const voxelCheck = this.DVEW.worldData.getVoxel(chunkX + x, chunkY + y, chunkZ + z);
                    if (!voxelCheck)
                        continue;
                    const voxel = voxelCheck[0];
                    const voxelState = voxelCheck[1];
                    const baseTemplate = template[voxel.data.substance];
                    let faceBit = 0;
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX, y + chunkY + 1, z + chunkZ)) {
                        faceBit = faceBit | (1 << 0);
                        this.exposedFaces[0] = 1;
                    }
                    else {
                        this.exposedFaces[0] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX, y + chunkY - 1, z + chunkZ)) {
                        faceBit = faceBit | (1 << 1);
                        this.exposedFaces[1] = 1;
                    }
                    else {
                        this.exposedFaces[1] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX + 1, y + chunkY, z + chunkZ)) {
                        faceBit = faceBit | (1 << 2);
                        this.exposedFaces[2] = 1;
                    }
                    else {
                        this.exposedFaces[2] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX - 1, y + chunkY, z + chunkZ)) {
                        faceBit = faceBit | (1 << 3);
                        this.exposedFaces[3] = 1;
                    }
                    else {
                        this.exposedFaces[3] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX, y + chunkY, z + chunkZ - 1)) {
                        faceBit = faceBit | (1 << 4);
                        this.exposedFaces[4] = 1;
                    }
                    else {
                        this.exposedFaces[4] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX, y + chunkY, z + chunkZ + 1)) {
                        faceBit = faceBit | (1 << 5);
                        this.exposedFaces[5] = 1;
                    }
                    else {
                        this.exposedFaces[5] = 0;
                    }
                    if (faceBit == 0)
                        continue;
                    voxel.process({
                        voxelState: voxelState,
                        voxelData: voxelData,
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
                    });
                    // baseTemplate.shapeTemplate.push(voxel.getShapeId(voxelPaletteData));
                    baseTemplate.positionTemplate.push(x, y, z);
                    baseTemplate.faceTemplate.push(faceBit);
                }
            }
        }
        this.DVEW.builderManager.requestFullChunkBeBuilt(chunkX, chunkY, chunkZ, template);
        return template;
    }
    makeAllChunkTemplates(chunk, chunkX, chunkY, chunkZ) {
        const template = this.getBaseTemplateNew();
        const voxels = chunk.voxels;
        const min = chunk.maxMinHeight[0];
        const max = chunk.maxMinHeight[1];
        for (let x = 0; x < 16; x++) {
            if (!voxels[x]) {
                continue;
            }
            for (let z = 0; z < 16; z++) {
                if (!voxels[x][z]) {
                    continue;
                }
                for (const y of voxels[x][z].keys()) {
                    const voxelData = voxels[x][z][y];
                    if (this.voxelByte.getId(voxelData) == 0)
                        continue;
                    const voxelCheck = this.DVEW.worldData.getVoxel(chunkX + x, chunkY + y, chunkZ + z);
                    if (!voxelCheck)
                        continue;
                    const voxel = voxelCheck[0];
                    const voxelState = voxelCheck[1];
                    const baseTemplate = template[voxel.data.substance];
                    let faceBit = 0;
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX, y + chunkY + 1, z + chunkZ)) {
                        faceBit = faceBit | (1 << 0);
                        this.exposedFaces[0] = 1;
                    }
                    else {
                        this.exposedFaces[0] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX, y + chunkY - 1, z + chunkZ)) {
                        faceBit = faceBit | (1 << 1);
                        this.exposedFaces[1] = 1;
                    }
                    else {
                        this.exposedFaces[1] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX + 1, y + chunkY, z + chunkZ)) {
                        faceBit = faceBit | (1 << 2);
                        this.exposedFaces[2] = 1;
                    }
                    else {
                        this.exposedFaces[2] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX - 1, y + chunkY, z + chunkZ)) {
                        faceBit = faceBit | (1 << 3);
                        this.exposedFaces[3] = 1;
                    }
                    else {
                        this.exposedFaces[3] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX, y + chunkY, z + chunkZ - 1)) {
                        faceBit = faceBit | (1 << 4);
                        this.exposedFaces[4] = 1;
                    }
                    else {
                        this.exposedFaces[4] = 0;
                    }
                    if (this.worldData.voxelFaceCheck(voxel, voxelData, x + chunkX, y + chunkY, z + chunkZ + 1)) {
                        faceBit = faceBit | (1 << 5);
                        this.exposedFaces[5] = 1;
                    }
                    else {
                        this.exposedFaces[5] = 0;
                    }
                    if (faceBit == 0)
                        continue;
                    voxel.process({
                        voxelState: voxelState,
                        voxelData: voxelData,
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
                    });
                    // baseTemplate.shapeTemplate.push(voxel.getShapeId(voxelPaletteData));
                    baseTemplate.positionTemplate.push(x, y, z);
                    baseTemplate.faceTemplate.push(faceBit);
                }
            }
        }
        return template;
    }
}
