import { Thread, ThreadPool, ThreadPortTypes, Threads } from "@amodx/threads";
export abstract class ThreadManager {
  threadMap = new Map<string, Thread | ThreadPool>();
  _threads: (Thread | ThreadPool)[] = [];

  constructor() {
    self.addEventListener("beforeunload", () => {
      for (const thread of this._threads) {
        if (thread instanceof ThreadPool) {
          thread.destroyAll();
        }
        if (thread instanceof Thread) {
          thread.destroy();
        }
      }
    });
  }

  setThreadPort(id: string, ports: ThreadPortTypes | ThreadPortTypes[]) {
    const thread = this.getThread(id);
    if (thread instanceof ThreadPool) {
      if (!Array.isArray(ports))
        throw new Error("Thread is a pool and needs an array of ports");
      for (const port of ports) {
        thread.addPort(port);
      }
      return;
    }
    if (thread instanceof Thread) {
      if (Array.isArray(ports))
        throw new Error("Thread is a single thread and needs one port.");
      thread.setPort(ports);
    }
  }
  addThread(thread: Thread | ThreadPool) {
    this.threadMap.set(thread.name, thread);
    this._threads.push(thread);
  }
  getThread(id: string): Thread | ThreadPool {
    const thread = this.threadMap.get(id);
    if (!thread) throw new Error(`Thread with id ${id} does not exists`);
    return thread;
  }
}
