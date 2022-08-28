import { VoxelSubstanceType } from "Meta/index";
import { DirectionNames } from "Meta/Util.types";
import { VoxelShapeInterface } from "Meta/Constructor/VoxelShape.types";

export type CullFaceOverride = {
 face: DirectionNames;
 substanceResult: boolean;
 shapeState: number;
 voxelSubstance: VoxelSubstanceType;
 voxelId: string;
 neighborVoxelSubstance: VoxelSubstanceType;
 neighborVoxelId: string;
 neighborVoxelShape: VoxelShapeInterface;
 neighborVoxelShapeState: number;
 x: number;
 y: number;
 z: number;
};

export type AOAddOverride = {
 face: DirectionNames;
 substanceResult: boolean;
 shapeState: number;
 voxelSubstance: VoxelSubstanceType;
 voxelId: string;
 neighborVoxelSubstance: VoxelSubstanceType;
 neighborVoxelId: string;
 neighborVoxelShape: VoxelShapeInterface;
 neighborVoxelShapeState: number;
 x: number;
 y: number;
 z: number;
 nx: number;
 ny: number;
 nz: number;
};

export type AOAFlipOverride = {
 face: DirectionNames;
 shapeState: number;
};
