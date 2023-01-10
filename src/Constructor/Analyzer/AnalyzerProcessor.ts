import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import type { UpdateTasksO } from "Meta/Tasks/Tasks.types.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { HeightMapTool } from "../../Tools/Data/WorldData/HeightMapTool.js";
import { GetConstructorDataTool } from "../Tools/Data/ConstructorDataTool.js";

const mainDT = GetConstructorDataTool();
const secondaryDT = GetConstructorDataTool();
const columnTool = new ColumnDataTool();
const heightMapTool = new HeightMapTool();
export const AnalyzerProcessor = {
 anaylzeColumn(
  location: LocationData,
  options: {
   light?: boolean;
  }
 ) {
  if (!columnTool.loadInAt(location)) return;
  const lightUpdates: UpdateTasksO[] = [];
  mainDT.setDimension(location[0]);
  secondaryDT.setDimension(location[0]);
  const column = columnTool.getColumn();
  for (const [index, chunk] of column.chunks) {
   heightMapTool.chunk.setChunk(chunk);
   let maxX = WorldSpaces.chunk._bounds.x;
   let maxZ = WorldSpaces.chunk._bounds.z;
   for (let x = 0; x < maxX; x += 1) {
    for (let z = 0; z < maxZ; z += 1) {
     let minY = heightMapTool.chunk.setXZ(x, z).getMin();
     let maxY = heightMapTool.chunk.setXZ(x, z).getMax() + 1;

     for (let y = minY; y < maxY; y += 1) {
      if (!mainDT.loadInAt(x, y, z)) continue;
      if (options.light) {
       if (mainDT.isLightSource()) {
        lightUpdates.push([[location[0], x, y, z], "main", "self"]);
       }
      }
     }
    }
   }
  }

  return {
    light : lightUpdates
  }
 },
};
