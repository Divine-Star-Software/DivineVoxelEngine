import type { TextureRotations } from "../Types/Geometry.types";
import { QuadBuilderTool } from "./MeshBuilderTool.js";
import { QuadVertexData } from "../Classes/VertexData.js";
declare class VoxelQuadBulder extends QuadBuilderTool {
    constructor();
    _lightData: QuadVertexData;
    _AOData: QuadVertexData;
    _animationData: QuadVertexData;
    clear(): this;
    create(): this;
    setFlipped(flipped: boolean): this;
    animationState: {
        _s: VoxelQuadBulder;
        add(data: QuadVertexData): VoxelQuadBulder;
    };
    light: {
        _s: VoxelQuadBulder;
        add(data: QuadVertexData): VoxelQuadBulder;
    };
    AO: {
        _s: VoxelQuadBulder;
        add(data: QuadVertexData): VoxelQuadBulder;
    };
    textures: {
        _s: VoxelQuadBulder;
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
        resetAdvancedUVs(): VoxelQuadBulder;
        addAdvancedUVs(textureId: number): VoxelQuadBulder;
        _rotation: TextureRotations;
        clear(): VoxelQuadBulder;
        setFlipped(flipped: boolean): VoxelQuadBulder;
        setWidth(start: number, end: number): VoxelQuadBulder;
        setHeight(start: number, end: number): VoxelQuadBulder;
        setRoation(rotation: TextureRotations): VoxelQuadBulder;
        add(textureId: number): VoxelQuadBulder;
    };
    overlayTexture: {
        _s: VoxelQuadBulder;
        add(data: QuadVertexData): VoxelQuadBulder;
    };
}
export declare class VoxelShapeTool {
    quad: VoxelQuadBulder;
}
export {};
