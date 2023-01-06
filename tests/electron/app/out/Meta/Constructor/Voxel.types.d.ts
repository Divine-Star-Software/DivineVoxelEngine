import type { TextureRotations } from "./Geometry/Geometry.types";
import type { Builder as DVEBuilswe } from "../../Constructor/Builder/Builder";
import type { FaceDataOverride } from "./OverRide.types";
import type { VoxelTemplater } from "../../Constructor/Builder/Tools/VoxelTemplater";
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
export declare type VoxelConstructorThreadHooks = "texturesRegistered" | string;
export declare type VoxelConstructor = {
    id: string;
    hooks: Record<VoxelConstructorThreadHooks, (DVEB: typeof DVEBuilswe) => any>;
    cullFace?: {
        (data: FaceDataOverride): boolean;
    };
    aoOverRide?: {
        (data: FaceDataOverride): boolean;
    };
    process(templater: typeof VoxelTemplater): void;
};
