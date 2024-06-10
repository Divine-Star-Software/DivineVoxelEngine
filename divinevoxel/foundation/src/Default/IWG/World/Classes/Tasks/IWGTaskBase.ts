import type { IWGTasksTypes } from "../../Types/IWG.types";
import { IWG } from "../../IWG.js";
import { Generator } from "../Generator.js";
import { VisitedMap } from "../../../../../Util/VisistedMap.js";
import { Vec3Array } from "@divinevoxel/core/Math";

export type IWGTasksData = {
  id: string;
  name: string;
  type: IWGTasksTypes;
  propagationBlocking?: boolean;
};

export interface IWGTaskBaseInterface {
  Data: IWGTasksData;
  new (gen: Generator): IWGTaskBase;
}

export abstract class IWGTaskBase {
  queue: [x: number, y: number, z: number][] = [];
  map = new VisitedMap();
  waitingFor = 0;

  constructor(public gen: Generator) {}

  add(x: number, y: number, z: number) {
    if (this.map.inMap(x, y, z)) return;
    if (this.getMeta().propagationBlocking && IWG.inProgressMap.has(x, y, z))
      return;
    this.queue.push([x, y, z]);
    this.map.add(x, y, z);
  }

  remove(x: number, y: number, z: number) {
    this.map.remove(x, y, z);
    if (this.getMeta().propagationBlocking) {
      IWG.inProgressMap.remove(x, y, z);
    }
  }

  cancelAll() {
    if (this.getMeta().type == "world-gen") {
      while (this.queue.length) {
        const node = this.queue.shift()!;
      }
    }
    this.queue = [];
    this.map.clear();
  }

  abstract runTasks(max: number, cachedPosition: Vec3Array): void;

  abstract getMeta(): IWGTasksData;
  abstract getClass(): IWGTaskBaseInterface;
}
