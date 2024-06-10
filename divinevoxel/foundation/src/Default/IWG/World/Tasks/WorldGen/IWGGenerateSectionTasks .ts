import { IWGSingleTask } from "../../Classes/Tasks/IWGSingleTask";
import {
  IWGTasksData,
  IWGTaskBaseInterface,
} from "../../Classes/Tasks/IWGTaskBase";
import { IWGTasksTypes } from "../../Types/IWG.types";

export class IWGGenerateSectionTasks extends IWGSingleTask {
  static Data: IWGTasksData = {
    id: "#dve_iwg_generate_section",
    name: "generate section",
    type: IWGTasksTypes.WorldGen,
    propagationBlocking: true,
  };
  getMeta(): IWGTasksData {
    return this.getClass().Data;
  }
  getClass(): IWGTaskBaseInterface {
    return IWGGenerateSectionTasks;
  }

  async run(
    dimensionId: string,
    cx: number,
    y: number,
    cz: number,
    onDone: Function
  ) {
    const gen = this.gen;
    for (let x = cx; x < cx + 32; x += 16) {
      for (let z = cz; z < cz + 32; z += 16) {
        gen.builder.setDimension(gen.dimension).setXYZ(cx, y, cz).fillColumn();
      }
    }
    gen.builder.setDimension(gen.dimension).setXYZ(cx, y, cz).fillColumn();
    gen.dveTasks.generate.deferred.run([gen.dimension, cx, y, cz], [], () => {
      onDone();
      for (let x = cx; x < cx + 32; x += 16) {
        for (let z = cz; z < cz + 32; z += 16) {
          if (gen.columnTool.loadInAt(x, y, z)) {
            gen.columnTool.setTagValue("#dve_is_world_gen_done", 1);
          } else {
            console.error(`${x} ${y} ${z} could not be loaded after generted`);
          }
        }
      }
    });
  }
}
