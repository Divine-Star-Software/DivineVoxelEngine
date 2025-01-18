import { Thread, ThreadPool, CommPortTypes, Threads } from "@amodx/threads";
import { Pipeline } from "@amodx/core/Pipelines";
import { ThreadState } from "./ThreadState";

export abstract class ThreadManager {
  pipelines = {
    setPorts: new Pipeline<ThreadManager>(),
    init: new Pipeline<ThreadManager>(),
  };
  commMap = new Map<string, Thread | ThreadPool>();
  comms: (Thread | ThreadPool)[] = [];

  abstract state: ThreadState;
  async init() {
    await this.pipelines.init.pipe(this);
  }

  setThreadPort(id: string, ports: CommPortTypes | CommPortTypes[]) {
    const comm = this.getThread(id);
    let error;
    if (Array.isArray(ports) && comm instanceof ThreadPool) {
      comm.addPorts(ports);
      return;
    } else
      error =
        "Comm is an instance of comm manager and the passed in ports was not an array.";
    if (!Array.isArray(ports) && comm instanceof Thread) {
      comm.setPort(ports);
      return;
    } else
      error =
        "Comm is an instance of comm base and the passed in ports was an array.";
    throw new Error(error);
  }
  addThread(comm: Thread | ThreadPool) {
    this.commMap.set(comm.name, comm);
    this.comms.push(comm);
  }
  getThread(id: string): Thread | ThreadPool {
    const comm = this.commMap.get(id);
    if (!comm) throw new Error(`Comm with id ${id} does not exists`);
    return comm;
  }
}
