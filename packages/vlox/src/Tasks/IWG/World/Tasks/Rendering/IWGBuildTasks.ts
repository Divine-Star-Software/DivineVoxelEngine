import { IWGSingleTask } from "../../Classes/Tasks/IWGSingleTask";
import {
  IWGTasksData,
  IWGTaskBaseInterface,
} from "../../Classes/Tasks/IWGTaskBase";
import { IWG } from "../../IWG";
import { IWGTasksTypes } from "../../Types/IWG.types";

export class IWGBuildTasks extends IWGSingleTask {
  static Data: IWGTasksData = {
    id: "dve_iwg_build",
    name: "build",
    type: IWGTasksTypes.Rendering,
  };
  getMeta(): IWGTasksData {
    return this.getClass().Data;
  }
  getClass(): IWGTaskBaseInterface {
    return IWGBuildTasks;
  }

  async run(
    dimensionId: string,
    x: number,
    y: number,
    z: number,
    onDone: Function
  ) {
    const gen = this.gen;
    gen._builtColumns.set(IWG.getKey(x, y, z), [x, y, z]);
    gen.builder
      .setDimension(gen.dimension)
      .setXYZ(x, y, z)
      .buildColumn((data) => {
        onDone();
      });
  }
}
