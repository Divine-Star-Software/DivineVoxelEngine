import { VoxelShapeAddData } from "Meta/index";
import { DirectionNames } from "Meta/Util.types";
declare type UVCords = {
    start: number;
    end: number;
};
declare type Rotations = 0 | 90 | 180 | 270;
declare type UVFunctionData = {
    uvs: number[];
    uv: number;
    width: UVCords;
    height: UVCords;
    flipped: boolean;
    rotoate: Rotations;
};
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
export declare const UVHelper: {
    uvRotations: Record<"top" | "side" | "bottom", Record<Rotations, (uv: number, ws: number, we: number, hs: number, he: number, flipped: boolean, uvs: number[]) => void>>;
    uvFunctions: Record<DirectionNames, (data: UVFunctionData) => void>;
    addUVs(face: DirectionNames, data: UVFunctionData): void;
    processOverlayUVs(data: VoxelShapeAddData): void;
};
export {};
