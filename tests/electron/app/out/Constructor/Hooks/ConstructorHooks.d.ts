export declare const ConstructorHooks: {
    texturesRegistered: import("../../Libs/Hooks/Classes/SyncHook.js").SyncHook<{
        textureDataHasBeenSet: boolean;
        uvTextureMap: Record<string, Record<string, number>>;
        overlayUVTextureMap: Record<string, Record<string, number>>;
        getTextureUV(data: import("../../Meta/Constructor/Constructor.types.js").ConstructorTextureData, overlay?: boolean): number;
        setUVTextureMap(data: Record<import("../../Meta/index.js").TextureTypes, Record<string, number>>): void;
        setOverlayUVTextureMap(data: Record<import("../../Meta/index.js").TextureTypes, Record<string, number>>): void;
        releaseTextureData(): void;
        isReady(): boolean;
    }, void>;
};
