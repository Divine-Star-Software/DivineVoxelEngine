import { IWGSingleTask } from "../../Classes/Tasks/IWGSingleTask";
import {
  IWGTasksData,
  IWGTaskBaseInterface,
} from "../../Classes/Tasks/IWGTaskBase";
import { IWGTasksTypes } from "../../Types/IWG.types";

export class IWGGenerateTasks extends IWGSingleTask {
  static Data: IWGTasksData = {
    id: "#dve_iwg_generate",
    name: "generate",
    type: IWGTasksTypes.WorldGen,
    propagationBlocking: true,
  };
  getMeta(): IWGTasksData {
    return this.getClass().Data;
  }
  getClass(): IWGTaskBaseInterface {
    return IWGGenerateTasks;
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
      gen.columnTool.getStructValue("#dve_is_world_gen_done")
    )
      return onDone();
    gen.builder.setDimension(gen.dimension).setXYZ(x, y, z).fillColumn();
    gen.dveTasks.generate.deferred.run([gen.dimension, x, y, z], [], () => {
      onDone();
      if (gen.columnTool.loadInAt(x, y, z))
        return gen.columnTool.setTagValue("#dve_is_world_gen_done", 1);
      console.error(`${x} ${y} ${z} could not be loaded after generted`);
    });
  }
}
