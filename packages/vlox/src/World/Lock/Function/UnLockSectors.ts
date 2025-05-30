import { Vector3Like } from "@amodx/math";
import { BoundsInterface } from "@amodx/math/Geomtry/Bounds/BoundsInterface";
import { WorldSpaces } from "../../WorldSpaces";
import { Sector } from "../../Sector";
import { WorldRegister } from "../../WorldRegister";

export default async function UnLockSectors(
  dimension: number,
  bounds: BoundsInterface
) {
  const { min, max } = bounds.getMinMax();

  const {
    x: sx,
    y: sy,
    z: sz,
  } = WorldSpaces.sector.getPosition(min.x, min.y, min.z, Vector3Like.Create());

  const {
    x: ex,
    y: ey,
    z: ez,
  } = WorldSpaces.sector.getPosition(max.x, max.y, max.z, Vector3Like.Create());

  const {
    x: sectorSizeX,
    y: sectorSizeY,
    z: sectorSizeZ,
  } = WorldSpaces.sector.bounds;

  const waitingToLockSectors: Sector[] = [];
  for (let x = sx - sectorSizeX; x < ex + sectorSizeX; x += sectorSizeX) {
    for (let z = sz - sectorSizeZ; z < ez + sectorSizeZ; z += sectorSizeZ) {
      for (let y = sy - sectorSizeY; y < ey + sectorSizeY; y += sectorSizeY) {
        const sector = WorldRegister.sectors.get(dimension, x, y, z);
        if (!sector) continue;
        if (sector.isCheckedOut()) {
          waitingToLockSectors.push(sector);
          continue;
        }
        sector.setLocked(false);
      }
    }
  }

  await Promise.all(waitingToLockSectors.map((_) => _.waitTillCheckedIn()));

  for (const sector of waitingToLockSectors) {
    sector.setLocked(false);
  }
}
