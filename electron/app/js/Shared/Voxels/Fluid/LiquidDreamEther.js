export class LiquidDreamEther {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Liquid Dream Ether",
        shapeId: "FluidSourceBlock",
        id: "dve:liquiddreamether",
        substance: "fluid",
        defaultState: ["dve:liquiddreamether", 0],
    };
    hooks = {};
    trueShapeId = 0;
    process(data) {
        const uv = this.voxelHelper.textureManager.getTextureUV("fluid", "liquid-dream-ether", "still-1");
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(uv);
        }
        data.shapeStateTemplate.push(data.voxelData[1]);
        data.shapeTemplate.push(this.trueShapeId);
        this.voxelHelper.calculateVoxelLight(data, this);
    }
}
