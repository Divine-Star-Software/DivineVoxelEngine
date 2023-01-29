import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import type {
 AddToRebuildQueue,
 Priorities,
 RunRebuildTasks,
} from "Meta/Tasks/Tasks.types";
import { ConstructorRemoteThreadTasks } from "../../Common/Threads/Contracts/WorldTasks.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { $3dMooreNeighborhood } from "../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import type { CommBase } from "../../Libs/ThreadComm/Comm/Comm";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { Builder } from "../../Constructor/Builder/Builder.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { VisitedMap } from "../../Global/Util/VisistedMap.js";

const chunkTool = new ChunkDataTool();
type RebuildModes = "sync" | "async";
class Request<T, Q> {
 rebuildQueMap: Map<string, boolean> = new Map();
 comm: CommBase;
 priority: Priorities = 2;
 LOD = 0;
 syncQueue: LocationData[] = [];
 buildMode: RebuildModes = "sync";

 rebuildTasks: AddToRebuildQueue;
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

  this.rebuildTasks = [this.origin, this.buildQueue, this.priority];
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
  const chunkKey = WorldSpaces.chunk.getKeyLocation(chunkTool.location);
  if (this.rebuildQueMap.has(chunkKey)) return false;
  this.rebuildQueMap.set(chunkKey, true);
  if (this.buildMode == "async") {
   this.rebuildTasks[0] = [...chunkTool.location];
   this.comm.runTasks<AddToRebuildQueue>(
    ConstructorRemoteThreadTasks.addToRebuildQue,
    this.rebuildTasks
   );
   return true;
  }
  this.syncQueue.push([...chunkTool.location]);
  return true;
 }

 addNeighborsToRebuildQueue(x: number, y: number, z: number) {
  if (!this.needsRebuild()) return false;
  const voxelPOS = WorldSpaces.voxel.getPositionXYZ(x, y, z);
  if (
   voxelPOS.x == 0 ||
   voxelPOS.x == WorldSpaces.chunk._bounds.x - 1 ||
   voxelPOS.y == 0 ||
   voxelPOS.y == WorldSpaces.chunk._bounds.y - 1 ||
   voxelPOS.z == 0 ||
   voxelPOS.z == WorldSpaces.chunk._bounds.z - 1
  ) {
   let i = $3dMooreNeighborhood.length;
   while (i--) {
    this.addToRebuildQueue(
     x + $3dMooreNeighborhood[i][0],
     y + $3dMooreNeighborhood[i][1],
     z + $3dMooreNeighborhood[i][2]
    );
   }
   return;
  }
  this.addToRebuildQueue(x, y, z);
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
  return new Request("world-sun", origin, null, buildQueue, originThread, {
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
