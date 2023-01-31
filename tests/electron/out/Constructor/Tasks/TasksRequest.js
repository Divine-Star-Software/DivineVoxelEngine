import { ConstructorRemoteThreadTasks } from "../../Common/Threads/Contracts/ConstructorRemoteThreadTasks.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { $3dMooreNeighborhood } from "../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { Builder } from "../../Constructor/Builder/Builder.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { VisitedMap } from "../../Global/Util/VisistedMap.js";
const chunkTool = new ChunkDataTool();
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
    aSyncQueue = [];
    buildMode = "sync";
    buildTasks = {
        data: [["main", 0, 0, 0], 1],
        priority: 0,
    };
    rebuildTasks;
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
        if (EngineSettings.isServer())
            return false;
        if (!this.needsRebuild())
            return false;
        if (!chunkTool.setDimension(this.origin[0]).loadInAt(x, y, z))
            return false;
        const chunkKey = WorldSpaces.chunk.getKeyLocation(chunkTool.location);
        if (this.rebuildQueMap.has(chunkKey))
            return false;
        this.rebuildQueMap.set(chunkKey, true);
        if (this.buildMode == "async") {
            this.aSyncQueue.push([...chunkTool.location]);
            return true;
        }
        this.syncQueue.push([...chunkTool.location]);
        return true;
    }
    addNeighborsToRebuildQueue(x, y, z) {
        if (!this.needsRebuild())
            return false;
        const voxelPOS = WorldSpaces.voxel.getPositionXYZ(x, y, z);
        if (voxelPOS.x == 0 ||
            voxelPOS.x == WorldSpaces.chunk._bounds.x - 1 ||
            voxelPOS.y == 0 ||
            voxelPOS.y == WorldSpaces.chunk._bounds.y - 1 ||
            voxelPOS.z == 0 ||
            voxelPOS.z == WorldSpaces.chunk._bounds.z - 1) {
            let i = $3dMooreNeighborhood.length;
            while (i--) {
                this.addToRebuildQueue(x + $3dMooreNeighborhood[i][0], y + $3dMooreNeighborhood[i][1], z + $3dMooreNeighborhood[i][2]);
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
            if (!node)
                break;
            this.buildTasks.data[0] = node;
            this.comm.runTasks(ConstructorRemoteThreadTasks.buildChunk, this.buildTasks);
        }
        while (this.syncQueue.length !== 0) {
            const node = this.syncQueue.shift();
            if (!node)
                break;
            Builder.buildChunk(node);
        }
        this.rebuildQueMap.clear();
        return this;
    }
}
const getLightQueues = () => {
    return {
        rgb: {
            update: [],
            rmeove: [],
            map: new VisitedMap(),
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
    return {
        queue: [],
        map: new VisitedMap(),
        ...getLightQueues(),
        flow: getFlowQueues(),
    };
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
        return new Request("world-sun", origin, null, buildQueue, originThread, {
            sun: [],
        });
    },
    getExplosionRequests(origin, radius, buildQueue = "none", originThread = "self") {
        return new Request("voxel-update", origin, radius, buildQueue, originThread, getExplosionQueuesData());
    },
};
