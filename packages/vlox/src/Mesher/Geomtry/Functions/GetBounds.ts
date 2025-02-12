import { Vec3Array, Vector3Like } from "@amodx/math";

export function GetBounds(...vectors: Vector3Like[]): [Vec3Array, Vec3Array] {
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;

  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  const EPSILON = 0;
  for (let i = 0; i < vectors.length; i++) {
    const {x, y, z} = vectors[i];

    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (z < minZ) minZ = z;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (z > maxZ) maxZ = z;
  }

  /*   if (maxX - minX < EPSILON) {
    minX -= EPSILON / 2;
    maxX += Number.EPSILON / 2;
  }
  if (maxY - minY < EPSILON) {
    maxY -= EPSILON / 2;
    minY += Number.EPSILON / 2;
  }
  if (maxZ - minZ < EPSILON) {
    maxZ -= EPSILON / 2;
    minZ += EPSILON / 2;
  } */

  return [
    [minX, minY, minZ],
    [maxX, maxY, maxZ],
  ];
}