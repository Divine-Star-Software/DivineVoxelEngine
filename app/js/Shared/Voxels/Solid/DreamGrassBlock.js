export class DreamGrassBlock {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Dream Grass Block",
        shapeId: "Box",
        id: "dve:dreamgrassblock",
        substance: "solid",
        defaultState: ["dve:dreamgrassblock", 0],
    };
    hooks = {};
    trueShapeId = 0;
    getShapeId(voxelData) {
        return this.trueShapeId;
    }
    getUVs(uvs, chunkX, chunkZ, voxelExposedFaceEncodedBit, voxelData) {
        return;
    }
    getAO(data) {
        //this.voxelHelper.calculateVoxelAO(data, this);
    }
    getLight(data) {
        //this.voxelHelper.calculateVoxelLight(data, this);
    }
    process(data) {
        const uv = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-top");
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(uv);
        }
        this.voxelHelper.processVoxelLight(data, this);
    }
}
