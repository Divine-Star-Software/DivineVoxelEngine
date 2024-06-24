import { Vector3Like } from "@amodx/math";
import { DirectionNames } from "@divinevoxel/core/Types/Util.types";

export type GeometryBuildData = {
 positions: number[];
 normals: number[];
 indices: number[];
 faceData: number[];
 lightColors: number[];
 AOColors: number[];
 colors: number[];
 uvs: number[];
 overlayUVs: number[];
 indicieIndex: number;
 position: Vector3Like;
};
export type UVCords = { start: number; end: number };
export type AddQuadUVsData = {
 uvs: number[];
 uv: number;
 direction : DirectionNames;
 width: UVCords;
 height: UVCords;
 flipped: boolean;
 rotoate: TextureRotations;
};

export type TextureRotations = 0 | 90 | 180 | 270 | 360 | 45 | 315;
export type QuadDimensions = { width: number; height: number };
export type QuadVertexes = 1 | 2 | 3 | 4;
export type QuadTransforms = Record<QuadVertexes, Vector3Like>;
export type TriangleVertexes = 1 | 2 | 3;
export type TriangleTransforms = Record<TriangleVertexes, Vector3Like>;
export type CustomVertexData = [number, number, number, number] | [number];
export type AdvancedUVs = {
 hs1: number;
 hs2: number;
 he1: number;
 he2: number;
 ws1: number;
 ws2: number;
 we1: number;
 we2: number;
};
