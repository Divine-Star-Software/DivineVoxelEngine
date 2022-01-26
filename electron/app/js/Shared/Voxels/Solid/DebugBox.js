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
    process(data) {
        let topUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "top");
        let bottomUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "bottom");
        let northUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "north");
        let southUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "south");
        let eastUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "east");
        let westUV = this.voxelHelper.textureManager.getTextureUV("solid", "debug", "west");
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(topUV);
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(bottomUV);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(westUV);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(eastUV);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(northUV);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(southUV);
        }
        data.shapeTemplate.push(this.trueShapeId);
        this.voxelHelper.processVoxelLight(data, this);
    }
}
