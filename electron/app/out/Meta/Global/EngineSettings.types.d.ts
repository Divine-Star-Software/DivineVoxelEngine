export declare type EngineSettingsData = {
    textureOptions?: {
        width: number;
        height: number;
        animationTime: number;
    };
    chunks?: {
        voxelPaletteMode: 'global' | "per-chunk";
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
    };
    meshing?: {
        maxBuilderThreads: number;
    };
};
