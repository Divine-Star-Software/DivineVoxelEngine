import { DirectionNames } from "@divinevoxel/core/Types/Util.types";
import { BuilderDataTool } from "../Tools/BuilderDataTool";
import { VoxelFaces } from "@divinevoxel/core/Math";

export type FaceDataOverride = {
 face: VoxelFaces;
 default: boolean;
 currentVoxel: BuilderDataTool;
 neighborVoxel: BuilderDataTool;
};



export type OverrideTypes = "CullFace" | "AO" | "DarkenFaceUnderneath"| "AOFlipFace" | "FlipFace";
