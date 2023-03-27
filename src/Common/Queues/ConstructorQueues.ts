//types
import {
 BuildTasks,
 GenerateTasks,
 UpdateTasks,
 PriorityTask,
} from "Meta/Tasks/Tasks.types.js";
//objects
import { CCM } from "../../World/Threads/WorldThreads.js";
import { ConstructorTasks } from "../Threads/Contracts/ConstructorTasks.js";

const QMBase = {
 $INIT() {
  this.addQueue("main");
 },
 _queueMap: <Map<string | number, number>>new Map(),
 addQueue(queueKey: string | number) {
  if (this._queueMap.has(queueKey)) {
   this._queueMap.set(queueKey, Date.now());
   return false;
  }
  this.worldSun.addQueue(queueKey);
  this.propagation.addQueue(queueKey);
  this.build.chunk.addQueue(queueKey);
  this.generate.addQueue(queueKey);
  this._queueMap.set(queueKey, Date.now());
  return true;
 },
 removeQueue(queueKey: string | number) {
  if (!this._queueMap.has(queueKey)) return false;
  this.worldSun.removeQueue(queueKey);
  this.propagation.addQueue(queueKey);
  this.build.chunk.addQueue(queueKey);
  this.generate.removeQueue(queueKey);
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
   if (t - v > maxTime) {
    this.removeQueue(key);
   }
  });
 },
 worldSun: CCM.addQueue<UpdateTasks>("world-sun", ConstructorTasks.worldSun),
 propagation: CCM.addQueue<UpdateTasks>(
  "propagation",
  ConstructorTasks.analyzerPropagation
 ),
 build: {
  chunk: CCM.addQueue<PriorityTask<BuildTasks>>(
   "build-chunk",
   ConstructorTasks.buildChunk
  ),
 },
 generate: CCM.addQueue<GenerateTasks>("generatek", ConstructorTasks.generate),
 decorate: CCM.addQueue<GenerateTasks>("decorate", ConstructorTasks.decorate),
};

export const ConstructorQueues = QMBase;
