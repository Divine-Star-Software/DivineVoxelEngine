import type { TextureTypeUVMap } from "Meta/Render/Textures/Texture.types.js";
export declare const WorldComm: import("threadcomm").CommBase;
export declare const RichWorldComm: import("threadcomm").CommBase & {
    $INIT(): void;
};
export declare const NexusComm: import("threadcomm").CommBase & {
    $INIT(): void;
};
export declare const FXComm: import("threadcomm").CommBase & {
    $INIT(): void;
};
export declare const DataComm: import("threadcomm").CommBase & {
    $INIT(): void;
};
export declare const ConstructorCommManager: import("threadcomm").CommManager & {
    $INIT(): void;
    syncTextureData(dasta: TextureTypeUVMap): void;
    setConstructors(constructors: Worker[]): void;
};
