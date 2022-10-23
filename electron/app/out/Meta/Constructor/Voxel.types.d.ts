import { Rotations } from "./Mesher.types";
export declare type VoxelProcessData = {
    dimension: number;
    exposedFaces: number[];
    faceStates: number[];
    textureRotations: Rotations[];
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
