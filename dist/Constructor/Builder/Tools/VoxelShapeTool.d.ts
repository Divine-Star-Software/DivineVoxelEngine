import type { CustomVertexData, TextureRotations } from "../Types/Geometry.types";
import { QuadBuilderTool } from "./MeshBuilderTool.js";
declare class VoxelQuadBulder extends QuadBuilderTool {
    constructor();
    clear(): this;
    setFlipped(flipped: boolean): this;
    light: {
        _s: VoxelQuadBulder;
        lightMap: number[];
        add(data: [
            number,
            number,
            number,
            number
        ] | [
            number
        ]): VoxelQuadBulder;
    };
    AO: {
        _s: VoxelQuadBulder;
        add(data: [
            number,
            number,
            number,
            number
        ] | [
            number
        ]): VoxelQuadBulder;
    };
    uvs: {
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
        addAdvancedUVs(uv: number): VoxelQuadBulder;
        _rotation: TextureRotations;
        clear(): VoxelQuadBulder;
        setFlipped(flipped: boolean): VoxelQuadBulder;
        setWidth(start: number, end: number): VoxelQuadBulder;
        setHeight(start: number, end: number): VoxelQuadBulder;
        setRoation(rotation: TextureRotations): VoxelQuadBulder;
        add(uv: number): VoxelQuadBulder;
    };
    overlayUVs: {
        _s: VoxelQuadBulder;
        add(cumstomUVS: CustomVertexData): VoxelQuadBulder;
    };
    faceData: {
        _s: VoxelQuadBulder;
        add(v1: number, v2?: number, v3?: number, v4?: number): VoxelQuadBulder;
    };
}
export declare class VoxelShapeTool {
    quad: VoxelQuadBulder;
}
export {};
