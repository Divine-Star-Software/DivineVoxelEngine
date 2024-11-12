import { IWG } from "../../IWG.js";
import { Vec3Array } from "@amodx/math";
import { IWGTaskBase } from "./IWGTaskBase";
//import { Vec3ArrayDistanceSort } from "@amodx/math/Vectors/Functions/DistnaceSort.js";
export abstract class IWGSingleTask extends IWGTaskBase {
  abstract run(
    dimensionId: string,
    x: number,
    y: number,
    z: number,
    onDone: Function
  ): void;
  runTasks(max = 5, cachedPosition: Vec3Array) {
    if (this.waitingFor < 0) this.waitingFor = 0;
    if (this.waitingFor >= max) return;

 //   Vec3ArrayDistanceSort(cachedPosition, this.queue);
    while (this.waitingFor < max) {
      const node = this.queue.shift();
      if (!node) break;
      this.waitingFor++;
      const [x, y, z] = node;
      if (this.getMeta().propagationBlocking) {
        IWG.inProgressMap.add(x, y, z, this.getMeta().id);
      }
      this.run(this.gen.dimension, x, y, z, () => {
        this.map.remove(x, y, z);
        if (this.getMeta().propagationBlocking) {
          IWG.inProgressMap.remove(x, y, z);
        }
        this.waitingFor--;
      });
    }
  }
}
