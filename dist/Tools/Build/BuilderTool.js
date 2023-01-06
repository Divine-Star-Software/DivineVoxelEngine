import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { CCM } from "../../Common/Threads/Constructor/ConstructorComm.js";
import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
const parentComm = ThreadComm.parent;
export class BuilderTool extends LocationBoundTool {
    static _chunkTool = new ChunkDataTool();
    data = {
        LOD: 1,
    };
    setLOD(lod) {
        this.data.LOD = lod;
        return this;
    }
    buildChunk() {
        CCM.tasks.build.chunk([this.location, this.data.LOD]);
        return this;
    }
    buildColumn() {
        CCM.tasks.build.column([this.location, this.data.LOD]);
        return this;
    }
    removeColumn() {
        const column = WorldRegister.column.get(this.location);
        if (!column)
            return false;
        if (column.chunks.size == 0)
            return false;
        const columnPOS = WorldSpaces.column.getPositionLocation(this.location);
        parentComm.runTasks("remove-column", [
            this.location[0],
            columnPOS.x,
            columnPOS.y,
            columnPOS.z,
        ]);
        return this;
    }
    fillColumn() {
        WorldRegister.column.fill(this.location);
        return this;
    }
    removeColumnsOutsideRadius(radius) {
        const columnPOS = WorldSpaces.column.getPositionLocation(this.location);
        parentComm.runTasks("remove-column-outside-radius", [
            this.location[0],
            columnPOS.x,
            columnPOS.y,
            columnPOS.z,
            radius,
        ]);
    }
}
