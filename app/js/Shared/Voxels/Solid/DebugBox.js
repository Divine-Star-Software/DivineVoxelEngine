export class DebugBox {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Debug Box",
        shapeId: "Box",
        id: "dve:debugbox",
        substance: "solid",
        defaultState: ["dve:debugbox", 0],
    };
    trueShapeId = 0;
    hooks = {};
    getShapeId(voxelData) {
        return this.trueShapeId;
    }
    getUVs(uvs, chunkX, chunkZ, voxelExposedFaceEncodedBit, voxelData) {
        let topUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "top");
        let bottomUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "bottom");
        let northUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "north");
        let southUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "south");
        let eastUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "east");
        let westUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "west");
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
            uvs.push(topUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")) {
            uvs.push(bottomUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")) {
            uvs.push(eastUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")) {
            uvs.push(westUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")) {
            uvs.push(southUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")) {
            uvs.push(northUV);
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
