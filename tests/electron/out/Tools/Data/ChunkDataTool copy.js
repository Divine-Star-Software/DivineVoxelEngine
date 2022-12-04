//objects
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DimensionsRegister } from "../../Data/Dimensions/DimensionsRegister.js";
import { ChunkTags } from "../../Data/Chunk/ChunkTags.js";
export class ChunkDataTool {
    static _dtutil = new ChunkDataTool();
    data = {
        dimension: "main",
    };
    position = {
        x: 0,
        y: 0,
        z: 0,
    };
    _c = {};
    setDimension(dimensionId) {
        this.data.dimension = DimensionsRegister.getDimensionStringId(dimensionId);
        return this;
    }
    loadIn(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        const chunk = WorldRegister.chunk.get(this.data.dimension, x, y, z);
        if (!chunk)
            return false;
        ChunkTags.setBuffer(chunk.data);
        this._c = chunk;
        return true;
    }
    setChunk(chunk) {
        ChunkTags.setBuffer(chunk.data);
        this._c = chunk;
        return this;
    }
    getPosition() {
        this.position.x = this.getTagValue("#dve:p_x");
        this.position.y = this.getTagValue("#dve:p_y");
        this.position.z = this.getTagValue("#dve:p_z");
        return this.position;
    }
    setPosition(x, y, z) {
        this.setTagValue("#dve:p_x", x);
        this.setTagValue("#dve:p_y", y);
        this.setTagValue("#dve:p_z", z);
        return this.position;
    }
    getTagValue(id) {
        ChunkTags.setBuffer(this._c.data);
        return ChunkTags.getTag(id);
    }
    setTagValue(id, value) {
        ChunkTags.setBuffer(this._c.data);
        return ChunkTags.setTag(id, value);
    }
    getArrayTagValue(id, index) {
        ChunkTags.setBuffer(this._c.data);
        return ChunkTags.getArrayTagValue(id, index);
    }
    setArrayTagValue(id, index, value) {
        ChunkTags.setBuffer(this._c.data);
        return ChunkTags.setArrayTagValue(id, index, value);
    }
}
