import type { Generator } from "../Classes/Generator";
import { IWGTaskBase } from "../Classes/Tasks/IWGTaskBase";
import { IWGTasksTypes } from "../Types/IWG.types";
import { IWGLoadBase } from "./LoaderBase.js";

export class IWGInitalLoad extends IWGLoadBase {
  async run(onCheck: (gen: Generator) => void) {
    this.gen.__build = false;
    this.settings.doSearchUpdate = true;
    this.settings.doWorldGenUpdate = true;
    this.settings.doSaveUpate = false;
    await this._waitTillAllTasksAreDone([IWGTasksTypes.WorldGen], onCheck);
  //  this.gen.__build = true;
    this.gen.saveAllColumns();
    console.log(this.gen.tasks.saving);
    this.settings.doSearchUpdate = false;
    this.settings.doWorldGenUpdate = false;
    this.settings.doSaveUpate = true;
  //  this.settings.doBuildUpdate = true;
    await this._waitTillAllTasksAreDone([IWGTasksTypes.Saving], onCheck);
  //  await this._waitTillAllTasksAreDone([IWGTasksTypes.Rendering], onCheck);
  }
}
