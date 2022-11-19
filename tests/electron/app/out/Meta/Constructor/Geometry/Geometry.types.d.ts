import { Vector3 } from "Meta/Util.types";
export declare type GeometryBuildData = {
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
    position: Vector3;
};
export declare type UVCords = {
    start: number;
    end: number;
};
export declare type AddQuadUVsData = {
    uvs: number[];
    uv: number;
    width: UVCords;
    height: UVCords;
    flipped: boolean;
    rotoate: TextureRotations;
};
export declare type TextureRotations = 0 | 90 | 180 | 270 | 360 | 45 | 315;
export declare type QuadDimensions = {
    width: number;
    height: number;
};
export declare type QuadVertexes = 1 | 2 | 3 | 4;
export declare type QuadTransforms = Record<QuadVertexes, Vector3>;
export declare type TriangleVertexes = 1 | 2 | 3;
export declare type TriangleTransforms = Record<TriangleVertexes, Vector3>;
export declare type AdvancedUVs = {
    hs1: number;
    hs2: number;
    he1: number;
    he2: number;
    ws1: number;
    ws2: number;
    we1: number;
    we2: number;
};
