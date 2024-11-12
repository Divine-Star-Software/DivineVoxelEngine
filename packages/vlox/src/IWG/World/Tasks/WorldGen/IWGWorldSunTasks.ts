import { IWGSingleTask } from "../../Classes/Tasks/IWGSingleTask";
import {
  IWGTasksData,
  IWGTaskBaseInterface,
} from "../../Classes/Tasks/IWGTaskBase";
import { IWGTasksTypes } from "../../Types/IWG.types";

export class IWGWorldSunTasks extends IWGSingleTask {
  static Data: IWGTasksData = {
    id: "#dve_iwg_world_sun",
    name: "world sun",
    type: IWGTasksTypes.WorldGen,
    propagationBlocking: true,
  };
  getMeta(): IWGTasksData {
    return this.getClass().Data;
  }
  getClass(): IWGTaskBaseInterface {
    return IWGWorldSunTasks;
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
      gen.columnTool.getStructValue("#dve_is_world_sun_done")
    )
      return onDone();
    gen.dveTasks.worldSun.deferred.run([gen.dimension, x, y, z], () => {
      onDone();
      if (gen.columnTool.loadInAt(x, y, z))
        return gen.columnTool.setTagValue("#dve_is_world_sun_done", 1);
    });
  }
}
