//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
import { ColumnTags } from "../../../Data/World/Column/ColumnTags.js";
import { ChunkTags } from "../../../Data/World/Chunk/ChunkTags.js";
export class ColumnDataTool extends EncodedPositionDataTool {
    tags = ColumnTags;
    _column = {};
    loadIn() {
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
        this.setTagValue("#dve_is_stored", 0);
        return this;
    }
    markAsStored() {
        this.setTagValue("#dve_is_stored", 1);
        return this;
    }
    isPersistent() {
        return this.getTagValue("#dve_persistent") == 1;
    }
    setPersistence(value) {
        this.setTagValue("#dve_persistent", value ? 1 : 0);
    }
    isDirty() {
        return this.getTagValue("#dve_is_dirty") == 1;
    }
    setDirty(value) {
        this.setTagValue("#dve_is_dirty", value ? 1 : 0);
    }
    getLastSaveTimestamp() {
        return this.getTagValue("#dve_last_save_timestamp");
    }
    setLastSaveTimestamp() {
        return this.setTagValue("#dve_last_save_timestamp", Date.now());
    }
    getLastAnalyzerUpdateTimestamp() {
        return this.getTagValue("#dve_last_analyzer_update_timestamp");
    }
    setLastAnalyzerUpdateTimestamp() {
        return this.setTagValue("#dve_last_analyzer_update_timestamp", Date.now());
    }
}
