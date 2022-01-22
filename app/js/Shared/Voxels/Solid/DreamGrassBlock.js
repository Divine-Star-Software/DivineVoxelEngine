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
        const uv = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-top");
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
            uvs.push(uv);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")) {
            uvs.push(uv);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")) {
            uvs.push(uv);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")) {
            uvs.push(uv);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")) {
            uvs.push(uv);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")) {
            uvs.push(uv);
        }
    }
    getAO(data) {
        this.voxelHelper.calculateVoxelAO(data, this);
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
