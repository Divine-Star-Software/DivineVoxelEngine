"use strict";
/* import type { FlowManager } from "../FlowManager";

export async function RunFlow(
 this: typeof FlowManager,
 x: number,
 y: number,
 z: number
) {
 const check = this.setCurrentVoxel(x, y, z);
 if (!check) return;

 const level = this.getLevel(x, y, z);
 if (level < 0) return;
 const levelState = this.getLevelState(x, y, z);
 this._flowQue.push([x, y, z, level, levelState]);

 while (this._flowQue.length != 0) {
  this.runFlowPropagation();
  this.runFlowIncrease();
  this.runRebuildQue();
  await this.wait(100);
 }
}

export function RunFlowPropagation(this: typeof FlowManager) {
 const que = this._flowQue;
 for (let i = 0; i < que.length; i++) {
  const node = que[i];
  const x = node[0];
  const y = node[1];
  const z = node[2];
  const l = this.getLevel(x, y, z);
  const s = this.getLevelState(x, y, z);

  if (this.canFlowOutwardTest(x, y, z)) {
   const n1 = this.getLevel(x + 1, y, z);
   if (n1 + 2 < l && n1 >= 0) {
    let n1l = l - 2;
    que.push([x + 1, y, z, n1l, 0]);
   }

   const n2 = this.getLevel(x - 1, y, z);

   if (n2 + 2 < l && n2 >= 0) {
    let n2l = l - 2;
    que.push([x - 1, y, z, n2l, 0]);
   }

   const n3 = this.getLevel(x, y, z + 1);
   if (n3 + 2 < l && n3 >= 0) {
    let n3l = l - 2;
    que.push([x, y, z + 1, n3l, 0]);
   }

   const n4 = this.getLevel(x, y, z - 1);
   if (n4 + 2 < l && n4 >= 0) {
    let n4l = l - 2;
    que.push([x, y, z - 1, n4l, 0]);
   }
  }

  const n5 = this.getLevel(x, y - 1, z);
  if (n5 <= l && n5 >= 0) {
   let state = 1;
   let level = 15;
   if (l <= 0 && s != 1) {
    state = 0;
    level = l - 2;
   }
   que.push([x, y - 1, z, level, state]);
  }
 }
}

export function RunFlowIncrease(this: typeof FlowManager) {
 const que = this._flowQue;
 const reque: number[][] = [];
 while (que.length != 0) {
  const node = que.shift();
  if (!node) {
   break;
  }
  const x = node[0];
  const y = node[1];
  const z = node[2];
  const level = node[3];
  const levelState = node[4];
  if (this.inMap(x, y, z)) continue;
  this.addToMap(x, y, z);
  if (level > -1) {
   this.setVoxel(level, levelState, x, y, z);
   reque.push([x, y, z, -1]);
  }

  this.addToRebuildQue(x, y, z);
 }

 this._flowQue = reque;
 this._visitedMap.clear();
}
 */ 
