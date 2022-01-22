export class DreamGrass {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Dream Grass ",
        shapeId: "FullBoxDiagonalIntersection",
        id: "dve:dreamgrass",
        substance: "flora",
        defaultState: ["dve:dreamgrass", 0],
    };
    hooks = {};
    trueShapeId = 0;
    getShapeId(voxelData) {
        return this.trueShapeId;
    }
    getUVs(uvs, chunkX, chunkZ, voxelExposedFaceEncodedBit, voxelData) {
        const uv = this.voxelHelper.textureManager.getTextureUV("flora", "dreamgrass");
        uvs.push(uv, uv);
    }
    getAO(data) {
        data.aoTemplate.push(1, 1, 1, 1, 1, 1, 1, 1);
    }
    getLight(data) {
        this.voxelHelper.calculateVoxelLight(data, this);
    }
    process(data) {
        if (data.exposedFaces[0]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[1]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[2]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[3]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[4]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[5]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
    }
}
