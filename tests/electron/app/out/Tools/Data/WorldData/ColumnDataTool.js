//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { PositionBoundDataTool } from "../../Classes/DataToolBase.js";
import { ColumnTags } from "../../../Data/World/Column/ColumnTags.js";
import { ChunkTags } from "../../../Data/World/Chunk/ChunkTags.js";
export class ColumnDataTool extends PositionBoundDataTool {
    tags = ColumnTags;
    _column = {};
    loadIn(x, y, z) {
        this.location[1] = x;
        this.location[2] = y;
        this.location[3] = z;
        const column = WorldRegister.column.get(this.location);
        if (!column)
            return false;
        this.tags.setBuffer(column.data);
        this._c = column.data;
        this._column = column;
        return true;
    }
    loadInAt(location) {
        this.setLocation(location);
        const column = WorldRegister.column.get(this.location);
        if (!column)
            return false;
        this.tags.setBuffer(column.data);
        this._c = column.data;
        this._column = column;
        return true;
    }
    setColumn(column) {
        this.tags.setBuffer(column.data);
        this._c = column.data;
        this._column = column;
        return this;
    }
    getColumn() {
        return this._column;
    }
    getNumChunks() {
        return this._column.chunks.size;
    }
    getBufferSizeForWholeColumn() {
        return ColumnTags.tagSize + ChunkTags.tagSize * this.getNumChunks();
    }
    isStored() {
        return this.getTagValue("#dve_is_stored") == 1;
    }
    markAsNotStored() {
        return this.setTagValue("#dve_is_stored", 0);
    }
    markAsStored() {
        return this.setTagValue("#dve_is_stored", 1);
    }
}
