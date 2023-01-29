import { Distance3D } from "../../Math/Functions/Distance3d.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
export class AnaylzerTool extends LocationBoundTool {
    static columnDataTool = new ColumnDataTool();
    runUpdate(radius, onDone) {
        const [dimension, sx, sy, sz] = this.location;
        const regions = WorldRegister.dimensions.get(dimension);
        if (!regions)
            return;
        let totalColumns = 0;
        for (const [key, region] of regions) {
            for (const [ckey, column] of region.columns) {
                AnaylzerTool.columnDataTool.setColumn(column);
                const [dimension, cx, cy, cz] = AnaylzerTool.columnDataTool.getLocationData();
                if (Distance3D(sx, sy, sz, cx, cy, cz) > radius) {
                    totalColumns++;
                }
            }
        }
        const inte = setInterval(() => {
            if (totalColumns == 0) {
                clearInterval(inte);
                if (onDone)
                    onDone();
            }
        }, 1);
    }
}
