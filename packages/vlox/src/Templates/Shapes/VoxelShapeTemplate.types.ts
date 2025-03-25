import { TypedEventTarget } from "../../Util/TypedEventTarget";
import { PaintVoxelData } from "../../Voxels/Types/PaintVoxelData";
import { IVoxelTemplate, IVoxelTemplateData } from "../VoxelTemplates.types";
export interface IVoxelShapeTemplateEvents {
  updated: null;
}

export type VoxelShapeTemplateFillModes = "full" | "outline" | "shell";
export type VoxelShapeTemplateShapeDirections =
  | "+x"
  | "-x"
  | "+y"
  | "-y"
  | "+z"
  | "-z";

export interface IVoxelShapeTemplate<
  Type extends string,
  Data extends IVoxelShapeTemplateData<Type>,
  Events extends IVoxelShapeTemplateEvents = IVoxelShapeTemplateEvents,
> extends IVoxelTemplate<Type, Data>,
    TypedEventTarget<Events> {
  fillMode: VoxelShapeTemplateFillModes;
  fillVoxel: PaintVoxelData;
  faceVoxel: PaintVoxelData;
  edgeVoxel: PaintVoxelData;
  pointVoxel: PaintVoxelData;
  setVoxels(
    fill: PaintVoxelData,
    face?: PaintVoxelData,
    edge?: PaintVoxelData,
    point?: PaintVoxelData
  ): void;
}

export interface IVoxelshapeTemplateBaseData {
  fillVoxel: PaintVoxelData;
  faceVoxel: PaintVoxelData;
  edgeVoxel: PaintVoxelData;
  pointVoxel: PaintVoxelData;
  fillMode: VoxelShapeTemplateFillModes;
}

export interface IVoxelShapeTemplateData<Type extends string>
  extends IVoxelTemplateData<Type>,
    IVoxelshapeTemplateBaseData {}
