export class DVEVoxel2 {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Voxel 1",
        shapeId: 0,
        id: "dve:voxel2",
    };
    hooks = {};
    getShapeId(voxelData) {
        return this.data.shapeId;
    }
    getUVs(uvs, voxelExposedFaceEncodedBit, voxelData) {
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
            uvs.push(3);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")) {
            uvs.push(3);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")) {
            uvs.push(3);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")) {
            uvs.push(3);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")) {
            uvs.push(3);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")) {
            uvs.push(3);
        }
    }
}
