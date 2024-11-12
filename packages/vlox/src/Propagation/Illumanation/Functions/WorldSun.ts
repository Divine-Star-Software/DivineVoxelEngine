//types
import type { WorldSunTaskRequest } from "../../../Contexts/Constructor/Tasks/TasksRequest";
//data
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { $3dCardinalNeighbors } from "../../../Math/Constants/CardinalNeighbors.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";

import { IlluminationManager as IM } from "../IlluminationManager.js";
import { HeightMapTool } from "../../../Tools/Data/WorldData/HeightMapTool.js";
const inColumnBounds = (cx: number, cz: number, x: number, z: number) => {
  if (
    x >= cx &&
    x <= cx + WorldSpaces.chunk._bounds.x &&
    z >= cz &&
    z <= cz + WorldSpaces.chunk._bounds.z
  )
    return true;
  return false;
};

class QueueNode {
  public next: QueueNode | null = null;
  constructor(public x: number, public y: number, public z: number) {}
}

class ReusableQueue {
  private head: QueueNode | null = null;
  private tail: QueueNode | null = null;
  private freeList: QueueNode[] = [];

  enqueue(x: number, y: number, z: number) {
    let node: QueueNode;
    if (this.freeList.length) {
      node = this.freeList.shift()!;
      node.x = x;
      node.y = y;
      node.z = z;
      node.next = null;
    } else {
      node = new QueueNode(x, y, z);
    }

    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }
    this.tail = node;
  }

  dequeue(): QueueNode | null {
    if (!this.head) return null;
    const node = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = null;

    return node;
  }

  returnNode(node: QueueNode) {
    this.freeList.push(node);
  }

  isEmpty(): boolean {
    return this.head === null;
  }
}

const queue = new ReusableQueue();

const heightMapTool = new HeightMapTool();

export function RunWorldSun(tasks: WorldSunTaskRequest) {
  IM.setDimension(tasks.origin[0]);
  tasks.start();
  WorldRegister.instance.setDimension(tasks.origin[0]);
  if (
    !WorldRegister.instance.column.get(
      tasks.origin[1],
      tasks.origin[2],
      tasks.origin[2]
    )
  )
    return false;
  const [dimension, cx, cy, cz] = tasks.origin;

  IM._sDataTool.setDimension(dimension);
  const RmaxY = heightMapTool.column.getRelative(tasks.origin);
  const AmaxY = heightMapTool.column.getAbsolute(tasks.origin);

  //fill
  for (let iy = AmaxY; iy < WorldBounds.bounds.MaxY; iy++) {
    for (let iz = cz; iz < cz + WorldSpaces.chunk._bounds.z; iz++) {
      for (let ix = cx; ix < cx + WorldSpaces.chunk._bounds.x; ix++) {
        if (!IM._sDataTool.loadInAt(ix, iy, iz)) continue;
        const l = IM._sDataTool.getLight();
        if (l < 0) continue;
        IM._sDataTool.setLight(IM.lightData.setS(0xf, l)).commit();
      }
    }
  }

  //accumulate
  for (let iy = AmaxY; iy <= RmaxY; iy++) {
    for (let iz = cz; iz < cz + WorldSpaces.chunk._bounds.z; iz++) {
      for (let ix = cx; ix < cx + WorldSpaces.chunk._bounds.x; ix++) {
        if (!IM._sDataTool.loadInAt(ix, iy, iz)) continue;
        const l = IM._sDataTool.getLight();
        if (l < 0 && IM.lightData.getS(l) != 0xf) continue;
        let add = false;
        for (const n of $3dCardinalNeighbors) {
          const nx = ix + n[0];
          const ny = iy + n[1];
          const nz = iz + n[2];
          if (IM._nDataTool.loadInAt(nx, ny, nz)) {
            const nl = IM._nDataTool.getLight();
            if (nl >= 0 && IM.lightData.getS(nl) < 0xf) {
              add = true;
              break;
            }
          }
        }
        if (add) {
          queue.enqueue(ix, iy, iz);
        }
      }
    }
  }

  //flood
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (!node) break;
    if (!IM._sDataTool.loadInAt(node.x, node.y, node.z)) continue;
    const sl = IM._sDataTool.getLight();
    if (sl <= 0) continue;
    const sunL = IM.lightData.getS(sl);
    if (sunL >= 0xf && !inColumnBounds(cx, cz, node.x, node.z)) continue;

    if (IM._nDataTool.loadInAt(node.x - 1, node.y, node.z)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.enqueue(node.x - 1, node.y, node.z);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }

    if (IM._nDataTool.loadInAt(node.x + 1, node.y, node.z)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.enqueue(node.x + 1, node.y, node.z);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }

    if (IM._nDataTool.loadInAt(node.x, node.y, node.z - 1)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.enqueue(node.x, node.y, node.z - 1);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }

    if (IM._nDataTool.loadInAt(node.x, node.y, node.z + 1)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.enqueue(node.x, node.y, node.z + 1);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }

    if (IM._nDataTool.loadInAt(node.x, node.y - 1, node.z)) {
      const nl = IM._nDataTool.getLight();

      if (nl > -1 && IM.lightData.isLessThanForSunAddDown(nl, sl)) {
        if (IM._nDataTool.isAir()) {
          queue.enqueue(node.x, node.y - 1, node.z);
          IM._nDataTool
            .setLight(IM.lightData.getSunLightForUnderVoxel(sl, nl))
            .commit();
        } else {
          if (!IM._nDataTool.isOpaque()) {
            queue.enqueue(node.x, node.y - 1, node.z);
            IM._nDataTool
              .setLight(IM.lightData.getMinusOneForSun(sl, nl))
              .commit();
          }
        }
      }
    }

    if (IM._nDataTool.loadInAt(node.x, node.y + 1, node.z)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.enqueue(node.x, node.y + 1, node.z);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }

    queue.returnNode(node);
  }

  tasks.stop();
}
