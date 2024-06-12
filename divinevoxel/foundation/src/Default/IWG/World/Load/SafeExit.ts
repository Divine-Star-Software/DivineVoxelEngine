import type { Generator } from "../Classes/Generator";
import { IWGTaskBase } from "../Classes/Tasks/IWGTaskBase";
import { IWGTasksTypes } from "../Types/IWG.types";
import { IWGLoadBase } from "./LoaderBase.js";

export class IWGSafeExit extends IWGLoadBase {
  async run(onCheck: (gen: Generator) => void) {
    this.gen.cancelWorldGenTasks();
    this.gen.clearAll();
    this.gen.__build = false;
    this.settings.doWorldGenUpdate = false;
    this.settings.timeout = 20;
    await this._waitTillAllTasksAreDone([IWGTasksTypes.WorldGen], onCheck);
    this.gen.unLoadAllColumns();
    await this._waitTillAllTasksAreDone([IWGTasksTypes.Saving], onCheck);
    await this.gen.richData.releaeAllData();
    this.settings.doWorldGenUpdate = true;
  }
}
