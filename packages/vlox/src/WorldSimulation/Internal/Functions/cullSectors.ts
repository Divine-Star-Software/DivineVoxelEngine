import { Circle, Square } from "@amodx/math";
import { WorldSimulationDimensions } from "../WorldSimulationDimensions";
import { Generator } from "../Classes/Generator";
import { WorldRegister } from "../../../World/WorldRegister";
import { WorldSpaces } from "../../../World/WorldSpaces";
import { WorldSimulationTools } from "../WorldSimulationTools";
import { WorldLock } from "../../../World/Lock/WorldLock";
import { WorldSimulationTasks } from "../WorldSimulationTasks";

const sectorSquare = new Square();

export function cullSectors(
  generatos: Generator[],
  cullGenerators: Generator[]
) {
  const time = performance.now();
  for (const [, dimension] of WorldSimulationDimensions._dimensions) {
    if (!cullGenerators.length) continue;
    const worldDimension = WorldRegister.dimensions.get(dimension.id)!;

    for (const [, sector] of worldDimension.sectors) {
      const [cx, cy, cz] = sector.position;
      sectorSquare.sideLength = WorldSpaces.sector.bounds.x;
      sectorSquare.center.x = cx + WorldSpaces.sector.bounds.x / 2;
      sectorSquare.center.y = cz + WorldSpaces.sector.bounds.z / 2;

      let inRenderCircle = false;
      let inMaxCircle = false;

      if (WorldLock.isLocked(dimension.id, cx, cy, cz)) continue;
      if (dimension.inProgress.has(cx, cy, cz)) continue;

      for (const gen of cullGenerators) {
        if (gen._dimension != dimension.id) continue;
        if (
          Circle.IsSquareInsideOrTouchingCircle(sectorSquare, gen._renderCircle)
        ) {
          inRenderCircle = true;
        }
        if (
          Circle.IsSquareInsideOrTouchingCircle(sectorSquare, gen._maxCircle)
        ) {
          inMaxCircle = true;
        }
      }
      if (inRenderCircle && inMaxCircle) continue;

      if (!inRenderCircle) {
        WorldSimulationTasks.unbuildTasks.add(dimension.id, cx, cy, cz);
      }

      if (!inMaxCircle) {
        WorldSimulationTasks.unloadTasks.add(dimension.id, cx, cy, cz);
      }
    }
  }
}
