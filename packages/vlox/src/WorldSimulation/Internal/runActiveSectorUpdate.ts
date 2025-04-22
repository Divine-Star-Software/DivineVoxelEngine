import { WorldSpaces } from "../../World/WorldSpaces";
import { SimulationSector } from "../Dimensions/SimulationSector";
import { WorldSimulationDimensions } from "./WorldSimulationDimensions";
import { Circle, Square, Vector3Like } from "@amodx/math";
import { MooreNeighborhood2D } from "../../Math/CardinalNeighbors";
import { WorldSimulationTasks } from "./WorldSimulationTasks";

const sectorSquare = new Square();
const tempPosition = Vector3Like.Create();
const unrender = new Set<SimulationSector>();
const render = new Set<SimulationSector>();
const removedSectors: SimulationSector[] = [];
const queue: number[] = [];
const vistedMap = new Set<string>();
export function runActiveSectorUpdate() {
  sectorSquare.sideLength = WorldSpaces.sector.bounds.x;
  for (const [, dimension] of WorldSimulationDimensions._dimensions) {
    for (let i = dimension.activeSectors._sectors.length - 1; i > -1; i--) {
      const sector = dimension.activeSectors._sectors[i];
      sector.generating = false;
      sector.renderering = false;
      sector.ticking = false;

      const [cx, cy, cz] = sector.position;
      sectorSquare.center.x = cx + WorldSpaces.sector.bounds.x / 2;
      sectorSquare.center.y = cz + WorldSpaces.sector.bounds.z / 2;
      for (let g = 0; g < dimension.generators.length; g++) {
        const generator = dimension.generators[g];
        generator._maxCircle.center.x =
          generator._sectorPosition.x + WorldSpaces.sector.bounds.x / 2;
        generator._maxCircle.center.y =
          generator._sectorPosition.z + WorldSpaces.sector.bounds.z / 2;
        if (
          !Circle.IsSquareInsideOrTouchingCircle(
            sectorSquare,
            generator._maxCircle
          )
        ) {
          removedSectors.push(sector);
          dimension.activeSectors._map.delete(
            WorldSpaces.hash.hashXYZ(cx, cy, cz)
          );
          dimension.activeSectors._sectors.splice(i, 1);
        }
      }
    }

    for (let g = 0; g < dimension.generators.length; g++) {
      const generator = dimension.generators[g];

      const sectorPosition = generator._sectorPosition;
      queue.push(sectorPosition.x, sectorPosition.y, sectorPosition.z);
      generator._renderCircle.center.x =
        sectorPosition.x + WorldSpaces.sector.bounds.x / 2;
      generator._renderCircle.center.y =
        sectorPosition.z + WorldSpaces.sector.bounds.z / 2;
      generator._genCircle.center.x =
        sectorPosition.x + WorldSpaces.sector.bounds.x / 2;
      generator._genCircle.center.y =
        sectorPosition.z + WorldSpaces.sector.bounds.z / 2;
      generator._maxCircle.center.x =
        sectorPosition.x + WorldSpaces.sector.bounds.x / 2;
      generator._maxCircle.center.y =
        sectorPosition.z + WorldSpaces.sector.bounds.z / 2;

      while (queue.length) {
        const cx = queue.shift()!;
        const cy = queue.shift()!;
        const cz = queue.shift()!;
        const key = WorldSpaces.hash.hashXYZ(cx, cy, cz);

        if (vistedMap.has(key)) continue;
        vistedMap.add(key);

        sectorSquare.sideLength = WorldSpaces.sector.bounds.x;
        sectorSquare.center.x = cx + WorldSpaces.sector.bounds.x / 2;
        sectorSquare.center.y = cz + WorldSpaces.sector.bounds.z / 2;

        if (
          !Circle.IsSquareInsideOrTouchingCircle(
            sectorSquare,
            generator._maxCircle
          )
        )
          continue;

        if (!dimension.activeSectors._map.has(key)) {
          dimension.activeSectors.add(cx, cy, cz);
        }

        const sector = dimension.activeSectors._map.get(key)!;

        if (
          Circle.IsSquareInsideOrTouchingCircle(
            sectorSquare,
            generator._genCircle
          )
        ) {
          sector.generating = true;
        }

        if (
          Circle.IsSquareInsideOrTouchingCircle(
            sectorSquare,
            generator._renderCircle
          )
        ) {
          render.add(sector);
          unrender.delete(sector);
          sector.renderering = true;
        } else {
          if (!render.has(sector) && sector._rendered) {
            unrender.add(sector);
          }
        }

        if (
          Circle.IsSquareInsideOrTouchingCircle(
            sectorSquare,
            generator._tickCircle
          )
        ) {
          sector.ticking = true;
        }

        for (let i = 0; i < MooreNeighborhood2D.length; i++) {
          const sectorPOS = WorldSpaces.sector.getPosition(
            cx + MooreNeighborhood2D[i][0] * WorldSpaces.sector.bounds.x,
            cy,
            cz + MooreNeighborhood2D[i][1] * WorldSpaces.sector.bounds.z,
            tempPosition
          );
          queue.push(sectorPOS.x, sectorPOS.y, sectorPOS.z);
        }
      }

      vistedMap.clear();
    }

    for (const sector of unrender) {
      WorldSimulationTasks.unbuildTasks.add(dimension.id, ...sector.position);
    }
    for (const removed of removedSectors) {
      WorldSimulationTasks.unloadTasks.add(dimension.id, ...removed.position);
    }
    removedSectors.length = 0;
    render.clear();
    unrender.clear();

    for (let i = 0; i < dimension.activeSectors._sectors.length; i++) {
      dimension.activeSectors._sectors[i].updateNeighbors();
    }
  }
}
