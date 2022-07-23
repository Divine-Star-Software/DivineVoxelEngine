import { VoxelData } from "Meta/index";
import { DirectionNames } from "Meta/Util.types";
import { VoxelShapeInterface } from "Meta/Constructor/VoxelShape.types";

export type CullFaceOverride = {
 face: DirectionNames;
 substanceResult: boolean;
 shapeState: number;
 voxel: VoxelData;
 neighborVoxel: VoxelData;
 neighborVoxelShape: VoxelShapeInterface;
 neighborVoxelShapeState: number;
 x: number;
 y: number;
 z: number;
};

export type AOAddOVerRide = {
 face: DirectionNames;
 substanceResult: boolean;
 shapeState: number;
 voxel: VoxelData;
 neighborVoxel: VoxelData;
 neighborVoxelShape: VoxelShapeInterface;
 neighborVoxelShapeState: number;
 x: number;
 y: number;
 z: number;
 nx: number;
 ny: number;
 nz: number;
};
