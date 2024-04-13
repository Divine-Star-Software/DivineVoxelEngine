import { CommBase, CommManager, CommPortTypes } from "@divinestar/threads";
import { AsyncPipeline } from "@divinestar/utils/Pipelines";
import { ThreadState } from "./ThreadState";

export abstract class ThreadManager {
  pipelines = {
    setPorts: new AsyncPipeline<ThreadManager>(),
    init: new AsyncPipeline<ThreadManager>(),
  };
  commMap = new Map<string, CommBase | CommManager>();
  comms: (CommBase | CommManager)[] = [];

  abstract state: ThreadState;
  async init() {
    await this.pipelines.init.pipe(this);
  }

  setCommPort(id: string, ports: CommPortTypes | CommPortTypes[]) {
    const comm = this.getComm(id);
    let error;
    if (Array.isArray(ports) && comm instanceof CommManager) {
      comm.addPorts(ports);
      return;
    } else
      error =
        "Comm is an instance of comm manager and the passed in ports was not an array.";
    if (!Array.isArray(ports) && comm instanceof CommBase) {
      comm.setPort(ports);
      return;
    } else
      error =
        "Comm is an instance of comm base and the passed in ports was an array.";
    throw new Error(error);
  }
  addComm(comm: CommBase | CommManager) {
    this.commMap.set(comm.name, comm);
    this.comms.push(comm);
  }
  getComm(id: string): CommBase | CommManager {
    const comm = this.commMap.get(id);
    if (!comm) throw new Error(`Comm with id ${id} does not exists`);
    return comm;
  }
}
