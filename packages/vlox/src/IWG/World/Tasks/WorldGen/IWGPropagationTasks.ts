import { IWGSingleTask } from "../../Classes/Tasks/IWGSingleTask";
import {
  IWGTasksData,
  IWGTaskBaseInterface,
} from "../../Classes/Tasks/IWGTaskBase";
import { IWGTasksTypes } from "../../Types/IWG.types";

export class IWGPropagationTasks extends IWGSingleTask {
  static Data: IWGTasksData = {
    id: "dve_iwg_propagation",
    name: "propagation",
    type: IWGTasksTypes.WorldGen,
    propagationBlocking: true,
  };
  getMeta(): IWGTasksData {
    return this.getClass().Data;
  }
  getClass(): IWGTaskBaseInterface {
    return IWGPropagationTasks;
  }

  async run(
    dimensionId: string,
    x: number,
    y: number,
    z: number,
    onDone: Function
  ) {
    const gen = this.gen;
    if (
      gen.columnTool.loadInAt(x, y, z) &&
      gen.columnTool.getStructValue("dve_is_world_propagation_done")
    )
      return onDone();
    gen.dveTasks.propagation.deferred.run([gen.dimension, x, y, z], () => {
      onDone();
      if (gen.columnTool.loadInAt(x, y, z))
        return gen.columnTool.setTagValue("dve_is_world_propagation_done", 1);
    });
  }
}
