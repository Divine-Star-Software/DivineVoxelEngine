export class Dreamestone {
    voxelHelper;
    topUV;
    bottomUV;
    sideUV;
    data = {
        name: "Dream Stone",
        shapeId: "Box",
        id: "dve:dreamstone",
        substance: "solid",
        defaultState: ["dve:dreamstone", 0],
    };
    hooks = {};
    trueShapeId = 0;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
        this.topUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-top");
        this.bottomUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone");
        this.sideUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-side");
    }
    getShapeId(voxelData) {
        return this.trueShapeId;
    }
    getUVs(uvs, chunkX, chunkZ, voxelExposedFaceEncodedBit, voxelData) {
        return;
    }
    getAO(data) {
        return;
    }
    getLight(data) {
        return;
    }
    process(data) {
        let topUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-top");
        let bottomUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone");
        let sideUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-side");
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(topUV);
        }
        else {
            sideUV = bottomUV;
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(bottomUV);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(sideUV);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(sideUV);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(sideUV);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(sideUV);
        }
        this.voxelHelper.processVoxelLight(data, this);
        return;
    }
}
