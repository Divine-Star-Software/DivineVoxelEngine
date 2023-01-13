import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { HeightMapTool } from "../../Tools/Data/WorldData/HeightMapTool.js";
import { GetConstructorDataTool } from "../Tools/Data/ConstructorDataTool.js";
import { TasksRequest } from "../Tasks/TasksRequest.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
const mainDT = GetConstructorDataTool();
const secondaryDT = GetConstructorDataTool();
const columnTool = new ColumnDataTool();
const heightMapTool = new HeightMapTool();
const chunkTool = new ChunkDataTool();
export const AnalyzerProcessor = {
 _flowChecnks: [
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
 ],
 anaylzeColumn(
  location: LocationData,
  options: {
   light?: boolean;
   flow?: boolean;
  }
 ) {
  if (!columnTool.loadInAt(location)) return;
  const tasks = TasksRequest.getVoxelUpdateRequests(location, "none", "self");
  tasks.start();
  mainDT.setDimension(location[0]);
  secondaryDT.setDimension(location[0]);
  chunkTool.setDimension(location[0]);
  columnTool.setDimension(location[0]);
  const column = columnTool.getColumn();
  for (const [index, chunk] of column.chunks) {
   heightMapTool.chunk.setChunk(chunk);
   chunkTool.setChunk(chunk);
   const [dimension, sx, sy, sz] = chunkTool.getLocationData();
   let maxX = WorldSpaces.chunk._bounds.x + sx;
   let maxZ = WorldSpaces.chunk._bounds.z + sz;
   for (let x = sx; x < maxX; x += 1) {
    for (let z = sz; z < maxZ; z += 1) {
     let minY = heightMapTool.chunk.setXZ(x, z).getMin() + sy;
     let maxY = heightMapTool.chunk.setXZ(x, z).getMax() + 1 + sy;
     for (let y = minY; y < maxY; y += 1) {
      if (!mainDT.loadInAt(x, y, z)) continue;
      const substance = mainDT.getSubstance();
      if (options.light) {
       if (mainDT.isLightSource()) {
        tasks.queues.rgb.update.push([x, y, z]);
       }
      }
      if (options.flow) {
       if (substance == "liquid" || substance == "magma") {
        let add = false;
        for (const check of this._flowChecnks) {
         if (secondaryDT.loadInAt(x + check[0], y + check[1], z + check[2])) {
          if (secondaryDT.isAir()) {
           add = true;
           break;
          }
         }
        }
        if (add) {
         tasks.queues.flow.update.queue.push([x, y, z]);
        }
       }
      }
     }
    }
   }
  }
  tasks.stop();
  return tasks;
 },
};
