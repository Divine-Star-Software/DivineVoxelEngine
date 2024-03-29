import { Distance3D } from "../../Math/Functions/Distance3d.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { SafeInterval } from "@divinestar/utils/Intervals/SafeInterval.js";

export class AnaylzerTool extends LocationBoundTool {
  static columnDataTool = new ColumnDataTool();
  runUpdate(radius: number, onDone: Function) {
    const [dimension, sx, sy, sz] = this.location;
    const dim = WorldRegister.dimensions.get(dimension);
    if (!dim) return;
    let totalColumns = 0;
    for (const [key, region] of dim.regions) {
      for (const column of region.getColumns()) {
        AnaylzerTool.columnDataTool.setColumn(column);
        const [dimension, cx, cy, cz] =
          AnaylzerTool.columnDataTool.getLocationData();
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
