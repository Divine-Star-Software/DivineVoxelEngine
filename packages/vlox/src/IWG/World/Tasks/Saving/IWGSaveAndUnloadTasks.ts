import { IWGSingleTask } from "../../Classes/Tasks/IWGSingleTask";
import {
  IWGTasksData,
  IWGTaskBaseInterface,
} from "../../Classes/Tasks/IWGTaskBase";
import { IWG } from "../../IWG";
import { IWGTasksTypes } from "../../Types/IWG.types";

export class IWGSaveAndUnloadTasks extends IWGSingleTask {
  static Data: IWGTasksData = {
    id: "dve_iwg_save_and_unload",
    name: "save and unload",
    type: IWGTasksTypes.Saving,
  };
  getMeta(): IWGTasksData {
    return this.getClass().Data;
  }
  getClass(): IWGTaskBaseInterface {
    return IWGSaveAndUnloadTasks;
  }

  async run(
    dimensionId: string,
    x: number,
    y: number,
    z: number,
    onDone: Function
  ) {
    const gen = this.gen;
    if (!gen.dataLoader) return onDone();
    gen.dataLoader.unLoadColumn([gen.dimension, x, y, z]);
    await onDone();
  }
}
