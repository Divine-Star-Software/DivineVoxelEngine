export class DreamStonePillar {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Dream Stone Pillar",
        shapeId: 0,
        id: "dve:dreamstonepillar",
        substance: "solid",
    };
    hooks = {};
    getShapeId(voxelData) {
        return this.data.shapeId;
    }
    getUVs(uvs, voxelExposedFaceEncodedBit, voxelData) {
        let topBottomUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone-pillar", "top");
        let sideUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone-pillar");
        let sideTopUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone-pillar", "side-top");
        let sideBottom = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone-pillar", "side-bottom");
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
            uvs.push(topBottomUV);
            sideUV = sideTopUV;
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")) {
            uvs.push(topBottomUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")
            &&
                this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
            sideUV = topBottomUV;
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
}
