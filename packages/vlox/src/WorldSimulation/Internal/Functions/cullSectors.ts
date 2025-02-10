import { Circle, Square } from "@amodx/math";
import { WorldSimulationDimensions } from "../WorldSimulationDimensions";
import { Generator } from "../Classes/Generator";
import { WorldRegister } from "../../../World/WorldRegister";
import { WorldSpaces } from "../../../World/WorldSpaces";
import { WorldSimulationTools } from "../WorldSimulationTools";
import { WorldLock } from "../../../World/Lock/WorldLock";

const sectorSquare = new Square();

export function cullSectors(
  generatos: Generator[],
  cullGenerators: Generator[]
) {
  const time = performance.now();
  for (const [, dimension] of WorldSimulationDimensions._dimensions) {
    for (let i = dimension.unRenderQueue.nodes.length - 1; i > -1; i--) {
      const node = dimension.unRenderQueue.nodes[i];
      const [cx, cy, cz] = node.position;
      sectorSquare.center.x =
        node.position[0] + WorldSpaces.sector.bounds.x / 2;
      sectorSquare.center.y =
        node.position[2] + WorldSpaces.sector.bounds.z / 2;

      let inRenderCircle = false;
      for (const gen of generatos) {
        if (gen._dimension != dimension.id) continue;
        if (
          Circle.IsSquareInsideOrTouchingCircle(sectorSquare, gen._renderCircle)
        ) {
          inRenderCircle = true;
        }
      }
      if (inRenderCircle) {
        dimension.unRenderQueue.removeIndex(i);
        continue;
      }
      const delta = time - node.time;
      if (delta > 5_000) {
        dimension.rendered.remove(cx, cy, cz);
        dimension.inProgress.add(cx, cy, cz);
        WorldSimulationTools.parent
          .runTaskAsync("remove-sector", [dimension.id, cx, cy, cz])
          .then(() => {
            dimension.inProgress.remove(cx, cy, cz);
          });
        dimension.unRenderQueue.removeIndex(i);
      }
    }

    for (let i = dimension.unLoadQueue.nodes.length - 1; i > -1; i--) {
      const node = dimension.unLoadQueue.nodes[i];
      const [cx, cy, cz] = node.position;
      sectorSquare.center.x =
        node.position[0] + WorldSpaces.sector.bounds.x / 2;
      sectorSquare.center.y =
        node.position[2] + WorldSpaces.sector.bounds.z / 2;

      let inMaxCircle = false;
      for (const gen of generatos) {
        if (gen._dimension != dimension.id) continue;
        if (
          Circle.IsSquareInsideOrTouchingCircle(sectorSquare, gen._maxCircle)
        ) {
          inMaxCircle = true;
        }
      }
      if (inMaxCircle) {
        dimension.unLoadQueue.removeIndex(i);
        continue;
      }
      const delta = time - node.time;
      if (delta > 5_000) {
        dimension.unLoadQueue.removeIndex(i);
        if (WorldSimulationTools.worldStorage) {
          dimension.inProgress.add(cx, cy, cz);
          WorldSimulationTools.worldStorage
            .unloadSector([dimension.id, cx, cy, cz])
            .finally(() => {
              dimension.inProgress.remove(cx, cy, cz);
            });
        } else {
          WorldRegister.sectors.remove(dimension.id, cx, cy, cz);
        }
      }
    }

    if (!cullGenerators.length) continue;
    const worldDimension = WorldRegister.dimensions.get(dimension.id)!;

    for (const [, sector] of worldDimension.sectors) {
      const [cx, cy, cz] = sector.position;
      sectorSquare.sideLength = WorldSpaces.sector.bounds.x;
      sectorSquare.center.x = cx + WorldSpaces.sector.bounds.x / 2;
      sectorSquare.center.y = cz + WorldSpaces.sector.bounds.z / 2;

      let inRenderCircle = false;
      let inMaxCircle = false;

      if (WorldLock.isLocked([dimension.id, cx, cy, cz])) continue;
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

      if (!inRenderCircle && !dimension.unRenderQueue.inMap(sector)) {
        dimension.unRenderQueue.addSector(sector);
      }

      if (!inMaxCircle && !dimension.unLoadQueue.inMap(sector)) {
        dimension.unLoadQueue.addSector(sector);
      }
    }
  }
}
