import { DirectionNames } from "Meta/Util.types";
import { BuilderDataTool } from "../Tools/BuilderDataTool";
export declare type FaceDataOverride = {
    face: DirectionNames;
    default: boolean;
    currentVoxel: BuilderDataTool;
    neighborVoxel: BuilderDataTool;
};
export declare type OverrideTypes = "CullFace" | "AO" | "DarkenFaceUnderneath" | "AOFlipFace" | "FlipFace";
