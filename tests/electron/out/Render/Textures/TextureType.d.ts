/// <reference types="babylonjs" />
import type { TextureData } from "Meta/index";
import type { DVEMaterial } from "Render/Render/Materials/DVEMaterial";
import { DivineShader } from "../../Libs/Shaders/Classes/DivineShader.js";
declare class TextureRecord {
    parentID: string;
    id: string;
    mode: "sampler" | "overlay";
    attributeID: string;
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
    paths: string[];
    texture: BABYLON.RawTexture2DArray[];
    textureID: string;
    constructor(parentID: string, id: string, mode: "sampler" | "overlay", attributeID: string);
}
export declare class TextureType {
    id: string;
    extension: string;
    textureSegments: Map<string, TextureRecord>;
    materials: Map<string, DVEMaterial>;
    shader: DivineShader;
    constructor(id: string);
    addTexture(data: TextureData): false | undefined;
    addToShader(shader: DivineShader): DivineShader;
    addToMaterial(material: DVEMaterial): void;
    runAnimations(): void;
    getTextureUVMap(): Record<string, Record<string, number>>;
}
export {};
