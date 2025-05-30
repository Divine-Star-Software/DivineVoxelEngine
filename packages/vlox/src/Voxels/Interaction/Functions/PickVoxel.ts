import { Vec3Array, Vec3ArrayLike, Vector3Like } from "@amodx/math";
import { DataCursorInterface } from "../../Cursor/DataCursor.interface";
import { VoxelPickResult } from "../VoxelPickResult";
import {
  closestUnitNormal,
  closestVoxelFace,
} from "../../../Math/UtilFunctions";

const step = (val: number) => (val > 0 ? 1 : val < 0 ? -1 : 0);
const calculateNormal = (
  intersectPoint: Vec3Array,
  voxelMin: Vec3Array,
  voxelMax: Vec3Array
): Vec3Array => {
  const epsilon = 1e-4;
  let normal: Vec3Array = [0, 0, 0];

  if (Math.abs(intersectPoint[0] - voxelMin[0]) < epsilon) normal = [1, 0, 0];
  else if (Math.abs(intersectPoint[0] - voxelMax[0]) < epsilon)
    normal = [-1, 0, 0];
  else if (Math.abs(intersectPoint[1] - voxelMin[1]) < epsilon)
    normal = [0, 1, 0];
  else if (Math.abs(intersectPoint[1] - voxelMax[1]) < epsilon)
    normal = [0, -1, 0];
  else if (Math.abs(intersectPoint[2] - voxelMin[2]) < epsilon)
    normal = [0, 0, 1];
  else if (Math.abs(intersectPoint[2] - voxelMax[2]) < epsilon)
    normal = [0, 0, -1];

  return normal;
};

/**
 * # PickVoxel
 * Used to a pick a voxel from any data cursor interface.
 * The function assumes the data that is loaded into the cursor is available
 */
export default function PickVoxel(
  cursor: DataCursorInterface,
  rayStart: Vec3Array,
  rayDirection: Vec3Array,
  rayLength: number
) {
  const invDir: Vec3Array = [
    1 / rayDirection[0],
    1 / rayDirection[1],
    1 / rayDirection[2],
  ];
  const voxelSize = 1.0;
  const tDelta = [
    Math.abs(invDir[0]) * voxelSize,
    Math.abs(invDir[1]) * voxelSize,
    Math.abs(invDir[2]) * voxelSize,
  ];
  const tMax: Vec3Array = [
    (Math.floor(rayStart[0]) - rayStart[0] + (rayDirection[0] > 0 ? 1 : 0)) *
      invDir[0],
    (Math.floor(rayStart[1]) - rayStart[1] + (rayDirection[1] > 0 ? 1 : 0)) *
      invDir[1],
    (Math.floor(rayStart[2]) - rayStart[2] + (rayDirection[2] > 0 ? 1 : 0)) *
      invDir[2],
  ];
  const pos: Vec3Array = [
    Math.floor(rayStart[0]),
    Math.floor(rayStart[1]),
    Math.floor(rayStart[2]),
  ];
  const stepDir: Vec3Array = [
    step(rayDirection[0]),
    step(rayDirection[1]),
    step(rayDirection[2]),
  ];
  for (let i = 0; i < rayLength; i++) {
    const [tx, ty, tz] = tMax;
    let axis = 0;

    if (tx < ty) {
      if (tx < tz) axis = 0;
      else axis = 2;
    } else {
      if (ty < tz) axis = 1;
      else axis = 2;
    }

    pos[axis] += stepDir[axis];
    tMax[axis] += tDelta[axis];
    if (!cursor.inBounds(...pos)) continue;
    const voxel = cursor.getVoxel(...pos);
    if (voxel && voxel.isRenderable()) {
      const normal = calculateNormal(
        [
          rayStart[0] + rayDirection[0] * tMax[axis],
          rayStart[1] + rayDirection[1] * tMax[axis],
          rayStart[2] + rayDirection[2] * tMax[axis],
        ],
        [pos[0] * voxelSize, pos[1] * voxelSize, pos[2] * voxelSize],
        [
          pos[0] * voxelSize + voxelSize,
          pos[1] * voxelSize + voxelSize,
          pos[2] * voxelSize + voxelSize,
        ]
      );

      const rd = Vector3Like.Create(...rayDirection);
      const urd = Vector3Like.FromArray(closestUnitNormal(rd));
      const n = Vector3Like.Create(...normal);
      const un = Vector3Like.FromArray(closestUnitNormal(n));
      return new VoxelPickResult(
        Vector3Like.Create(...rayStart),
        rd,
        rayLength,
        voxel.getRaw(),
        Vector3Like.Create(...pos),
        n,
        tMax[axis],
        Vector3Like.Create(...Vec3ArrayLike.Add(pos, normal)),
        Vector3Like.FromArray(closestUnitNormal(rd)),
        closestVoxelFace(urd),
        Vector3Like.FromArray(closestUnitNormal(n)),
        closestVoxelFace(un),
        0
      );
    }
  }

  return null;
}
