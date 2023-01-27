import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import type {
 AddToRebuildQueue,
 Priorities,
 RunRebuildTasks,
} from "Meta/Tasks/Tasks.types";
import { ConstructorRemoteThreadTasks } from "../../Common/Threads/Contracts/WorldTasks.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import {
 $3dCardinalNeighbors,
 $3dMooreNeighborhood,
} from "../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import type { CommBase } from "../../Libs/ThreadComm/Comm/Comm";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { Builder } from "../../Constructor/Builder/Builder.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";

const chunkTool = new ChunkDataTool();
type RebuildModes = "sync" | "async";
class Request<T, Q> {
 rebuildQueMap: Map<string, boolean> = new Map();
 comm: CommBase;
 priority: Priorities = 2;
 LOD = 0;
 syncQueue: LocationData[] = [];
 buildMode: RebuildModes = "sync";
 constructor(
  public tasksType: string,
  public origin: LocationData,
  public data: T,
  public buildQueue = "none",
  public originThread = "self",
  public queues: Q
 ) {
  if (originThread != "self") {
   this.comm = ThreadComm.getComm(originThread);
  }
  return this;
 }

 start() {
  WorldRegister.cache.enable();
  return this;
 }
 stop() {
  WorldRegister.cache.disable();
  return this;
 }

 setPriority(priority: Priorities) {
  this.priority = priority;
  return this;
 }

 getData(): T {
  return <T>this.data;
 }
 getOriginThread() {
  return this.origin;
 }
 getBuildQueue() {
  return this.buildQueue;
 }
 getOrigin() {
  return this.origin;
 }
 needsRebuild() {
  return this.buildQueue != "none";
 }
 needsToUpdateOriginThread() {
  return this.originThread != "self";
 }

 setBuldMode(mode: RebuildModes) {
  this.buildMode = mode;
  return this;
 }

 addToRebuildQueue(x: number, y: number, z: number) {
  if (EngineSettings.isServer()) return false;
  if (!this.needsRebuild()) return false;
  if (!chunkTool.setDimension(this.origin[0]).loadInAt(x, y, z)) return false;
  const chunkPOS = WorldSpaces.chunk.getPositionXYZ(x, y, z);
  const chunkKey = WorldSpaces.chunk.getKey();
  if (this.rebuildQueMap.has(chunkKey)) return false;
  this.rebuildQueMap.set(chunkKey, true);
  if (this.buildMode == "async") {
   this.comm.runTasks<AddToRebuildQueue>(
    ConstructorRemoteThreadTasks.addToRebuildQue,
    [
     [this.origin[0], chunkPOS.x, chunkPOS.y, chunkPOS.z],
     this.buildQueue,
     this.priority,
    ]
   );
   return true;
  }
  if (this.buildMode == "sync") {
   this.syncQueue.push([this.origin[0], chunkPOS.x, chunkPOS.y, chunkPOS.z]);
  }
  return true;
 }

 addNeighborsToRebuildQueue(x: number, y: number, z: number) {
  for (const n of $3dMooreNeighborhood) {
   this.addToRebuildQueue(x + n[0], y + n[1], z + n[2]);
  }
  return this;
 }

 runRebuildQueue() {
  this.comm.runTasks<RunRebuildTasks>(
   ConstructorRemoteThreadTasks.runRebuildQue,
   [this.buildQueue]
  );
  while (this.syncQueue.length !== 0) {
   const node = this.syncQueue.shift();
   if (!node) break;
   Builder.buildChunk(node);
  }
  this.rebuildQueMap.clear();
  return this;
 }
}

class VisitedMap {
 _map: Map<string, boolean> = new Map();
 _getKey(x: number, y: number, z: number) {
  return `${x}_${y}_${z}`;
 }
 inMap(x: number, y: number, z: number) {
  return this._map.has(this._getKey(x, y, z));
 }
 add(x: number, y: number, z: number) {
  this._map.set(this._getKey(x, y, z), true);
 }
 clear() {
  this._map.clear();
 }
}

type Vec3Array = [x: number, y: number, z: number][];
type FlowVec3Array = number[][];

const getLightQueues = () => {
 return {
  rgb: {
   update: <Vec3Array>[],
   rmeove: <Vec3Array>[],
   map: new VisitedMap(),
  },
  sun: {
   update: <Vec3Array>[],
   rmeove: <Vec3Array>[],
  },
 };
};

const getFlowQueues = () => {
 return {
  update: {
   queue: <FlowVec3Array>[],
   map: new VisitedMap(),
  },
  rmeove: {
   queue: <FlowVec3Array>[],
   map: new VisitedMap(),
   noRemoveMap: new VisitedMap(),
  },
 };
};

const getVoxelUpdateQueueData = () => {
 return { ...getLightQueues(), flow: getFlowQueues() };
};

const getExplosionQueuesData = () => {
 return {
  queue: <Vec3Array>[],
  map: new VisitedMap(),
  ...getLightQueues(),
  flow: getFlowQueues(),
 };
};

export const TasksRequest = {
 getLightUpdateRequest(
  origin: LocationData,
  buildQueue = "none",
  originThread = "self"
 ) {
  return new Request<any, ReturnType<typeof getLightQueues>>(
   "light-update",
   origin,
   null,
   buildQueue,
   originThread,
   getLightQueues()
  );
 },
 getFlowUpdateRequest(
  origin: LocationData,
  buildQueue = "none",
  originThread = "self"
 ) {
  return new Request(
   "flow-update",
   origin,
   null,
   buildQueue,
   originThread,
   getVoxelUpdateQueueData()
  );
 },
 getVoxelUpdateRequests(
  origin: LocationData,
  buildQueue = "none",
  originThread = "self"
 ) {
  return new Request(
   "voxel-update",
   origin,
   null,
   buildQueue,
   originThread,
   getVoxelUpdateQueueData()
  );
 },
 getWorldSunRequests(
  origin: LocationData,
  buildQueue = "none",
  originThread = "self"
 ) {
  return new Request("world-sun", origin, null, "none", originThread, {
   sun: <Vec3Array>[],
  });
 },
 getExplosionRequests(
  origin: LocationData,
  radius: number,
  buildQueue = "none",
  originThread = "self"
 ) {
  return new Request<number, ReturnType<typeof getExplosionQueuesData>>(
   "voxel-update",
   origin,
   radius,
   buildQueue,
   originThread,
   getExplosionQueuesData()
  );
 },
};
export type ExplosionTaskRequests = ReturnType<
 typeof TasksRequest.getExplosionRequests
>;
export type VoxelUpdateTaskRequest = ReturnType<
 typeof TasksRequest.getVoxelUpdateRequests
>;
export type FlowTaskRequests = ReturnType<
 typeof TasksRequest.getFlowUpdateRequest
>;
export type LightTaskRequest = ReturnType<
 typeof TasksRequest.getLightUpdateRequest
>;
export type WorldSunTaskRequest = ReturnType<
 typeof TasksRequest.getWorldSunRequests
>;
