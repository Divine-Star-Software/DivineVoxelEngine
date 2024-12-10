import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelMesherDataTool } from "../../../../Mesher/Tools/VoxelMesherDataTool";

export function UpdateBounds(
  tool: VoxelMesherDataTool,
  origin: Vector3Like,
  bounds: [Vec3Array, Vec3Array]
) {
  //min
  if (origin.x + bounds[0][0] < tool.bounds.min[0])
    tool.bounds.min[0] = origin.x + bounds[0][0];
  if (origin.y + bounds[0][1] < tool.bounds.min[1])
    tool.bounds.min[1] = origin.y + bounds[0][1];
  if (origin.z + bounds[0][2] < tool.bounds.min[2])
    tool.bounds.min[2] = origin.z + bounds[0][2];
  //max
  if (origin.x + bounds[1][0] > tool.bounds.max[0])
    tool.bounds.max[0] = origin.x + bounds[1][0];
  if (origin.y + bounds[1][1] > tool.bounds.max[1])
    tool.bounds.max[1] = origin.y + bounds[1][1];
  if (origin.z + bounds[1][2] > tool.bounds.max[2])
    tool.bounds.max[2] = origin.z + bounds[1][2];
}

export function GetBounds(vectors: Vec3Array[]): [Vec3Array, Vec3Array] {
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;

  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  const EPSILON = 0;
  for (let i = 0; i < vectors.length; i++) {
    const [x, y, z] = vectors[i];

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
