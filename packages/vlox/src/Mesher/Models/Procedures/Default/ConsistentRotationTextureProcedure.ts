import { Vec3Array, Vector3Like, Vector4Like } from "@amodx/math";
import type { Quad } from "../../../Geomtry";
import { VoxelModelBuilder } from "Mesher/Models/VoxelModelBuilder";
import {
  TextureProcedure,
  BaseVoxelGeomtryTextureProcedureData,
} from "../TextureProcedure";
import { TextureId } from "Textures";
import { WorldSpaces } from "../../../../World/WorldSpaces";
import { GetYXZOrderArrayIndex } from "../../../../Math/Indexing";
import { VoxelFaces } from "Math";

/**
 * Extend your data type so we can add a seed if we want, and define
 * the rotations we can choose from.
 */
interface VoxelGeometryConsistentRotationTextureProcedureData
  extends BaseVoxelGeomtryTextureProcedureData {
  type: "consistent-rotation";
  texture: TextureId | number;
  /**
   * You can allow (0 | 90 | 180 | 270), or remove 0 if you don’t want an unrotated option
   */
  rotations: (0 | 90 | 180 | 270)[];
  rotationBounds?: Vec3Array;
}

const voxelPos = Vector3Like.Create();
const defaultBounds: Vec3Array = [4, 4, 4];
export class ConsistentRotationTextureProcedure extends TextureProcedure<VoxelGeometryConsistentRotationTextureProcedureData> {
  getTexture(
    builder: VoxelModelBuilder,
    data: VoxelGeometryConsistentRotationTextureProcedureData,
    closestFace: VoxelFaces,
    primitive: Quad
  ): number {
    return data.texture! as number;
  }

  getOverlayTexture(
    builder: VoxelModelBuilder,
    data: VoxelGeometryConsistentRotationTextureProcedureData,
    closestFace: VoxelFaces,
    primitive: Quad,
    ref: Vector4Like
  ): Vector4Like {
    return ref;
  }

  transformUVs(
    builder: VoxelModelBuilder,
    data: VoxelGeometryConsistentRotationTextureProcedureData,
    closestFace: VoxelFaces,
    primitive: Quad
  ): void {
    const bounds = data.rotationBounds ? data.rotationBounds : defaultBounds;
    WorldSpaces.voxel.getPositionFromIndex(builder.voxel._index, voxelPos);
    const x = voxelPos.x - Math.floor(voxelPos.x / bounds[0]) * bounds[0];
    const y = voxelPos.y - Math.floor(voxelPos.y / bounds[1]) * bounds[1];
    const z = voxelPos.z - Math.floor(voxelPos.z / bounds[2]) * bounds[2];

    const rotationIndex =
      GetYXZOrderArrayIndex(x, y, z, ...bounds) % data.rotations.length;

    const rotation = data.rotations[rotationIndex];

    for (const v of primitive.uvs.vertices) {
      const oldX = v.x;
      const oldY = v.y;

      switch (rotation) {
        case 90:
          v.x = 1 - oldY;
          v.y = oldX;
          break;

        case 180:
          v.x = 1 - oldX;
          v.y = 1 - oldY;
          break;

        case 270:
          v.x = oldY;
          v.y = 1 - oldX;
          break;

        case 0:
        default:
          break;
      }
    }
  }
}
