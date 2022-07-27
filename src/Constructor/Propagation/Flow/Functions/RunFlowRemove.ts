import { DVEC } from "../../../DivineVoxelEngineConstructor.js";
import type { FlowManager } from "../FlowManager";

export async function RunFlowRemove(
 this: typeof FlowManager,
 x: number,
 y: number,
 z: number
) {
 const check = this.setCurrentVoxel(x, y, z);
 if (!check) return;

 this.runRemoveCheck(x, y, z);

 this.removeVoxel(x, y, z);
 while (this._flowRemoveQue.length != 0) {
  this.runRemovePropagation();
  this.runFlowReduce();
  this.runFlowNoChunkRebuild();
  this.runRebuildQue();
  await this.wait(100);
 }
}

export async function RunRemovePropagation(this: typeof FlowManager) {
 const que = this._flowRemoveQue;
 for (let i = 0; i < que.length; i++) {
  const node = que[i];
  const x = node[0];
  const y = node[1];
  const z = node[2];
  const l = this.getLevel(x, y, z);
  this.addToMap(x, y, z);

  if (!this.inMap(x + 1, y, z)) {
   const n1 = this.getLevel(x + 1, y, z);
   const n1s = this.getLevelState(x + 1, y, z);
   if (((n1 == l || n1 < 2) && n1 > 0) || n1s == 1) {
    this._flowRemoveQue.push([x + 1, y, z]);
   }
   if (n1 >= l) {
    this._flowQue.push([x + 1, y, z]);
   }
  }
  if (!this.inMap(x - 1, y, z)) {
   const n2 = this.getLevel(x - 1, y, z);
   const n2s = this.getLevelState(x - 1, y, z);
   if (((n2 == l || n2 < 2) && n2 > 0) || n2s == 1) {
    this._flowRemoveQue.push([x - 1, y, z]);
   }
   if (n2 >= l) {
    this._flowQue.push([x - 1, y, z]);
   }
  }

  if (!this.inMap(x, y, z + 1)) {
   const n3 = this.getLevel(x, y, z + 1);
   const n3s = this.getLevelState(x, y, z + 1);
   if (((n3 == l || n3 < 2) && n3 > 0) || n3s == 1) {
    this._flowRemoveQue.push([x, y, z + 1]);
   }
   if (n3 >= l) {
    this._flowQue.push([x, y, z + 1]);
   }
  }

  if (!this.inMap(x, y, z - 1)) {
   const n4 = this.getLevel(x, y, z - 1);
   const n4s = this.getLevelState(x, y, z - 1);
   if (((n4 == l || n4 < 2) && n4 > 0) || n4s == 1) {
    this._flowRemoveQue.push([x, y, z - 1]);
   }

   if (n4 >= l) {
    this._flowQue.push([x, y, z - 1]);
   }
  }

  if (!this.inMap(x, y - 1, z)) {
   const n5 = this.getLevel(x, y - 1, z);
   const n5s = this.getLevelState(x, y - 1, z);
   // if (((n5 == l || n5 < 2) && n5 > 0) || n5s == 1) {
   if (n5s == 1 && l > -1 && l == 1) {
    this._flowRemoveQue.push([x, y - 1, z]);
   }

   if (n5 >= l) {
    //   this._flowQue.push([x, y - 1, z]);
   }
  }
 }
 this._visitedMap = {};
}

export async function RunFlowReduce(this: typeof FlowManager) {
 const que = this._flowRemoveQue;
 const reque: number[][] = [];
 while (que.length != 0) {
  const node = que.shift();
  if (!node) {
   break;
  }
  const x = node[0];
  const y = node[1];
  const z = node[2];
  if (this.inMap(x, y, z)) continue;
  this.addToMap(x, y, z);

  const l = this.getLevel(x, y, z);
  const state = this.getLevelState(x, y, z);
  let syncRebuild = false;

  if (l < 2) {
   if (Math.random() < 0.5 || state == 1) {
    this.removeVoxel(x, y, z);
    if (state == 1) syncRebuild = true;
   } else {
    reque.push([x, y, z]);
   }
  } else {
   this.setLevel(l - 2, x, y, z);
   reque.push([x, y, z]);
  }

  this.addToRebuildQue(x, y, z, syncRebuild);
 }

 this._flowRemoveQue = reque;
 this._visitedMap = {};
}
