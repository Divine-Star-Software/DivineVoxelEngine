import type { LocationData } from "../Math";
import { WorldSpaces } from "../Data/World/WorldSpaces.js";
import { ColumnDataTool } from "../Tools/Data/WorldData/ColumnDataTool.js";
import { HeightMapTool } from "../Tools/Data/WorldData/HeightMapTool.js";
import { WorldRegister } from "../Data/World/WorldRegister.js";
const columnTool = new ColumnDataTool();
const heightMapTool = new HeightMapTool();
export const AnalyzerProcessor = {
  columnTool: columnTool,
  goThroughColumn<T>(
    location: LocationData,
    run: (x: number, y: number, z: number, column: ColumnDataTool) => void
  ) {
    if (!columnTool.setLocation(location).loadIn()) return;
    WorldRegister.instance.cache.enable();
    const column = columnTool.getColumn();
    let maxX = WorldSpaces.chunk._bounds.x + location[1];
    let maxZ = WorldSpaces.chunk._bounds.z + location[3];
    for (let i = 0; i < column.chunks.length; i++) {
      const chunk = column.chunks[i];
      if (!chunk) continue;
      heightMapTool.chunk.setChunk(chunk);
      const [cx, cy, cz] = [
        location[1],
        location[2] + i * WorldSpaces.chunk.getHeight(),
        location[3],
      ];
      let [minY, maxY] = heightMapTool.chunk.getMinMax();
      minY += cy;
      maxY += cy + 1;
      for (let y = minY; y < maxY; y += 1) {
        for (let z = cz; z < maxZ; z += 1) {
          for (let x = cx; x < maxX; x += 1) {
            run(x, y, z, columnTool);
          }
        }
      }
    }

    WorldRegister.instance.cache.disable();
  },
};
