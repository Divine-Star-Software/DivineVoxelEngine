import { AddQuadUVsData, AdvancedUVs, TextureRotations } from "Meta/Constructor/Geometry/Geometry.types";
import { VoxelShapeAddData } from "Meta/index";
import { DirectionNames } from "Meta/Util.types";
declare type UVFaceTypes = "top" | "side" | "bottom";
/**
 * |||||||||||||||||||||||||||||||||||||
 * [TOP & BOTTOM]
 * Not Flipped
 *
 * 2: w 0,h 0        3: w 1, h 0
 *          |--------|
 *          |      / |
 *          |   /    |
 *          |/       |
 *          |--------|
 * 1: w 0,h 1        4: w 1,h 1
 *
 * ===============================
 * Flipped
 *
 * 4: w 1,h 0        3: w 0, h 0
 *          |--------|
 *          |\       |
 *          |   \    |
 *          |      \ |
 *          |--------|
 * 1: w 1,h 1        2: w 0, h 1
 *
 *||||||||||||||||||||||||||||||||||||||||
 * [Sides]
 * Not Flipped
 * 4: w 1,h 0        3: w 0, h 0
 *          |--------|
 *          |\       |
 *          |   \    |
 *          |      \ |
 *          |--------|
 * 1: w 1,h 1        2: w 0, h 1
 *
 * ===============================
 * Flipped
 * 2: w 0,h 0        3: w 1, h 0
 *          |--------|
 *          |      / |
 *          |   /    |
 *          |/       |
 *          |--------|
 * 1: w 0,h 1        4: w 1,h 1
 *
 */
export declare const QuadUVs: {
    uvRotations: Record<UVFaceTypes, Record<TextureRotations, (uv: number, ws: number, we: number, hs: number, he: number, flipped: boolean, uvs: number[]) => void>>;
    advancedUVs: Record<UVFaceTypes, (uv: number, data: AdvancedUVs, uvs: number[], flipped: boolean) => void>;
    uvFunctions: Record<DirectionNames, (data: AddQuadUVsData) => void>;
    addUVs(face: DirectionNames, data: AddQuadUVsData): void;
    addAdvancedUVs(direction: DirectionNames, uv: number, uvs: number[], data: AdvancedUVs, flipped?: boolean): void;
    processOverlayUVs(data: VoxelShapeAddData): void;
};
export {};
