import type { RawTexture2DArray } from "@babylonjs/core";
import type { TextureData } from "Meta/Render/Textures/Texture.types.js";
import { DivineShader } from "divine-shaders";
import { NodeMaterial } from "../Materials/NodeMaterial.js";
declare class TextureSegment {
    parentID: string;
    id: string;
    mode: "sampler" | "overlay";
    attributeID: string;
    totalTextures: number;
    textures: TextureData[];
    textureIndex: Record<string, number>;
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
    shaderTexture: RawTexture2DArray[];
    textureID: string;
    constructor(parentID: string, id: string, mode: "sampler" | "overlay", attributeID: string);
    clearData(): void;
    flush(): void;
}
export declare class TextureType {
    id: string;
    extension: string;
    segments: Map<string, TextureSegment>;
    materials: Map<string, NodeMaterial>;
    shader: DivineShader;
    constructor(id: string);
    flushAll(): void;
    build(): Promise<void>;
    getTextureIndex(textureId: string, varation?: string, segment?: string): number;
    clearSegmentData(): void;
    removeSegment(id: string): false | undefined;
    addTexture(data: TextureData): false | undefined;
    addToShader(shader: DivineShader): DivineShader;
    addToMaterial(material: NodeMaterial): void;
    runAnimations(): void;
    getTextureIndexMap(): Record<string, Record<string, number>>;
    _processVariations(textureData: TextureData, paths: Map<string, Uint8ClampedArray | false>, map: Record<string, number>, animations: number[][], textureAnimatioTimes: number[][], extension: string, count: number): number;
    _getPath(textureData: TextureData, varation: string | undefined, extension: string): string;
    buildTextureIndex(): false | undefined;
}
export {};
