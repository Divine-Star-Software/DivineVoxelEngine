import type { TextureTypeUVMap } from "Meta/Render/Textures/Texture.types.js";
export declare const ConstructorCommManager: import("threadcomm").CommManager & {
    $INIT(dasta: TextureTypeUVMap): void;
    createConstructors(path: string, numBuilders?: number): void;
    setConstructors(constructors: Worker[]): void;
    syncSettings(data: any): void;
};
