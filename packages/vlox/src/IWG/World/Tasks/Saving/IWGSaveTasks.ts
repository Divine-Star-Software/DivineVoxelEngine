import { IWGSingleTask } from "../../Classes/Tasks/IWGSingleTask";
import {
  IWGTasksData,
  IWGTaskBaseInterface,
} from "../../Classes/Tasks/IWGTaskBase";
import { IWG } from "../../IWG";
import { IWGTasksTypes } from "../../Types/IWG.types";

export class IWGSaveTasks extends IWGSingleTask {
  static Data: IWGTasksData = {
    id: "dve_iwg_save",
    name: "save",
    type: IWGTasksTypes.Saving,
  };
  getMeta(): IWGTasksData {
    return this.getClass().Data;
  }
  getClass(): IWGTaskBaseInterface {
    return IWGSaveTasks;
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
    await gen.dataLoader.saveColumnIfNotStored([gen.dimension, x, y, z]);
    onDone();
  }
}
