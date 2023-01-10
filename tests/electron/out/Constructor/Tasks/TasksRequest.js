import { ConstructorRemoteThreadTasks } from "../../Common/Threads/Contracts/WorldTasks.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { $3dCardinalNeighbors } from "../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { Builder } from "../../Constructor/Builder/Builder.js";
class Request {
    tasksType;
    origin;
    data;
    buildQueue;
    originThread;
    queues;
    rebuildQueMap = new Map();
    comm;
    priority = 2;
    LOD = 0;
    syncQueue = [];
    buildMode = "sync";
    constructor(tasksType, origin, data, buildQueue = "none", originThread = "self", queues) {
        this.tasksType = tasksType;
        this.origin = origin;
        this.data = data;
        this.buildQueue = buildQueue;
        this.originThread = originThread;
        this.queues = queues;
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
    setPriority(priority) {
        this.priority = priority;
        return this;
    }
    getData() {
        return this.data;
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
    setBuldMode(mode) {
        this.buildMode = mode;
        return this;
    }
    addToRebuildQueue(x, y, z) {
        if (EngineSettings.settings.server.enabled)
            return false;
        if (!this.needsRebuild())
            return false;
        const chunkPOS = WorldSpaces.chunk.getPositionXYZ(x, y, z);
        const chunkKey = WorldSpaces.chunk.getKey();
        if (this.rebuildQueMap.has(chunkKey))
            return false;
        this.rebuildQueMap.set(chunkKey, true);
        if (this.buildMode == "async") {
            this.comm.runTasks(ConstructorRemoteThreadTasks.addToRebuildQue, [
                [this.origin[0], chunkPOS.x, chunkPOS.y, chunkPOS.z],
                this.buildQueue,
                this.priority,
            ]);
            return true;
        }
        if (this.buildMode == "sync") {
            this.syncQueue.push([chunkPOS.x, chunkPOS.y, chunkPOS.z]);
        }
        return true;
    }
    addNeighborsToRebuildQueue(x, y, z) {
        for (const n of $3dCardinalNeighbors) {
            this.addToRebuildQueue(x + n[0], y + n[1], z + n[2]);
        }
        return this;
    }
    runRebuildQueue() {
        this.comm.runTasks(ConstructorRemoteThreadTasks.runRebuildQue, [this.buildQueue]);
        while (this.syncQueue.length !== 0) {
            const node = this.syncQueue.shift();
            if (!node)
                break;
            const x = node[0];
            const y = node[1];
            const z = node[2];
            Builder.buildChunk(this.origin[0], x, y, z);
        }
        this.rebuildQueMap.clear();
        return this;
    }
}
class VisitedMap {
    _map = new Map();
    _getKey(x, y, z) {
        return `${x}_${y}_${z}`;
    }
    inMap(x, y, z) {
        return this._map.has(this._getKey(x, y, z));
    }
    add(x, y, z) {
        this._map.set(this._getKey(x, y, z), true);
    }
    clear() {
        this._map.clear();
    }
}
const getLightQueues = () => {
    return {
        rgb: {
            update: [],
            rmeove: [],
        },
        sun: {
            update: [],
            rmeove: [],
        },
    };
};
const getFlowQueues = () => {
    return {
        update: {
            queue: [],
            map: new VisitedMap(),
        },
        rmeove: {
            queue: [],
            map: new VisitedMap(),
            noRemoveMap: new VisitedMap(),
        },
    };
};
const getVoxelUpdateQueueData = () => {
    return { ...getLightQueues(), flow: getFlowQueues() };
};
const getExplosionQueuesData = () => {
    return { queue: [], map: new VisitedMap(), ...getLightQueues(), flow: getFlowQueues() };
};
export const TasksRequest = {
    getLightUpdateRequest(origin, buildQueue = "none", originThread = "self") {
        return new Request("light-update", origin, null, buildQueue, originThread, getLightQueues());
    },
    getFlowUpdateRequest(origin, buildQueue = "none", originThread = "self") {
        return new Request("flow-update", origin, null, buildQueue, originThread, getVoxelUpdateQueueData());
    },
    getVoxelUpdateRequests(origin, buildQueue = "none", originThread = "self") {
        return new Request("voxel-update", origin, null, buildQueue, originThread, getVoxelUpdateQueueData());
    },
    getWorldSunRequests(origin, buildQueue = "none", originThread = "self") {
        return new Request("world-sun", origin, null, "none", originThread, {
            sun: [],
        });
    },
    getExplosionRequests(origin, radius, buildQueue = "none", originThread = "self") {
        return new Request("voxel-update", origin, radius, buildQueue, originThread, getExplosionQueuesData());
    },
};
