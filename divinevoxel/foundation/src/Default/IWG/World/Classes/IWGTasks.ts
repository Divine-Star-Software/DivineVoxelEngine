import type { IWGTasksData } from "../Types/IWG.types";

import { Vec3ArrayDistanceSort } from "@divinevoxel/core/Math/Functions/DistnaceSort.js";
import { IWG } from "../IWG.js";
import { Generator } from "./Generator.js";
import { VisitedMap } from "../../../../Util/VisistedMap.js";
export class IWGTasks {
  queue: [x: number, y: number, z: number][] = [];
  map = new VisitedMap();
  waitingFor = 0;

  constructor(public gen: Generator, public data: IWGTasksData) {}

  add(x: number, y: number, z: number) {
    if (this.map.inMap(x, y, z)) return;
    if (this.data.propagationBlocking && IWG.inProgressMap.has(x, y, z)) return;
    this.queue.push([x, y, z]);
    this.map.add(x, y, z);
  }

  cancelAll() {
    this.queue = [];
    this.map.clear();
  }

  runTasks(max = 5) {
    if (this.waitingFor < 0) this.waitingFor = 0;
    if (this.waitingFor >= max) return;

    Vec3ArrayDistanceSort(this.gen._cachedPosition, this.queue);
    while (this.waitingFor < max) {
      const node = this.queue.shift();
      if (!node) break;
      this.waitingFor++;
      const [x, y, z] = node;
      if (this.data.propagationBlocking) {
        IWG.inProgressMap.add(x, y, z, this.data.id);
      }
      this.data.run(this.gen, x, y, z, () => {
        this.map.remove(x, y, z);
        if (this.data.propagationBlocking) {
          IWG.inProgressMap.remove(x, y, z);
        }
        this.waitingFor--;
      });
    }
  }
}
