export declare const ConstructorHooks: {
    texturesRegistered: import("../../Libs/Hooks/Classes/SyncHook.js").SyncHook<{
        textureDataHasBeenSet: boolean;
        data: import("../../Meta/Render/Textures/Texture.types.js").TextureTypeUVMap;
        getTextureUV(data: import("../../Meta/Constructor/Constructor.types.js").ConstructorTextureData, overlay?: boolean): number;
        setUVTextureMap(data: import("../../Meta/Render/Textures/Texture.types.js").TextureTypeUVMap): void;
        releaseTextureData(): void;
        isReady(): boolean;
    }, void>;
};
