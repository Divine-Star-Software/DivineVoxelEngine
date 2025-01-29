import { Generator } from "../Classes/Generator";
import { Circle, Square } from "@amodx/math";
import { getSectorState } from "./getSectorState";
import { SectorState } from "../Classes/SectorState";
import { WorldRegister } from "../../../../World/WorldRegister";
import { Sector } from "../../../../World";
import { SectorStateStructIds } from "../../../../World/Sector/SectorStructIds";
import { WorldLock } from "../../../../World/Lock/WorldLock";
import { IWGTasks } from "../IWGTasks";
import { IWGDimensions } from "../IWGDimensions";
import { WorldSpaces } from "../../../../World/WorldSpaces";
const stateCursor = new SectorState();
const sectorSquare = new Square();
export function runWorldUpdate(generators: Generator[]) {
  for (const generator of generators) {
    const segment = IWGDimensions._dimensions.get(generator._dimension);
    if (!segment)
      throw new Error(
        `No segment for dimensions ${generator._dimension} found.`
      );

    const queue = segment.queue;
    const vistedMap = segment.vistedMap;

    const sectorPosition = generator._sectorPosition;
    queue.push(sectorPosition.x, sectorPosition.y, sectorPosition.z);

    generator._genCircle.center.x = sectorPosition.x;
    generator._genCircle.center.y = sectorPosition.z;

    while (queue.length) {
      const cx = queue.shift()!;
      const cy = queue.shift()!;
      const cz = queue.shift()!;

      if (
        WorldLock.isLocked([generator._dimension, cx, cy, cz]) ||
        segment.inProgress.has(cx, cy, cz) ||
        vistedMap.has(cx, cy, cz)
      )
        continue;

      vistedMap.add(cx, cy, cz);

      sectorSquare.sideLength = WorldSpaces.sector.bounds.x;
      sectorSquare.center.x = cx + WorldSpaces.sector.bounds.x / 2;
      sectorSquare.center.y = cz + WorldSpaces.sector.bounds.z / 2;

      if (
        !Circle.IsSquareInsideOrTouchingCircle(
          sectorSquare,
          generator._genCircle
        )
      )
        continue;

      WorldRegister.setDimension(generator._dimension);
      const sector = WorldRegister.sectors.get(cx, cy, cz);
      if (!sector) {
        IWGTasks.worldLoadTasks.add(generator._dimension, cx, cy, cz);
        continue;
      }

      const state = getSectorState(sector, stateCursor, segment);

      Sector.StateStruct.setBuffer(sector.buffer);

      if (
        state.allLoaded &&
        !Sector.StateStruct.getProperty(SectorStateStructIds.isWorldGenDone)
      ) {
        IWGTasks.worldGenTasks.add(generator._dimension, cx, cy, cz);
        continue;
      }

      if (
        state.nWorldGenAllDone &&
        !Sector.StateStruct.getProperty(SectorStateStructIds.isWorldDecorDone)
      ) {
        IWGTasks.worldDecorateTasks.add(generator._dimension, cx, cy, cz);
        continue;
      }

      if (
        state.nDecorAllDone &&
        !Sector.StateStruct.getProperty(SectorStateStructIds.isWorldPropagationDone)
      ) {
        IWGTasks.worldPropagationTasks.add(generator._dimension, cx, cy, cz);
        continue;
      }

      if (
        state.nPropagtionAllDone &&
        !Sector.StateStruct.getProperty(SectorStateStructIds.isWorldSunDone)
      ) {
        IWGTasks.worldSunTasks.add(generator._dimension, cx, cy, cz);
        continue;
      }
    }
  }

  for (const [key, dimension] of IWGDimensions._dimensions) {
    dimension.vistedMap.clear();
  }
}
