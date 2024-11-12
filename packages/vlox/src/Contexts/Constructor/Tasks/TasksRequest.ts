import type { LocationData } from "../../../Math";
import type {
  AddToRebuildQueue,
  BuildTasks,
  Priorities,
  PriorityTask,
  RunRebuildTasks,
} from "../../../Types/Tasks.types";
import { ConstructorRemoteThreadTasks } from "./ConstructorRemoteThreadTasks";
import { EngineSettings } from "../../../Data/Settings/EngineSettings.js";
import { Thread, Threads } from "@amodx/threads/";
import { $3dMooreNeighborhood } from "../../../Math/Constants/CardinalNeighbors.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces";

import { WorldRegister } from "../../../Data/World/WorldRegister.js";

import { ChunkDataTool } from "../../../Tools/Data/WorldData/ChunkDataTool";
import { VisitedMap } from "../../../Util/VisistedMap";
import { DivineVoxelEngineConstructor } from "../../../Contexts/Constructor/DivineVoxelEngineConstructor";
import { Vec3Array } from "@amodx/math";

const chunkTool = new ChunkDataTool();
type RebuildModes = "sync" | "async";
class Request<T, Q> {
  rebuildQueMap: Map<string, boolean> = new Map();
  comm: Thread;
  priority: Priorities = 2;
  LOD = 0;
  syncQueue: LocationData[] = [];
  aSyncQueue: LocationData[] = [];
  buildMode: RebuildModes = "sync";

  buildTasks: PriorityTask<BuildTasks> = {
    data: [["main", 0, 0, 0], 1],
    priority: 0,
  };

  trackedChunks = new Map<string, Vec3Array>();
  keepTrackOfChunks = false;

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
      this.comm = Threads.getThread(originThread)!;
    }

    this.rebuildTasks = [this.origin, this.buildQueue, this.priority];
    return this;
  }

  start() {
    WorldRegister.instance.cache.enable();
    return this;
  }
  stop() {
    WorldRegister.instance.cache.disable();
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

  clearBuildQueue() {
    this.trackedChunks.clear();
    this.rebuildQueMap.clear();
    this.aSyncQueue = [];
    this.syncQueue = [];
  }

  setBuldMode(mode: RebuildModes) {
    this.buildMode = mode;
    return this;
  }

  addToRebuildQueue(x: number, y: number, z: number) {
    if (EngineSettings.isServer()) return false;
    if (!this.needsRebuild() && !this.keepTrackOfChunks) return false;
    if (!chunkTool.setDimension(this.origin[0]).loadInAt(x, y, z)) return false;
    const chunkKey = WorldSpaces.chunk.getKeyXYZ(x, y, z);
    if (this.rebuildQueMap.has(chunkKey)) return false;
    this.rebuildQueMap.set(chunkKey, true);
    const chunkPOS = WorldSpaces.chunk.getPosition();
    if (this.keepTrackOfChunks) {
      !this.trackedChunks.has(chunkKey) &&
        this.trackedChunks.set(chunkKey, [chunkPOS.x, chunkPOS.y, chunkPOS.z]);
    }
    if (this.needsRebuild()) {
      if (this.buildMode == "async") {
        this.aSyncQueue.push([
          this.origin[0],
          chunkPOS.x,
          chunkPOS.y,
          chunkPOS.z,
        ]);
        return true;
      }
      this.syncQueue.push([this.origin[0], chunkPOS.x, chunkPOS.y, chunkPOS.z]);
      return true;
    }
    return false;
  }

  addNeighborsToRebuildQueue(x: number, y: number, z: number) {
    if (!this.needsRebuild() && !this.keepTrackOfChunks) return false;
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
    while (this.aSyncQueue.length !== 0) {
      const node = this.aSyncQueue.shift();
      this.buildTasks.priority = this.priority;
      if (!node) break;
      this.buildTasks.data[0] = node;
      this.comm.runTasks<PriorityTask<BuildTasks>>(
        ConstructorRemoteThreadTasks.BuildChunk,
        this.buildTasks
      );
    }
    while (this.syncQueue.length !== 0) {
      const node = this.syncQueue.shift();
      if (!node) break;
      DivineVoxelEngineConstructor.instance.mesher.meshChunk(node, 1, 0);
    }
    this.rebuildQueMap.clear();
    return this;
  }

  clear() {
    this.buildTasks.priority = 0;
    this.syncQueue = [];
    this.aSyncQueue = [];
    this.rebuildQueMap.clear();
    this.buildMode = "sync";
  }
}

type ArrayOfVec3Arrays = [x: number, y: number, z: number][];
type FlowVec3Array = number[][];

const getLightQueues = () => {
  return {
    rgb: {
      update: <number[]>[],
      remove: <number[]>[],
      map: new VisitedMap(),
    },
    sun: {
      update: <number[]>[],
      remove: <number[]>[],
      updateMap: new VisitedMap(),
      remvoeMap: new VisitedMap(),
    },
  };
};

const getFlowQueues = () => {
  return {
    update: {
      queue: <FlowVec3Array>[],
      map: new VisitedMap(),
    },
    remove: {
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
    queue: <ArrayOfVec3Arrays>[],
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
      sun: <number[]>[],
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
