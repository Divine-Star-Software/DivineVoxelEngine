//types
import type {
 BuildTasks,
 LightUpdateTask,
 UpdateTasks,
} from "Meta/Tasks/Tasks.types.js";
//objects
import { CCM } from "../Threads/Constructor/ConstructorComm.js";
import { ConstructorTasks } from "../Threads/Contracts/ConstructorTasks.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";

const QMBase = {
 $INIT() {
  this.addQueue("main");
 },
 _queueMap: <Map<string | number, number>>new Map(),
 addQueue(queueKey: string | number) {
  if (this._queueMap.has(queueKey)) return false;
  this.rgb.update.addQueue(queueKey);
  this.rgb.remove.addQueue(queueKey);
  this.sun.update.addQueue(queueKey);
  this.sun.remove.addQueue(queueKey);
  this.worldSun.__steps.step1.addQueue(queueKey);
  this.worldSun.__steps.step2.addQueue(queueKey);
  this.worldSun.__steps.step3.addQueue(queueKey);
  this.flow.update.addQueue(queueKey);
  this.flow.remove.addQueue(queueKey);
  this.build.chunk.addQueue(queueKey);
  this.generate.chunk.addQueue(queueKey);
  this._queueMap.set(queueKey, Date.now());
  return true;
 },
 removeQueue(queueKey: string | number) {
  if (!this._queueMap.has(queueKey)) return false;
  this.rgb.update.removeQueue(queueKey);
  this.rgb.remove.removeQueue(queueKey);
  this.sun.update.removeQueue(queueKey);
  this.sun.remove.removeQueue(queueKey);
  this.worldSun.__steps.step1.removeQueue(queueKey);
  this.worldSun.__steps.step2.removeQueue(queueKey);
  this.worldSun.__steps.step3.removeQueue(queueKey);
  this.flow.update.removeQueue(queueKey);
  this.flow.remove.removeQueue(queueKey);
  this.build.chunk.addQueue(queueKey);
  this.generate.chunk.removeQueue(queueKey);
  this._queueMap.delete(queueKey);
  return true;
 },
 /**# Filter Queues
  * ---
  * Go through each current queue. IF the passed fucntion returns false it will remove that queue.
  * @param filter
  */
 filterQueues(filter: (queueKey: string | number) => boolean) {
  this._queueMap.forEach((v, key) => {
   if (!filter(key)) {
    this.removeQueue(key);
   }
  });
 },
 /**# Filter Old Queues
  * ---
  * Will remove queues older then 10 minutes.
  * @param maxTime Max time in miliseconds.
  */
 filterOldQueues(maxTime = 600000) {
  const t = Date.now();
  this._queueMap.forEach((v, key) => {
    console.log(t - v);
    console.log(key);
   if (t - v > maxTime) {
    console.log(key);
    this.removeQueue(key);
   }
  });
 },
 rgb: {
  update: CCM.addQueue<UpdateTasks>(
   "rgb-update",
   ConstructorTasks.RGBlightUpdate,
   null
  ),
  remove: CCM.addQueue<UpdateTasks>(
   "rgb-remove",
   ConstructorTasks.RGBlightRemove
  ),
 },
 worldSun: {
  add(x: number, z: number, queueId: string = "main") {
   QMBase.worldSun.__steps.step1.add([x, z, 0], queueId);
  },
  async run() {
   await QMBase.worldSun.__steps.step1.runAndAwait();
   await QMBase.worldSun.__steps.step2.runAndAwait();
   await QMBase.worldSun.__steps.step3.runAndAwait();
  },
  __steps: {
   step1: CCM.addQueue<[number, number, number]>(
    "sun-fill",
    ConstructorTasks.worldSunStep1,
    null,
    (data) => {
     const x = data[0];
     const z = data[1];
     WorldRegister.column.fill(0, x, z);
     const maxY = WorldRegister.column.height.getRelative("main", x, z);
     data[2] = maxY;
     QMBase.worldSun.__steps.step2.add([x, z, maxY, -1]);
     return data;
    }
   ),
   step2: CCM.addQueue<[number, number, number, number]>(
    "sun-column-update",
    ConstructorTasks.worldSunStep2,
    null,
    (data) => {
     QMBase.worldSun.__steps.step3.add(data);
     return data;
    },
    (data, thread) => {
     data[3] = thread;
    }
   ),
   step3: CCM.addQueue<[number, number, number, number]>(
    "sun-column-flood",
    ConstructorTasks.worldSunStep3,
    null,
    (d) => d,
    (d, t) => {},
    (data) => {
     return data[3];
    }
   ),
  },
 },
 sun: {
  update: CCM.addQueue<UpdateTasks>(
   "sun-update",
   ConstructorTasks.sunLightUpdate
  ),
  remove: CCM.addQueue<UpdateTasks>(
   "sun-remove",
   ConstructorTasks.sunLightRemove
  ),
 },
 flow: {
  update: CCM.addQueue<UpdateTasks>("flow-update", ConstructorTasks.flowUpdate),
  remove: CCM.addQueue<UpdateTasks>("flow-remove", ConstructorTasks.flowRemove),
 },
 build: {
  chunk: CCM.addQueue<BuildTasks>("build-chunk", ConstructorTasks.buildChunk),
 },
 generate: {
  chunk: CCM.addQueue<LightUpdateTask>(
   "generate-chunk",
   ConstructorTasks.generate
  ),
 },
};

export const ConstructorQueues = QMBase;
