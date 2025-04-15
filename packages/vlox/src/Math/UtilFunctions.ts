import { Vec3Array, Vec3ArrayLike, Vector3Like } from "@amodx/math";
import { VoxelFaces } from "./VoxelFaces";
const unitNormals: Vec3Array[] = [
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
  [1, 0, 0],
  [-1, 0, 0],
];
const tempPosition: Vec3Array = [0, 0, 0];
const tempNormal: Vec3Array = [0, 0, 0];

export function closestUnitNormal(v: Vec3Array | Vector3Like): Vec3Array {
  const [x, y, z] = Vector3Like.Deconstruct(v);
  tempPosition[0] = x;
  tempPosition[1] = y;
  tempPosition[2] = z;

  let closestIndex = -1;
  let closestDistance = Infinity;
  for (let i = 0; i < unitNormals.length; i++) {
    Vec3ArrayLike.SubtractToRef(tempPosition, unitNormals[i], tempNormal);
    const distance = Vec3ArrayLike.Length(tempNormal);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }
  if (closestIndex == -1) return [0, 0, 0];

  return [
    unitNormals[closestIndex][0],
    unitNormals[closestIndex][1],
    unitNormals[closestIndex][2],
  ];
}

export function closestVoxelFace(v: Vec3Array | Vector3Like): VoxelFaces {
  const unitNormal = closestUnitNormal(v);
  let closestFace = VoxelFaces.Up;
  if (unitNormal[0] == 1) closestFace = VoxelFaces.East;
  if (unitNormal[0] == -1) closestFace = VoxelFaces.West;
  if (unitNormal[1] == 1) closestFace = VoxelFaces.Up;
  if (unitNormal[1] == -1) closestFace = VoxelFaces.Down;
  if (unitNormal[2] == 1) closestFace = VoxelFaces.North;
  if (unitNormal[2] == -1) closestFace = VoxelFaces.South;
  return closestFace;
}
