import type { AnaylzerTask } from "../Types/Tasks.types.js";
import type { LocationData } from "../Math";
//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { DivineVoxelEngineConstructor } from "../Contexts/Constructor/DivineVoxelEngineConstructor.js";
import { AnalyzerProcessor } from "./AnalyzerProcessor.js";
import { AnalyzerUpdater } from "./AnalyzerUpdater.js";

import { DVEAnaylzer } from "../Interfaces/Anaylzer/DVEAnaylzer.js";
import { DataTool } from "../Tools/Data/DataTool.js";
import { TasksRequest } from "../Contexts/Constructor/Tasks/TasksRequest.js";
import { Propagation } from "../Propagation/Propagation.js";
//tools

const mainDT = new DataTool();
const secondaryDT = new DataTool();
export class Analyzer extends DVEAnaylzer {
  updater = AnalyzerUpdater;
  processor = AnalyzerProcessor;
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
    this.processor.goThroughColumn(data[0], (x, y, z) => {
      if (!mainDT.loadInAt(x, y, z) || mainDT.isAir()) return;

      if (options.light) {
        if (mainDT.isLightSource()) {
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
              secondaryDT.loadInAt(x + check[0], y + check[1], z + check[2])
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
    });

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
    if (!this.processor.columnTool.setLocation(data[0]).loadIn()) return;
    const deltaTime =
      Date.now() - this.processor.columnTool.getLastAnalyzerUpdateTimestamp();

    const location = [...data[0]] as LocationData;
    this.processor.goThroughColumn(data[0], (x, y, z) => {
      if (!mainDT.loadInAt(x, y, z)) return;
      location[1] = x;
      location[2] = y;
      location[3] = z;
      const run = this.updater.getVoxel(mainDT.getStringId());
      if (!run) return;
      run(location, deltaTime, this, DivineVoxelEngineConstructor.instance);
    });

    this.processor.columnTool.setLastAnalyzerUpdateTimestamp();
  }
}
