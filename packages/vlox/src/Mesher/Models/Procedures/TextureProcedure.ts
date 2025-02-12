import { Vector4Like } from "@amodx/math";
import { Quad, Triangle } from "../../Geomtry";
import { VoxelModelBuilder } from "../VoxelModelBuilder";
import { VoxelFaces } from "../../../Math";
import { TextureId } from "../../../Textures";
export interface BaseVoxelGeomtryTextureProcedureData {
  type: string;
  texture?: TextureId | number;
  textureRecrod?: Record<string, TextureId | number>;
  [key: string]: any;
}

export abstract class TextureProcedure<Data = any> {
  abstract getTexture(
    builder: VoxelModelBuilder,
    data: Data,
    closestFace: VoxelFaces,
    primitive: Quad | Triangle
  ): number;
  abstract getOverlayTexture(
    builder: VoxelModelBuilder,
    data: Data,
    closestFace: VoxelFaces,
    primitive: Quad | Triangle,
    ref: Vector4Like
  ): Vector4Like;
  abstract transformUVs(
    builder: VoxelModelBuilder,
    data: Data,
    closestFace: VoxelFaces,
    primitive: Quad | Triangle
  ): void;
}
