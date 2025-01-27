import { Generator } from "../Classes/Generator";
import { Circle, Square } from "@amodx/math";
import { WorldSpaces } from "../../../../World/WorldSpaces";
import { ColumnState } from "../Classes/ColumnState";
import { WorldRegister } from "../../../../World/WorldRegister";
import { getColumnState } from "./getColumnState";
import { IWGTasks } from "../IWGTasks";
import { IWGDimensions } from "../IWGDimensions";
const stateCursor = new ColumnState();
const columnSquare = new Square();
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

    const columnPosition = generator._columnPosition;
    queue.push(columnPosition.x, columnPosition.y, columnPosition.z);

    generator._renderCircle.center.x = columnPosition.x;
    generator._renderCircle.center.y = columnPosition.z;

    while (queue.length) {
      const cx = queue.shift()!;
      const cy = queue.shift()!;
      const cz = queue.shift()!;
      if (visitedMap.has(cx, cy, cz)) continue;
      visitedMap.add(cx, cy, cz);
      columnSquare.sideLength = WorldSpaces.column.bounds.x;
      columnSquare.center.x = cx;
      columnSquare.center.y = cz;

      if (
        !Circle.IsSquareInsideOrTouchingCircle(
          columnSquare,
          generator._renderCircle
        )
      )
        continue;

      WorldRegister.setDimension(generator._dimension);
      const column = WorldRegister.column.get(cx, cy, cz);

      if (!column) continue;

      const state = getColumnState(column, stateCursor, segment);

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
