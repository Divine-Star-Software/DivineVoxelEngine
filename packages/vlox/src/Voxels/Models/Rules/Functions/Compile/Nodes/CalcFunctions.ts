import { VoxelFaces } from "../../../../../../Math";
import { Quad } from "../../../../../../Mesher/Geomtry";
import {
  QuadUVData,
  QuadVerticiesArray,
  VoxelGeometryTransform,
} from "../../../../../../Mesher/Geomtry/Geometry.types";
import {
  Matrix2x2Like,
  Vec2ArrayLike,
  Vec4Array,
  AMath,
  Mat2Array,
} from "@amodx/math";
function getInterpolationWeights(
  x: number,
  y: number,
  flip = false
): Vec4Array {
  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));

  let w1 = (1 - x) * (1 - y); // Weight for v1 = (0, 0)
  let w2 = x * (1 - y); // Weight for v2 = (1, 0)
  let w3 = x * y; // Weight for v3 = (1, 1)
  let w4 = (1 - x) * y; // Weight for v4 = (0, 1)

  return flip ? [w4, w3, w2, w1] : [w3, w4, w1, w2];
}

export function getVertexWeights(
  face: VoxelFaces,
  x: number,
  y: number,
  z: number
): Vec4Array {
  let flip = false;
  let u: number, v: number;
  switch (face) {
    case VoxelFaces.Up:
      u = x;
      v = z;
      break;
    case VoxelFaces.Down:
      u = x;
      v = z;
      flip = true;
      break;
    case VoxelFaces.North:
      u = x;
      v = y;
      flip = true;
      break;
    case VoxelFaces.South:
      u = x;
      v = y;
      break;
    case VoxelFaces.East:
      u = z;
      v = y;
      break;
    case VoxelFaces.West:
      u = z;
      v = y;
      flip = true;
      break;
  }

  return getInterpolationWeights(u, v, flip);
}

export type QuadVertexWeights = [Vec4Array, Vec4Array, Vec4Array, Vec4Array];

export const getQuadWeights = (
  quad: Quad,
  direction: VoxelFaces
): QuadVertexWeights => {
  const returnArray: QuadVertexWeights = [] as any;
  for (const vertex of QuadVerticiesArray) {
    const { x, y, z } = quad.positions.vertices[vertex];
    returnArray[vertex] = getVertexWeights(direction, x, y, z);
  }

  return returnArray;
};

const rotationMatrix = new Map<number, Mat2Array>();

export const mapQuadUvs = (
  uvs: Vec4Array,
  rotation: number = 0,
  transform: VoxelGeometryTransform
): QuadUVData => {
  if (transform.lockUVs == true) {
    let rotM = rotationMatrix.get(rotation);

    if (!rotM) {
      rotM = Matrix2x2Like.Rotation(AMath.DegreesToRadians(rotation));
      rotationMatrix.set(rotation, rotM);
    }

    return [
      Vec2ArrayLike.ApplyMatrix(rotM, [uvs[2], uvs[3]]),
      Vec2ArrayLike.ApplyMatrix(rotM, [uvs[0], uvs[3]]),
      Vec2ArrayLike.ApplyMatrix(rotM, [uvs[0], uvs[1]]),
      Vec2ArrayLike.ApplyMatrix(rotM, [uvs[2], uvs[1]]),
    ];
  }

  let u0 = uvs[0];
  let v0 = uvs[1];
  let u1 = uvs[2];
  let v1 = uvs[3];

  if (transform.flip) {
    if (transform.flip[0] === 1) {
      [u0, u1] = [u1, u0];
    }
    if (transform.flip[1] === 1) {
      [v0, v1] = [v1, v0];
    }
  }

  let quadUVs: QuadUVData = [
    [u1, v1],
    [u0, v1],
    [u0, v0],
    [u1, v0],
  ];

  if (rotation !== 0) {
    let rotM = rotationMatrix.get(rotation);
    if (!rotM) {
      rotM = Matrix2x2Like.Rotation(AMath.DegreesToRadians(rotation));
      rotationMatrix.set(rotation, rotM);
    }

    const centerU = (u0 + u1) / 2;
    const centerV = (v0 + v1) / 2;
    quadUVs = quadUVs.map(([u, v]) => {
      let x = u - centerU;
      let y = v - centerV;
      [x, y] = Vec2ArrayLike.ApplyMatrix(rotM, [x, y]);
      x += centerU;
      y += centerV;
      return [x, y];
    }) as QuadUVData;
  }

  return quadUVs;
};
