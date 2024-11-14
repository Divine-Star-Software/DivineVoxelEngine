import type { AnaylzerTask } from "../Types/Tasks.types.js";
import type { LocationData } from "../Math";
//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { DivineVoxelEngineConstructor } from "../Contexts/Constructor/DivineVoxelEngineConstructor.js";
import { AnalyzerUpdater } from "./AnalyzerUpdater.js";

import { DVEAnaylzer } from "../Interfaces/Anaylzer/DVEAnaylzer.js";
import { DataTool } from "../Tools/Data/DataTool.js";
import { TasksRequest } from "../Contexts/Constructor/Tasks/TasksRequest.js";
import { Propagation } from "../Propagation/Propagation.js";
import { WorldRegister } from "../Data/World/WorldRegister.js";
//tools

import { WorldSpaces } from "../Data/World/WorldSpaces.js";
import { ColumnDataTool } from "../Tools/Data/WorldData/ColumnDataTool.js";
import { HeightMapTool } from "../Tools/Data/WorldData/HeightMapTool.js";

const columnTool = new ColumnDataTool();
const heightMapTool = new HeightMapTool();

const mainDT = new DataTool();
const secondaryDT = new DataTool();
export class Analyzer extends DVEAnaylzer {
  updater = AnalyzerUpdater;

  _flowChecks = [
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  async runPropagation(data: AnaylzerTask) {
    let t: any = {};

    const options = {
      light: EngineSettings.doLight(),
      flow: EngineSettings.doFlow(),
    };
    mainDT.setDimension(data[0][0]);
    secondaryDT.setDimension(data[0][0]);
    const tasks = TasksRequest.getVoxelUpdateRequests(data[0], "none", "self");
    tasks.start();

    const location = data[0];
    if (!columnTool.loadInAtLocation(location)) return;
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


      if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) continue;
      for (let y = cy + minY; y <= cy + maxY; y++) {
        for (let z = cz; z < maxZ; z++) {
          for (let x = cx; x < maxX; x++) {
            if (!mainDT.loadInAt(x, y, z) || mainDT.isAir()) continue;

            if (options.light) {
      
              if (mainDT.isLightSource()) {
                console.warn("add to light update", x, y, z);
                tasks.queues.rgb.update.push(x, y, z);
              }
            }
            if (options.flow) {
              t = {
                id: mainDT.getStringId(),
                sustance: mainDT.getSubstance(),
                substanceStringId: mainDT.getSubstanceStringId(),
              };
              if (mainDT.getSubstnaceData().isLiquid()) {
                let add = false;
                for (const check of this._flowChecks) {
                  if (
                    secondaryDT.loadInAt(
                      x + check[0],
                      y + check[1],
                      z + check[2]
                    )
                  ) {
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

    WorldRegister.instance.cache.disable();

    Propagation.instance.rgbUpdate(tasks);
    const dimension = data[0][0];
    for (const flowUpdate of tasks.queues.flow.update.queue) {
      const [x, y, z] = flowUpdate;
      if (!mainDT.loadInAt(x, y, z)) continue;
      await Propagation.instance.flowUpdate(
        TasksRequest.getFlowUpdateRequest([dimension, x, y, z], "none", "self"),
        false
      );
    }
    tasks.stop();
  }

  async runUpdate(data: AnaylzerTask) {
    if (!columnTool.setLocation(data[0]).loadIn()) return;
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
    columnTool.setLastAnalyzerUpdateTimestamp();
  }
}
