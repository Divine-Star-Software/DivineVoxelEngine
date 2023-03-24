import type { RawTexture2DArray } from "@babylonjs/core";
import type { TextureData } from "Meta/Render/Textures/Texture.types.js";
import type { DVEMaterial } from "Render/Render/Materials/DVEMaterial";
import { DivineShader } from "divine-shaders";
declare class TextureRecord {
    parentID: string;
    id: string;
    mode: "sampler" | "overlay";
    attributeID: string;
    totalTextures: number;
    textures: TextureData[];
    textureMap: Record<string, number>;
    animationsMap: number[][];
    animationTimes: number[][];
    animations: {
        uniformIndex: number;
        overlay?: boolean;
        keys: number[];
        currentFrame: number;
        currentCount: number;
        keyCounts: number[];
    }[];
    varyingID: string;
    animationUniforID: string;
    animationUniform: Float32Array;
    paths: Map<string, false | Uint8ClampedArray>;
    texture: RawTexture2DArray[];
    textureID: string;
    constructor(parentID: string, id: string, mode: "sampler" | "overlay", attributeID: string);
    clearData(): void;
}
export declare class TextureType {
    id: string;
    extension: string;
    textureSegments: Map<string, TextureRecord>;
    materials: Map<string, DVEMaterial>;
    shader: DivineShader;
    constructor(id: string);
    clearSegmentData(): void;
    addTexture(data: TextureData): false | undefined;
    addToShader(shader: DivineShader): DivineShader;
    addToMaterial(material: DVEMaterial): void;
    runAnimations(): void;
    getTextureUVMap(): Record<string, Record<string, number>>;
}
export {};
