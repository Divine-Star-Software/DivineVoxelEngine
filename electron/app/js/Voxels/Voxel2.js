export class DVEVoxel2 {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Voxel 2",
        shapeId: 0,
        id: "dve:voxel2",
        substance: "solid",
    };
    hooks = {};
    getShapeId(voxelData) {
        return this.data.shapeId;
    }
    getUVs(uvs, voxelExposedFaceEncodedBit, voxelData) {
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
}
