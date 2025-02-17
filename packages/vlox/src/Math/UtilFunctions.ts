import { Vec3Array } from "@amodx/math";
import { VoxelFaces } from "./VoxelFaces";
// Round each component independently to -1, 0, or 1
const roundToUnit = (n: number) => (Math.abs(n) < 0.5 ? 0 : Math.sign(n));

export function closestUnitNormal(v: Vec3Array): Vec3Array {
  const [x, y, z] = v;

  const bestS: Vec3Array = [roundToUnit(x), roundToUnit(y), roundToUnit(z)];

  // Ensure it's a unit vector by normalizing
  const magnitude = Math.sqrt(bestS[0] ** 2 + bestS[1] ** 2 + bestS[2] ** 2);

  return magnitude > 0
    ? [bestS[0] / magnitude, bestS[1] / magnitude, bestS[2] / magnitude]
    : [0, 0, 0];
}

export function closestVoxelFace(v: Vec3Array): VoxelFaces {
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
