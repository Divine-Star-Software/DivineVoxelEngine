import { Generator } from "../Classes/Generator";
import { Circle, Square } from "@amodx/math";
import { WorldSpaces } from "../../../World/WorldSpaces";
import { SectorState } from "../Classes/SectorState";
import { WorldRegister } from "../../../World/WorldRegister";
import { getSectorState } from "./getSectorState";
import { WorldSimulationDimensions } from "../WorldSimulationDimensions";
import { DimensionSegment } from "../Classes/DimensionSegment";
import { Sector } from "../../../World";
const stateCursor = new SectorState();
const sectorSquare = new Square();

function buildCheck(
  dimenion: DimensionSegment,
  sector: Sector,
  generator: Generator,
  x: number,
  y: number,
  z: number
) {
  let rendered = true;
  if (!dimenion.rendered.has(x, y, z)) {
    rendered = false;
    dimenion.rendered.add(x, y, z);
  }

  for (const section of sector.getRenerableSections()) {
    if (rendered && (section.isInProgress() || !section.isDisplayDirty()))
      continue;

    section.setInProgress(true);
    generator.buildQueue.add(dimenion.id, ...section.position);
  }
}

function logicCheck(
  dimenion: DimensionSegment,
  sector: Sector,
  generator: Generator,
  x: number,
  y: number,
  z: number
) {
  if (!sector.isLogicDirty()) return false;

  for (const section of sector.getLogicDirtySections()) {
    if (section.isLogicUpdateInProgress() || !section.isLogicDirty()) continue;
    section.setLogicUpdateInProgress(true);

    generator.logicQueue.add(dimenion.id, ...section.position);
  }
}

export function runTickUpdate(generators: Generator[]) {
  for (const generator of generators) {
    if (!generator._building) continue;
    const segment = WorldSimulationDimensions._dimensions.get(
      generator._dimension
    );
    if (!segment)
      throw new Error(
        `No segment for dimensions ${generator._dimension} found.`
      );

    const queue = segment.queue;
    const visitedMap = segment.vistedMap;

    const sectorPosition = generator._sectorPosition;
    queue.push(sectorPosition.x, sectorPosition.y, sectorPosition.z);

    generator._renderCircle.center.x = sectorPosition.x;
    generator._renderCircle.center.y = sectorPosition.z;

    while (queue.length) {
      const cx = queue.shift()!;
      const cy = queue.shift()!;
      const cz = queue.shift()!;
      if (visitedMap.has(cx, cy, cz)) continue;
      visitedMap.add(cx, cy, cz);
      sectorSquare.sideLength = WorldSpaces.sector.bounds.x;
      sectorSquare.center.x = cx + WorldSpaces.sector.bounds.x / 2;
      sectorSquare.center.y = cz + WorldSpaces.sector.bounds.z / 2;

      if (
        !Circle.IsSquareInsideOrTouchingCircle(
          sectorSquare,
          generator._renderCircle
        )
      )
        continue;

      const sector = WorldRegister.sectors.get(
        generator._dimension,
        cx,
        cy,
        cz
      );

      if (!sector) continue;

      const state = getSectorState(sector, stateCursor, segment);

      if (
        state.nWorldGenAllDone &&
        state.nSunAllDone &&
        state.nPropagtionAllDone
      ) {
        if (!segment.rendered.has(cx, cy, cz)) {
          buildCheck(segment, sector, generator, cx, cy, cz);
          continue;
        }
        if (sector.anySectionLogicDirty()) {
          logicCheck(segment, sector, generator, cx, cy, cz);
        }
        if (sector.anySectionDisplayDirty()) {
          buildCheck(segment, sector, generator, cx, cy, cz);
        }
      }
    }
  }

  for (const [, dimension] of WorldSimulationDimensions._dimensions) {
    dimension.vistedMap.clear();
  }
}
