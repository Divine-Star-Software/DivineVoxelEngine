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
    worldMatrix;
    chunkBounds;
    constructor(DVEB) {
        this.DVEB = DVEB;
        this.worldMatrix = DVEB.worldMatrix;
        this.chunkBounds = DVEB.chunkBounds;
        this.voxelByte = DVEB.UTIL.getVoxelByte();
        this._3dArray = DVEB.UTIL.getFlat3DArray();
    }
    syncChunkBounds() {
        this.chunkBounds.syncBoundsWithFlat3DArray(this._3dArray);
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
        let maxX = this.chunkBounds.chunkXSize;
        let maxZ = this.chunkBounds.chunkZSize;
        let maxY = this.chunkBounds.chunkYSize;
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
        /*   this.DVEW.builderCommManager.requestFullChunkBeBuilt(
         chunkX,
         chunkY,
         chunkZ,
         template
        );
        this.DVEW.fluidBuilderComm.setChunkTemplateForFluidMesh(
         chunkX,
         chunkY,
         chunkZ,
         template.fluid
        ); */
        return template;
    }
}
