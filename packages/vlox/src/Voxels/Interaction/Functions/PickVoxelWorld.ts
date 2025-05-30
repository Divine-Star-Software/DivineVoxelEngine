import { Vec3Array, Vector3Like } from "@amodx/math";
import { Sector, WorldCursor } from "../../../World";
import PickVoxel from "./PickVoxel";
import { Axes } from "@amodx/math/Vectors/Axes";
import { WorldSpaces } from "../../../World/WorldSpaces";
import { WorldRegister } from "../../../World/WorldRegister";
import { SectorCursor } from "../../../World/Cursor/SectorCursor";
/**# PickVoxelWorld
 * Will pick the voxel world and make sure each sector is available before picking it.
 *
 * Useful if the engine is not using shared memory.
 */
export default async function PickVoxelWorld(
  cursor: WorldCursor,
  rayStart: Vec3Array,
  rayDirection: Vec3Array,
  rayLength: number
) {
  let t = 0;
  const d = 8;
  const rayPosition = Vector3Like.Create(...rayStart);
  const rd = Vector3Like.Create(...rayDirection);

  const rayRight = Vector3Like.Cross(rd, Axes.UpReadOnly());
  const rayUp = Vector3Like.Cross(rayRight, rd);
  const cubeSize = 16.0;
  const halfSize = cubeSize / 2.0;
  const rayDirectionScaled = Vector3Like.MultiplyScalar(rd, halfSize);
  const rayRightScaled = Vector3Like.MultiplyScalar(rayRight, halfSize);
  const rayUpScaled = Vector3Like.MultiplyScalar(rayUp, halfSize);
  const finalRayCubeDirection = Vector3Like.Subtract(
    Vector3Like.Subtract(rayDirectionScaled, rayRightScaled),
    rayUpScaled
  );
  const finalMin = Vector3Like.Create();
  const finalMax = Vector3Like.Create();
  const {
    x: sectorSizeX,
    y: sectorSizeY,
    z: sectorSizeZ,
  } = WorldSpaces.sector.bounds;
  const visited = new Set<Sector>();
  const sectorCursor = new SectorCursor();

  while (t < rayLength) {
    rayPosition.x = rayStart[0] + t * rayDirection[0];
    rayPosition.y = rayStart[1] + t * rayDirection[1];
    rayPosition.z = rayStart[2] + t * rayDirection[2];
    t += d;

    const min = WorldSpaces.sector.getPosition(
      ...Vector3Like.ToArray(
        Vector3Like.Subtract(rayPosition, finalRayCubeDirection)
      )
    );
    const max = WorldSpaces.sector.getPosition(
      ...Vector3Like.ToArray(
        Vector3Like.Add(rayPosition, finalRayCubeDirection)
      )
    );

    max.x < min.x ? (finalMin.x = max.x) : (finalMin.x = min.x);
    max.y < min.y ? (finalMin.y = max.y) : (finalMin.y = min.y);
    max.z < min.z ? (finalMin.z = max.z) : (finalMin.z = min.z);

    min.x > max.x ? (finalMax.x = min.x) : (finalMax.x = max.x);
    min.y > max.y ? (finalMax.y = min.y) : (finalMax.y = max.y);
    min.z > max.z ? (finalMax.z = min.z) : (finalMax.z = max.z);

    const { x: sx, y: sy, z: sz } = finalMin;
    const { x: ex, y: ey, z: ez } = finalMax;

    for (let x = sx - sectorSizeX; x < ex + sectorSizeX; x += sectorSizeX) {
      for (let z = sz - sectorSizeZ; z < ez + sectorSizeZ; z += sectorSizeZ) {
        for (let y = sy - sectorSizeY; y < ey + sectorSizeY; y += sectorSizeY) {
          if (!WorldSpaces.world.inBounds(x, y, z)) continue;
          const sector = WorldRegister.sectors.get(cursor.dimension, x, y, z);
          if (!sector) continue;
          if (visited.has(sector)) continue;
          visited.add(sector);
          await sector.waitTillCheckedIn();
          sectorCursor.loadSector(cursor.dimension, x, y, z);
          const result = PickVoxel(
            sectorCursor,
            rayStart,
            rayDirection,
            rayLength
          );

          if (result !== null) return result;
        }
      }
    }
  }

  return null;
}
