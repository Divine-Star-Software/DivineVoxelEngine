import type { Generator } from "World/Classes/Generator";
import { IWGLoadBase } from "./LoaderBase.js";

export class IWGInitalLoad extends IWGLoadBase {
  async run(onCheck: (gen: Generator) => void) {
    this.gen.__build = false;
    await this._waitTillAllTasksAreDone(["world-gen"], onCheck);
    this.gen.__build = true;
    this.gen.saveAllColumns();
    await this._waitTillAllTasksAreDone(["world-gen", "saving"], onCheck);
  }
}
