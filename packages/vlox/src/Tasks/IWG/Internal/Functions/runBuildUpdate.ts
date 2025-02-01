import { Generator } from "../Classes/Generator";
import { Circle, Square } from "@amodx/math";
import { WorldSpaces } from "../../../../World/WorldSpaces";
import { SectorState } from "../Classes/SectorState";
import { WorldRegister } from "../../../../World/WorldRegister";
import { getSectorState } from "./getSectorState";
import { IWGTasks } from "../IWGTasks";
import { IWGDimensions } from "../IWGDimensions";
import { IWGTools } from "../IWGTools";
const stateCursor = new SectorState();
const sectorSquare = new Square();
export function runBuildUpdate(generators: Generator[]) {
  for (const generator of generators) {
    if (!generator._building) continue;
    const segment = IWGDimensions._dimensions.get(generator._dimension);
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
        if (segment.rendered.has(cx, cy, cz)) continue;

        IWGTasks.buildTasks.add(generator._dimension, cx, cy, cz);
      }
    }
  }

  for (const [, dimension] of IWGDimensions._dimensions) {
    dimension.vistedMap.clear();
  }
}
