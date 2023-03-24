import type { TextureRotations } from "../Types/Geometry.types";
import { QuadBuilderTool } from "./MeshBuilderTool.js";
import { QuadVertexData } from "../Classes/VertexData.js";
declare class TextureQuadBulder extends QuadBuilderTool {
    constructor();
    _lightData: QuadVertexData;
    _AOData: QuadVertexData;
    _animationData: QuadVertexData;
    clear(): this;
    textures: {
        _s: TextureQuadBulder;
        _data: {
            width: number[];
            height: number[];
        };
        _fliped: boolean;
        advancedUVs: {
            hs1: number;
            hs2: number;
            he1: number;
            he2: number;
            ws1: number;
            ws2: number;
            we1: number;
            we2: number;
        };
        resetAdvancedUVs(): TextureQuadBulder;
        addAdvancedUVs(textureId: number): TextureQuadBulder;
        _rotation: TextureRotations;
        clear(): TextureQuadBulder;
        setFlipped(flipped: boolean): TextureQuadBulder;
        setWidth(start: number, end: number): TextureQuadBulder;
        setHeight(start: number, end: number): TextureQuadBulder;
        setRoation(rotation: TextureRotations): TextureQuadBulder;
        add(textureId: number): TextureQuadBulder;
    };
}
export declare class TextureShapeTool {
    quad: TextureQuadBulder;
}
export {};
