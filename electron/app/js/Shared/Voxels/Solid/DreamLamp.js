export class DreamLamp {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Dream Lamp",
        shapeId: "Box",
        id: "dve:dreamlamp",
        substance: "solid",
        defaultState: ["dve:dreamlamp", 0],
        lightSource: true,
        lightValue: 0b1110_0000_1110_0000,
    };
    hooks = {};
    trueShapeId = 0;
    process(data) {
        const uv = this.voxelHelper.textureManager.getTextureUV("solid", "dreamlamp");
        console.log(uv);
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
        data.shapeTemplate.push(this.trueShapeId);
        data.shapeStateTemplate.push(0);
        this.voxelHelper.processVoxelLight(data, this);
    }
}
