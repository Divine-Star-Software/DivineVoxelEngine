import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { CCM } from "../../Common/Threads/Constructor/ConstructorComm.js";
import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
const parentComm = ThreadComm.parent;
export class BuilderTool {
    static _chunkTool = new ChunkDataTool();
    data = {
        dimesnion: "main",
        x: 0,
        y: 0,
        z: 0,
        LOD: 1,
    };
    setDimension(dimensionId) {
        this.data.dimesnion = dimensionId;
        return this;
    }
    setLOD(lod) {
        this.data.LOD = lod;
        return this;
    }
    setXZ(x, z) {
        this.data.x = x;
        this.data.z = z;
        return this;
    }
    setXYZ(x, y, z) {
        this.data.x = x;
        this.data.y = y;
        this.data.z = z;
        return this;
    }
    buildChunk() {
        CCM.tasks.build.chunk([
            this.data.dimesnion,
            this.data.x,
            this.data.y,
            this.data.z,
            this.data.LOD,
        ]);
        return this;
    }
    buildColumn() {
        CCM.tasks.build.column([
            this.data.dimesnion,
            this.data.x,
            this.data.y,
            this.data.z,
            this.data.LOD,
        ]);
        return this;
    }
    removeColumn() {
        const column = WorldRegister.column.get(this.data.dimesnion, this.data.x, this.data.z, this.data.y);
        if (!column)
            return false;
        if (column.chunks.size == 0)
            return false;
        const columnPOS = WorldSpaces.column.getPositionXYZ(this.data.x, this.data.y, this.data.z);
        parentComm.runTasks("remove-column", [
            this.data.dimesnion,
            columnPOS.x,
            columnPOS.y,
            columnPOS.z,
        ]);
        return this;
    }
    fillColumn() {
        WorldRegister.column.fill(this.data.dimesnion, this.data.x, this.data.z, this.data.y);
        return this;
    }
    removeColumnsOutsideRadius(radius) {
        const columnPOS = WorldSpaces.column.getPositionXYZ(this.data.x, this.data.y, this.data.z);
        parentComm.runTasks("remove-column-outside-radius", [
            this.data.dimesnion,
            columnPOS.x,
            columnPOS.y,
            columnPOS.z,
            radius,
        ]);
    }
}
