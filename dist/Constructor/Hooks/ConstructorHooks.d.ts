export declare const ConstructorHooks: {
    texturesRegistered: import("divine-hooks/Classes/SyncHook").SyncHook<{
        textureDataHasBeenSet: boolean;
        data: import("../..").TextureTypeUVMap;
        getTextureUV(data: import("../..").ConstructorTextureData, overlay?: boolean): number;
        setUVTextureMap(data: import("../..").TextureTypeUVMap): void;
        releaseTextureData(): void;
        isReady(): boolean;
    }, void>;
};
