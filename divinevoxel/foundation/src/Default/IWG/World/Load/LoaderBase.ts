import type { Generator } from "../Classes/Generator";
import type { IWGTasksTypes } from "../Types/IWG.types";
export abstract class IWGLoadBase {
  settings = {
    doSearchUpdate: true,
    doWorldGenUpdate: true,
    doSaveUpate: true,
    doBuildUpdate: false,
    timeout: 500,
  };
  constructor(public gen: Generator) {}

  _getTotalTasks(types: IWGTasksTypes[]) {
    let total = 0;
    for (const type of types) {
      this.gen.tasks[type].forEach((_) => {
        total += _.queue.length;
      });
    }
    return total;
  }

  _getTotalInProgress(types: IWGTasksTypes[]) {
    let total = 0;
    for (const type of types) {
      this.gen.tasks[type].forEach((_) => {
        total += _.waitingFor;
      });
    }
    return total;
  }

  _waitTillAllTasksAreDone(
    type: IWGTasksTypes[],
    onCheck: Function = () => {}
  ) {
    return new Promise((resolve) => {
      const searchInte = setInterval(() => {
        if (this.settings.doSearchUpdate) this.gen.generateUpdate();
        if (this.settings.doWorldGenUpdate) {
          this.gen.worldGenUpdate(Infinity);
          this.gen.propagationUpdate();
        }
        if (this.settings.doBuildUpdate) {
          this.gen.renderTaskUpdate(Infinity);
          this.gen.renderUpdate();
        }
        if (this.settings.doSaveUpate) this.gen.saveUpdate(Infinity);
      }, 10);

      setTimeout(() => {
        const tasksInte = setInterval(() => {
          onCheck(this.gen);
     
          if (
            this._getTotalTasks(type) == 0 &&
            this._getTotalInProgress(type) == 0
          ) {
            clearInterval(searchInte);
            clearInterval(tasksInte);
            resolve(true);
          }
        }, this.settings.timeout);
      });
    });
  }

  abstract run(onCheck: (gen: Generator) => void): Promise<void>;
}
