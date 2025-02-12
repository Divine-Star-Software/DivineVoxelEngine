import { Vector4Like } from "@amodx/math";
import { Quad } from "../../Geomtry";
import { VoxelModelBuilder } from "../VoxelModelBuilder";

export abstract class TextureProcedure<Data = any> {
  abstract getTexture(builder: VoxelModelBuilder, data: Data): number;
  abstract getOverlayTexture(
    builder: VoxelModelBuilder,
    data: Data,
    ref: Vector4Like
  ): Vector4Like;
  abstract transformUVs(
    builder: VoxelModelBuilder,
    data: Data,
    primitive: Quad
  ): void;
}
