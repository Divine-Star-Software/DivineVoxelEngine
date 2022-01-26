export class DVEVoxel1 {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Voxel 1",
        shapeId: 0,
        id: "dve:voxel1",
        substance: "solid",
    };
    hooks = {};
    getShapeId(voxelData) {
        return this.data.shapeId;
    }
    getUVs(uvs, voxelExposedFaceEncodedBit, voxelData) {
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
}
