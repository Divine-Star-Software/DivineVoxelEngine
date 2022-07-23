import { Rotations } from "./Mesher.types";

export type VoxelProcessData = {
 exposedFaces: number[];
 faceStates: number[];
 textureRotations: Rotations[];
 level: number;
 levelState: number;
 voxelState: string;
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
