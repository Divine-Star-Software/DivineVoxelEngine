export declare type EngineSettingsData = {
    nexus: {
        enabled: boolean;
        autoSyncChunks: boolean;
        autoSyncVoxelPalette: boolean;
    };
    data: {
        enabled: boolean;
        autoSyncChunks: boolean;
    };
    richWorld: {
        enabled: boolean;
        autoSyncChunks: boolean;
        autoSyncVoxelPalette: boolean;
    };
    fx: {
        enabled: boolean;
        autoSyncChunks: boolean;
        autoSyncVoxelPalette: boolean;
    };
    server: {
        enabled: boolean;
    };
    textures: {
        textureSize: number;
        mipMapSizes: number[];
        animationTime: number;
    };
    floatingOrigin: {
        enable: boolean;
    };
    world: {
        maxX: number;
        minX: number;
        maxZ: number;
        minZ: number;
        maxY: number;
        minY: number;
    };
    regions: {
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
    };
    chunks: {
        autoHeightMap: boolean;
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
    };
    updating: {
        autoRebuild: boolean;
    };
    lighting: {
        doAO: boolean;
        doSunLight: boolean;
        doRGBLight: boolean;
        autoRGBLight: boolean;
        autoSunLight: boolean;
    };
    flow: {
        enable: boolean;
    };
    voxels: {
        doColors: boolean;
    };
    meshes: {
        clearChachedGeometry: boolean;
        checkMagmaCollisions: boolean;
        checkLiquidCollisions: boolean;
        checkFloraCollisions: boolean;
        checkSolidCollisions: boolean;
        seralize: boolean;
        pickable: boolean;
    };
    materials: {
        mode: "classic" | "standard";
        disableFloraShaderEffects: boolean;
        disableLiquidShaderEffects: boolean;
        doAO: boolean;
        doSunLight: boolean;
        doRGBLight: boolean;
    };
};
