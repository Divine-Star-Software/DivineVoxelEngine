import { Vec3ArrayDistanceSort } from "@amodx/math/Vectors/Functions/DistnaceSort.js";
import { IWG } from "../../IWG.js";
import { LocationData } from "../../../../Math";
import {  Vec3Array } from "@amodx/math";
import { IWGTaskBase } from "./IWGTaskBase";

export abstract class IWGBatchTask extends IWGTaskBase {
  abstract run(entries: LocationData[], onDone: Function): void;
  runTasks(max = 5, cachedPosition: Vec3Array) {
    if (this.waitingFor < 0) this.waitingFor = 0;
    if (this.waitingFor >= max) return;

    Vec3ArrayDistanceSort(cachedPosition, this.queue);

    const batch: LocationData[] = [];

    while (this.waitingFor < max) {
      const node = this.queue.shift();
      if (!node) break;
      this.waitingFor++;
      const [x, y, z] = node;
      if (this.getMeta().propagationBlocking) {
        IWG.inProgressMap.add(x, y, z, this.getMeta().id);
      }
      batch.push([this.gen.dimension, x, y, z]);
    }
    if (!batch.length) return;

    this.run(batch, () => {
      for (const [, x, y, z] of batch) {
        this.map.remove(x, y, z);
        if (this.getMeta().propagationBlocking) {
          IWG.inProgressMap.remove(x, y, z);
        }
      }
      this.waitingFor = 0;
    });
  }
}
