import type { UpdateTasksO } from "Meta/Tasks/Tasks.types.js";
import { FlowUpdate } from "../Propagation/Flow/Functions/FlowUpdate.js";
import { Propagation } from "../Propagation/Propagation.js";
import { AnalyzerProcessor } from "./AnalyzerProcessor.js";
import { GetConstructorDataTool } from "../Tools/Data/ConstructorDataTool.js";
import { TasksRequest } from "../Tasks/TasksRequest.js";

const mainDT = GetConstructorDataTool();
export const Analyzer = {
 processor: AnalyzerProcessor,

 async runWorldPropagation(data: UpdateTasksO) {
  const tasks = this.processor.anaylzeColumn(data[0], {
   light: true,
   flow: true,
  });
  if (!tasks) return false;
  tasks.start();
  Propagation.rgb.update(tasks);
  const dimension = data[0][0];
  for (const flowUpdate of tasks.queues.flow.update.queue) {
   const [x, y, z] = flowUpdate;
   if (!mainDT.loadInAt(x, y, z)) continue;
   await FlowUpdate(
    TasksRequest.getFlowUpdateRequest([dimension, x, y, z], "none", "self"),
    false,
    mainDT.getStringId()
   );
  }
  tasks.stop();
 },
};
