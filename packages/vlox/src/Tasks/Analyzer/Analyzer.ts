import type { LocationData } from "../../Math";
//objects
import { DivineVoxelEngineConstructor } from "../../Contexts/Constructor/DivineVoxelEngineConstructor.js";
import { AnalyzerUpdater } from "./AnalyzerUpdater.js";
//tools
import { WorldCursor } from "../../World/Cursor/WorldCursor.js";
import { ChunkCursor } from "../../World/Cursor/ChunkCursor.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";

export class Analyzer {
  updater = AnalyzerUpdater;

  worldCurosr = new WorldCursor();
  chunkCursor = new ChunkCursor();
  substanceData = new SubstanceDataTool();

  _flowChecks = [
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];


  async runUpdate(data: LocationData) {
    /*     if (!columnTool.setLocation(data[0]).loadIn()) return;
    const deltaTime = Date.now() - columnTool.getLastAnalyzerUpdateTimestamp();

    const location = [...data[0]] as LocationData;


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
            if (!mainDT.loadInAt(x, y, z)) continue;
            location[1] = x;
            location[2] = y;
            location[3] = z;
            const run = this.updater.getVoxel(mainDT.getStringId());
            if (!run) continue;
            run(
              location,
              deltaTime,
              this,
              DivineVoxelEngineConstructor.instance
            );
          }
        }
      }
    }


    columnTool.setLastAnalyzerUpdateTimestamp(); */
  }
}
