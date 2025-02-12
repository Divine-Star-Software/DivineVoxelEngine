import { BaseVoxelGeomtryTextureProcedureData } from "../Procedures/TextureProcedure"
import { VoxelModelBuilder } from "../VoxelModelBuilder";
import { TextureProcedureRegister } from "../Procedures/TextureProcedureRegister";
import { Quad } from "../../Geomtry";
import { VoxelFaces } from "../../../Math";
import { Triangle } from "../../Geomtry";

export function GetTexture(
  builder: VoxelModelBuilder,
  data: number | BaseVoxelGeomtryTextureProcedureData,
  closestFace: VoxelFaces,
  primitive: Quad|Triangle
) {
  if (typeof data == "number") {
    builder.vars.textureIndex = data as number;
  } else {
    const procedure = TextureProcedureRegister.get(data.type);
    builder.vars.textureIndex = procedure.getTexture(
      builder,
      data,
      closestFace,
      primitive
    );
    procedure.transformUVs(builder, data, closestFace, primitive);
    procedure.getOverlayTexture(
      builder,
      data,
      closestFace,
      primitive,
      builder.vars.overlayTextures
    );
  }
}
