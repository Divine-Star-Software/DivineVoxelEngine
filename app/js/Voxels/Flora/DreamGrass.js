export class DreamGrass {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Dream Grass ",
        shapeId: "FullBoxCross",
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
}
