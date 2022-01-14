export class Dreamestone {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Dream Stone",
        shapeId: "Box",
        id: "dve:dreamstone",
        substance: "solid",
        defaultState: ["dve:dreamstone", 0]
    };
    hooks = {};
    trueShapeId = 0;
    getShapeId(voxelData) {
        return this.trueShapeId;
    }
    getUVs(uvs, chunkX, chunkZ, voxelExposedFaceEncodedBit, voxelData) {
        let topUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-top");
        let bottomUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone");
        let sideUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-side");
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
            uvs.push(topUV);
        }
        else {
            sideUV = bottomUV;
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")) {
            uvs.push(bottomUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")) {
            uvs.push(sideUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")) {
            uvs.push(sideUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")) {
            uvs.push(sideUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")) {
            uvs.push(sideUV);
        }
    }
    getAO(data) {
        this.voxelHelper.calculateVoxelAO(data);
    }
}
