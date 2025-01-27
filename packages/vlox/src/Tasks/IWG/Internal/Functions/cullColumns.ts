import { Circle, Square } from "@amodx/math";
import { IWGDimensions } from "../IWGDimensions";
import { Generator } from "../Classes/Generator";
import { WorldRegister } from "../../../../World/WorldRegister";
import { WorldSpaces } from "../../../../World/WorldSpaces";
import { IWGTools } from "../IWGTools";
import { WorldLock } from "../../../../World/Lock/WorldLock";
import { IWGTasks } from "../IWGTasks";

const columnSquare = new Square();

export function cullColumns(generators: Generator[]) {
  for (const [, dimension] of IWGDimensions._dimensions) {
    WorldRegister.setDimension(dimension.id);
    const worldDimension = WorldRegister.dimensions.get(dimension.id)!;

    for (const [, column] of worldDimension.columns) {
      const [cx, cy, cz] = column.position;
      columnSquare.sideLength = WorldSpaces.column.bounds.x;
      columnSquare.center.x = cx;
      columnSquare.center.y = cz;

      let inRenderCircle = false;
      let inMaxCircle = false;

      if (WorldLock.isLocked([dimension.id, cx, cy, cz])) continue;
      if (dimension.inProgress.has(cx, cy, cz)) continue;

      for (const gen of generators) {
        if (gen._dimension != dimension.id) continue;
        if (
          Circle.IsSquareInsideOrTouchingCircle(columnSquare, gen._renderCircle)
        ) {
          inRenderCircle = true;
        }
        if (
          Circle.IsSquareInsideOrTouchingCircle(columnSquare, gen._maxCircle)
        ) {
          inMaxCircle = true;
        }
      }
      if (inRenderCircle && inMaxCircle) continue;

      if (!inRenderCircle) {
        dimension.rendered.remove(cx, cy, cz);
        IWGTools.parent.runTask("remove-column", [dimension.id, cx, cy, cz]);
      }

      if (!inMaxCircle) {
        if (IWGTools.worldStorage) {
          IWGTools.worldStorage.unloadColumn([dimension.id, cx, cy, cz]);
          continue;
        }
        
        WorldRegister.column.remove(cx, cy, cz);
      }
    }
  }
}
