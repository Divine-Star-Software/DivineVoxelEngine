import { SafeInterval } from "@divinestar/utils/Intervals/SafeInterval";
import { IWGSingleTask } from "../../Classes/Tasks/IWGSingleTask";
import { WorldRegister } from "../../../../../Data/World/WorldRegister";
import {
  IWGTasksData,
  IWGTaskBaseInterface,
} from "../../Classes/Tasks/IWGTaskBase";
import { IWGTasksTypes } from "../../Types/IWG.types";

export class IWGLoadTask extends IWGSingleTask {
  static Data: IWGTasksData = {
    id: "#dve_iwg_load",
    name: "load",
    type: IWGTasksTypes.WorldGen,
    propagationBlocking: true,
  };
  getMeta(): IWGTasksData {
    return this.getClass().Data;
  }
  getClass(): IWGTaskBaseInterface {
    return IWGLoadTask;
  }

  async run(
    dimensionId: string,
    x: number,
    y: number,
    z: number,
    onDone: Function
  ) {
    const gen = this.gen;

    if (!gen.dataLoader) {
      if (gen.columnTool.loadInAt(x, y, z)) {
        return onDone();
      }
      gen.builder.setXYZ(x, y, z).fillColumn();
      return onDone();
    }
    if (gen.columnTool.loadInAt(x, y, z)) {
      return onDone();
    }
    let tries = 0;
    let ran = false;
    let cleared = false;
    const inte = new SafeInterval();
    inte.setInterval(1_000);
    inte.setOnRun(() => {
      if (ran) {
        inte.stop();
        return;
      }
      tries++;

      if (!gen.columnTool.loadInAt(x, y, z) && tries >= 120 && !ran) {
        inte.stop();
        onDone();
        console.error(
          "force quit loading column",
          ran,
          [gen.dimension, x, y, z],
          gen.columnTool.loadInAt(x, y, z),
          WorldRegister.instance.column.get([gen.dimension, x, y, z])
        );
        cleared = true;
      }
    });
    inte.start();
    const exists = await gen.dataLoader.loadIfExists([gen.dimension, x, y, z]);
    ran = true;
    if (cleared) return;

    onDone();
    if (!exists) {
      gen.builder.setXYZ(x, y, z).fillColumn();
      return;
    }
  }
}
