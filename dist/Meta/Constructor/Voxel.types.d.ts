import type { TextureRotations } from "./Geometry/Geometry.types";
export declare type VoxelProcessData = {
    dimension: number;
    exposedFaces: number[];
    faceStates: number[];
    textureRotations: TextureRotations[];
    level: number;
    levelState: number;
    voxelState: number;
    voxelShapeState: number;
    uvTemplate: number[];
    overlayUVTemplate: number[];
    colorTemplate: number[];
    lightTemplate: number[];
    aoTemplate: number[];
    x: number;
    y: number;
    z: number;
};
