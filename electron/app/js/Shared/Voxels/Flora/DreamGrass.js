export class DreamGrass {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Dream Grass ",
        shapeId: "FullBoxDiagonalIntersection",
        id: "dve:dreamgrass",
        substance: "flora",
        defaultState: ["dve:dreamgrass", 0],
    };
    hooks = {};
    trueShapeId = 0;
    process(data) {
        const uv = this.voxelHelper.textureManager.getTextureUV("flora", "dreamgrass");
        data.shapeStateTemplate.push(data.voxelData[1]);
        data.shapeTemplate.push(this.trueShapeId);
        data.uvTemplate.push(uv, uv);
        data.aoTemplate.push(1, 1, 1, 1, 1, 1, 1, 1);
        this.voxelHelper.calculateVoxelLight(data, this);
    }
}
