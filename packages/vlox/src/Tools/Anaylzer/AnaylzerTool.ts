import { Distance3D } from "@amodx/math/Vectors/Functions/Distance3d";
import { ColumnDataTool } from "../Data/WorldData/ColumnDataTool.js";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { SafeInterval } from "@amodx/core/Intervals/SafeInterval.js";

export class AnaylzerTool extends LocationBoundTool {
  static columnDataTool = new ColumnDataTool();
  runUpdate(radius: number, onDone: Function) {
    const [dimension, sx, sy, sz] = this.location;
    const dim = WorldRegister.instance.dimensions.get(dimension);
    if (!dim) return;
    let totalColumns = 0;
    for (const [key, region] of dim.regions) {
      for (const [index, column] of region.columns) {
        const [cx, cy, cz] = region.getColumnPosition(index);
        if (Distance3D(sx, sy, sz, cx, cy, cz) > radius) {
          totalColumns++;
        }
      }
    }
    const inte = new SafeInterval().setInterval(1).setOnRun(() => {
      if (totalColumns == 0) {
        inte.stop();
        if (onDone) onDone();
      }
    });
    inte.start();
  }
}
