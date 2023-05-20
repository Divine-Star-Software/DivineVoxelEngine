import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { ThreadComm } from "threadcomm";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { TaskTool } from "../../Tools/Tasks/TasksTool.js";
const parentComm = ThreadComm.parent;
class BuilderTool extends LocationBoundTool {
    static _chunkTool = new ChunkDataTool();
    tasks = new TaskTool();
    data = {
        LOD: 1,
    };
    setLOD(lod) {
        this.data.LOD = lod;
        return this;
    }
    clearAll() {
        parentComm.runTasks("clear-all", []);
    }
    buildChunk(runQueue = false) {
        this.tasks.build.chunk.queued.add(this.location);
        if (runQueue)
            this.tasks.build.chunk.queued.run(() => { });
        return this;
    }
    buildColumn(onDone) {
        this.tasks.build.column.deferred.run(this.location, onDone ? onDone : (data) => { });
        return this;
    }
    removeColumn() {
        const column = WorldRegister.column.get(this.location);
        if (!column)
            return false;
        if (column.chunks.size == 0)
            return false;
        parentComm.runTasks("remove-column", this.location);
        return this;
    }
    fillColumn() {
        WorldRegister.column.fill(this.location);
        return this;
    }
    removeColumnsOutsideRadius(radius) {
        parentComm.runTasks("remove-column-outside-radius", [this.location, radius]);
    }
}
export { BuilderTool };
