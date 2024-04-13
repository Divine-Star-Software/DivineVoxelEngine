//types
import {
  BuildTasks,
  GenerateTasks,
  UpdateTasks,
  PriorityTask,
} from "../../../Types/Tasks.types";
//objects
import { ConstructorTasksIds } from "../../Common/ConstructorTasksIds.js";
import { DVEFWorldCore } from "../DVEFWorldCore";
import { QueueManager } from "@divinestar/threads/Queue/QueueManager";

export class DVEFoundationTasksQueues {
  init(dve: DVEFWorldCore) {

    const constructors = dve.threads.constructors;

    this.worldSun = constructors.addQueue<UpdateTasks>(
      "world-sun",
      ConstructorTasksIds.WorldSun
    );
    this.propagation = constructors.addQueue<UpdateTasks>(
      "propagation",
      ConstructorTasksIds.AnalyzerPropagation
    );

    (this.buildChunk = constructors.addQueue<PriorityTask<BuildTasks>>(
      "build-chunk",
      ConstructorTasksIds.BuildChunk
    )),
      (this.generate = constructors.addQueue<GenerateTasks>(
        "generatek",
        ConstructorTasksIds.Generate
      ));
    this.decorate = constructors.addQueue<GenerateTasks>(
      "decorate",
      ConstructorTasksIds.Decorate
    );

    this.addQueue("main");

  }
  _queueMap = new Map<string | number, number>();
  addQueue(queueKey: string | number) {
    if (this._queueMap.has(queueKey)) {
      this._queueMap.set(queueKey, Date.now());
      return false;
    }
    this.worldSun.addQueue(queueKey);
    this.propagation.addQueue(queueKey);
    this.buildChunk.addQueue(queueKey);
    this.generate.addQueue(queueKey);
    this.decorate.addQueue(queueKey);
    this._queueMap.set(queueKey, Date.now());
    return true;
  }
  removeQueue(queueKey: string | number) {
    if (!this._queueMap.has(queueKey)) return false;
    this.worldSun.removeQueue(queueKey);
    this.propagation.addQueue(queueKey);
    this.buildChunk.addQueue(queueKey);
    this.generate.removeQueue(queueKey);
    this.decorate.addQueue(queueKey);
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

  worldSun: QueueManager<UpdateTasks>;
  propagation: QueueManager<UpdateTasks>;
  buildChunk: QueueManager<PriorityTask<BuildTasks>>;
  generate: QueueManager<GenerateTasks>;
  decorate: QueueManager<GenerateTasks>;
}
