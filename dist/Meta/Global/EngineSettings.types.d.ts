export declare type EngineSettingsData = {
    matrix?: {
        enabled: boolean;
    };
    textureOptions?: {
        width: number;
        height: number;
        animationTime: number;
    };
    world?: {
        voxelPaletteMode: "global" | "per-region";
    };
    regions?: {
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
    };
    chunks?: {
        autoHeightMap: boolean;
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
    };
    updating?: {
        autoRebuild: boolean;
        rebuildMode: "sync" | "async";
    };
    lighting?: {
        doAO: boolean;
        doSunLight: boolean;
        doRGBLight: boolean;
        autoRGBLight: boolean;
        autoSunLight: boolean;
    };
    voxels?: {
        doColors: boolean;
    };
    materials?: {
        disableFloraShaderEffects: boolean;
        disableFluidShaderEffects: boolean;
        doAO: boolean;
        doSunLight: boolean;
        doRGBLight: boolean;
    };
    meshing?: {
        maxBuilderThreads: number;
    };
};
