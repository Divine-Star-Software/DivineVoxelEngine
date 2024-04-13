import type { Generator } from "../Classes/Generator";
import { IWGLoadBase } from "./LoaderBase.js";

export class IWGSafeExit extends IWGLoadBase {
  async run(onCheck: (gen: Generator) => void) {
    this.gen.cancelWorldGenTasks();
    this.gen.clearAll();
    this.gen.__build = false;
    this.settings.doSearchUpdate = false;
    this.settings.timeout = 20;
    await this._waitTillAllTasksAreDone(["world-gen"], onCheck);
    this.gen.unLoadAllColumns();
    await this._waitTillAllTasksAreDone(["saving"], onCheck);
    await this.gen.richData.releaeAllData();
    this.settings.doSearchUpdate = true;
  }
}
