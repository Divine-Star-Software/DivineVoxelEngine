import type { AnaylzerTask } from "../Tasks.types.js";
import type { LocationData } from "../../Math";
//objects
import { EngineSettings } from "../../Settings/EngineSettings.js";
import { DivineVoxelEngineConstructor } from "../../Contexts/Constructor/DivineVoxelEngineConstructor.js";
import { AnalyzerUpdater } from "./AnalyzerUpdater.js";

import { Propagation } from "../Propagation/Propagation.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
//tools

import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { HeightMapTool } from "../../Tools/Data/WorldData/HeightMapTool.js";
import { WorldCursor } from "../../Data/Cursor/World/WorldCursor.js";
import { ChunkCursor } from "../../Data/Cursor/World/ChunkCursor.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";
import { UpdateTask } from "../Update/UpdateTask.js"

const columnTool = new ColumnDataTool();
const heightMapTool = new HeightMapTool();

//const mainDT = new DataTool();
//const secondaryDT = new DataTool();
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
  async runPropagation(data: AnaylzerTask) {
    let t: any = {};

    this.worldCurosr.setFocalPoint(...data[0]);

    const options = {
      light: EngineSettings.doLight(),
      flow: EngineSettings.doFlow(),
    };
    //  mainDT.setDimension(data[0][0]);
    const location = data[0];
    // secondaryDT.setDimension(data[0][0]);
    const tasks = new UpdateTask();
    tasks.setOrigin(location);

    if (!columnTool.loadInAtLocation(location)) return;
    WorldRegister.instance.cache.enable();
    const column = columnTool.getColumn();
    let maxX = WorldSpaces.chunk._bounds.x + location[1];
    let maxZ = WorldSpaces.chunk._bounds.z + location[3];
    for (let i = 0; i < column.chunks.length; i++) {
      const chunk = column.chunks[i];
      if (!chunk) continue;
      heightMapTool.chunk.setChunk(chunk);
      this.chunkCursor.setChunk(chunk);
      const [cx, cy, cz] = [
        location[1],
        location[2] + i * WorldSpaces.chunk.getHeight(),
        location[3],
      ];
      let [minY, maxY] = heightMapTool.chunk.getMinMax();

      if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) continue;
      for (let y = cy + minY; y <= cy + maxY; y++) {
        for (let z = cz; z < maxZ; z++) {
          for (let x = cx; x < maxX; x++) {
            const voxel = this.chunkCursor.getVoxel(x, y, z);
            if (!voxel || voxel.isAir()) continue;

            if (options.light) {
              if (voxel.isLightSource()) {
                tasks.rgb.update.push(x, y, z);
              }
            }
            if (options.flow) {
              t = {
                id: voxel.getStringId(),
                sustance: voxel.getSubstance(),
                substanceStringId: voxel.getSubstanceStringId(),
              };
              if (
                this.substanceData.setSubstance(voxel.getSubstance()).isLiquid()
              ) {
                let add = false;
                for (const check of this._flowChecks) {
                  const nVoxel = this.worldCurosr.getVoxel(
                    x + check[0],
                    y + check[1],
                    z + check[2]
                  );
                  if (nVoxel) {
                    if (nVoxel.isAir()) {
                      add = true;
                      break;
                    }
                  }
                }
                if (add) {
                  //  tasks.flow.update.queue.push([x, y, z]);
                }
              }
            }
          }
        }
      }
    }

    WorldRegister.instance.cache.disable();

    Propagation.instance.rgbUpdate(tasks);
    const dimension = data[0][0];
    for (const flowUpdate of tasks.flow.update.queue) {
      const [x, y, z] = flowUpdate;
      if (!this.worldCurosr.getVoxel(x, y, z)) continue;
      const tasks = new UpdateTask();
      tasks.setOrigin([dimension, x, y, z]);
      await Propagation.instance.flowUpdate(tasks, false);
    }
  }

  async runUpdate(data: AnaylzerTask) {
    /*     if (!columnTool.setLocation(data[0]).loadIn()) return;
    const deltaTime = Date.now() - columnTool.getLastAnalyzerUpdateTimestamp();

    const location = [...data[0]] as LocationData;

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

    WorldRegister.instance.cache.disable();
    columnTool.setLastAnalyzerUpdateTimestamp(); */
  }
}
