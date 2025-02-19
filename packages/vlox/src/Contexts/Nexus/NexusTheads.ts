import { Threads } from "@amodx/threads/";
import { ThreadManager } from "../Base/ThreadManager.js";

export const parent = Threads.parent;
export const Richworld = Threads.createThread("rich-world");
export const world = Threads.createThread("world");

export class NexusThreads extends ThreadManager {
  parent = Threads.parent;
  world = Threads.createThread("world");
  NexusComm = Threads.createThread("nexus");
  DataComm = Threads.createThread("data-loader");
  ConstructorComm = Threads.createThreadPool("generator");
}
