export class LiquidDreamEther {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Liquid Dream Ether",
        shapeId: "Box",
        id: "dve:liquiddreamether",
        substance: "fluid",
        defaultState: ["dve:liquiddreamether", 0],
    };
    hooks = {};
    trueShapeId = 0;
    process(data) {
        let uv = this.voxelHelper.textureManager.getTextureUV("fluid", "liquid-dream-ether", "still-1");
        if (data.exposedFaces[0]) {
            data.aoTemplate.push(1, 1, 1, 1);
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[1]) {
            data.aoTemplate.push(1, 1, 1, 1);
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[2]) {
            data.aoTemplate.push(1, 1, 1, 1);
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[3]) {
            data.aoTemplate.push(1, 1, 1, 1);
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[4]) {
            data.aoTemplate.push(1, 1, 1, 1);
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[5]) {
            data.aoTemplate.push(1, 1, 1, 1);
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[0]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[1]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[2]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[3]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[4]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[5]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        data.shapeTemplate.push(this.trueShapeId);
    }
}
