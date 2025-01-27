import { Generator } from "../Classes/Generator";
import { Circle, Square } from "@amodx/math";
import { getColumnState } from "./getColumnState";
import { ColumnState } from "../Classes/ColumnState";
import { WorldRegister } from "../../../../World/WorldRegister";
import { Column } from "../../../../World";
import { ColumnStructIds } from "../../../../World/Column/ColumnStructIds";
import { WorldLock } from "../../../../World/Lock/WorldLock";
import { IWGTasks } from "../IWGTasks";
import { IWGDimensions } from "../IWGDimensions";
import { WorldSpaces } from "../../../../World/WorldSpaces";
const stateCursor = new ColumnState();
const columnSquare = new Square();
export function runWorldUpdate(generators: Generator[]) {
  for (const generator of generators) {
    const segment = IWGDimensions._dimensions.get(generator._dimension);
    if (!segment)
      throw new Error(
        `No segment for dimensions ${generator._dimension} found.`
      );

    const queue = segment.queue;
    const vistedMap = segment.vistedMap;

    const columnPosition = generator._columnPosition;
    queue.push(columnPosition.x, columnPosition.y, columnPosition.z);

    generator._genCircle.center.x = columnPosition.x;
    generator._genCircle.center.y = columnPosition.z;

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

      columnSquare.sideLength = WorldSpaces.column.bounds.x;
      columnSquare.center.x = cx;
      columnSquare.center.y = cz;

      if (
        !Circle.IsSquareInsideOrTouchingCircle(
          columnSquare,
          generator._genCircle
        )
      )
        continue;

      WorldRegister.setDimension(generator._dimension);
      const column = WorldRegister.column.get(cx, cy, cz);
      if (!column) {
        IWGTasks.worldLoadTasks.add(generator._dimension, cx, cy, cz);
        continue;
      }

      const state = getColumnState(column, stateCursor, segment);

      Column.StateStruct.setBuffer(column.stateBuffer);

      if (
        state.allLoaded &&
        !Column.StateStruct.getProperty(ColumnStructIds.isWorldGenDone)
      ) {
        IWGTasks.worldGenTasks.add(generator._dimension, cx, cy, cz);
        continue;
      }

      if (
        state.nWorldGenAllDone &&
        !Column.StateStruct.getProperty(ColumnStructIds.isWorldDecorDone)
      ) {
        IWGTasks.worldDecorateTasks.add(generator._dimension, cx, cy, cz);
        continue;
      }

      if (
        state.nDecorAllDone &&
        !Column.StateStruct.getProperty(ColumnStructIds.isWorldPropagationDone)
      ) {
        IWGTasks.worldPropagationTasks.add(generator._dimension, cx, cy, cz);
        continue;
      }

      if (
        state.nPropagtionAllDone &&
        !Column.StateStruct.getProperty(ColumnStructIds.isWorldSunDone)
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
