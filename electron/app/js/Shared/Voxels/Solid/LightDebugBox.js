export class LightDebugBox {
    voxelHelper;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
    }
    data = {
        name: "Light Debug Box",
        shapeId: "Box",
        id: "dve:lightdebug",
        substance: "solid",
        defaultState: ["dve:lightdebug", 0],
        lightSource: false,
    };
    trueShapeId = 0;
    hooks = {
        texturesRegistered: () => {
            this.textures = {
                0: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-0"),
                1: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-1"),
                2: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-2"),
                3: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-3"),
                4: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-4"),
                5: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-5"),
                6: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-6"),
                7: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-7"),
                8: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-8"),
                9: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-9"),
                10: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-10"),
                11: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-11"),
                12: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-12"),
                13: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-13"),
                14: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-14"),
                15: this.voxelHelper.textureManager.getTextureUV("solid", "light-debug", "light-level-15"),
            };
        },
    };
    textures;
    process(data) {
        const trueX = data.chunkX + data.x;
        const trueY = data.chunkY + data.y;
        const trueZ = data.chunkZ + data.z;
        const light = this.voxelHelper.worldData.getLightValue(trueX, trueY + 1, trueZ, "r");
        let uv = this.textures[light];
        console.log(light);
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
        data.shapeStateTemplate.push(data.voxelData[1]);
        this.voxelHelper.processVoxelLight(data, this);
    }
}
