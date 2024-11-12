//types
import { ThreadPool } from "@amodx/threads";
//objects
import { ConstructorTasksIds } from "./ConstructorTasksIds.js";
import { QueueManager } from "@amodx/threads/Queue/QueueManager";
import { Observable } from "@amodx/core/Observers/Observable.js";

export class DVEConstructorTasksQueues {
  static instance: DVEConstructorTasksQueues;
  static onCreated = new Observable<DVEConstructorTasksQueues>();
  constructor(public constructors: ThreadPool) {
    if (!DVEConstructorTasksQueues.instance)
      DVEConstructorTasksQueues.instance = this;
    this.registerTasks("build-chunk", ConstructorTasksIds.BuildChunk);
    DVEConstructorTasksQueues.onCreated.notify(this);
    this.addQueue("main");
  }

  _queueMap = new Map<string | number, number>();
  addQueue(queueKey: string | number) {
    if (this._queueMap.has(queueKey)) {
      this._queueMap.set(queueKey, Date.now());
      return false;
    }
    for (const [key, queue] of this._tasks) {
      queue.addQueue(queueKey);
    }

    this._queueMap.set(queueKey, Date.now());
    return true;
  }
  removeQueue(queueKey: string | number) {
    if (!this._queueMap.has(queueKey)) return false;
    for (const [key, queue] of this._tasks) {
      queue.removeQueue(queueKey);
    }
    this._queueMap.delete(queueKey);
    return true;
  }
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
  }
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
  }

  registerTasks(id: string, tasksId: number | string) {
    const newTasks = this.constructors.addQueue(id, tasksId);
    this._tasks.set(id, newTasks);
  }

  getTasks(id: string) {
    const tasks = this._tasks.get(id);
    if (!tasks) throw new Error(`The queue with the ${id} does not exist`);
    return tasks;
  }

  _tasks = new Map<string, QueueManager<any>>();
}
