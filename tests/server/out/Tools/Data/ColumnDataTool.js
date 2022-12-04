//objects
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DimensionsRegister } from "../../Data/Dimensions/DimensionsRegister.js";
import { ColumnTags } from "../../Data/Column/ColumnTags.js";
export class ColumnDataTool {
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
        const column = WorldRegister.column.get(this.data.dimension, x, z, y);
        if (!column)
            return false;
        ColumnTags.setBuffer(column.data);
        this._c = column;
        return true;
    }
    setChunk(column) {
        ColumnTags.setBuffer(column.data);
        this._c = column;
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
        ColumnTags.setBuffer(this._c.data);
        return ColumnTags.getTag(id);
    }
    setTagValue(id, value) {
        ColumnTags.setBuffer(this._c.data);
        return ColumnTags.setTag(id, value);
    }
    getArrayTagValue(id, index) {
        ColumnTags.setBuffer(this._c.data);
        return ColumnTags.getArrayTagValue(id, index);
    }
    setArrayTagValue(id, index, value) {
        ColumnTags.setBuffer(this._c.data);
        return ColumnTags.setArrayTagValue(id, index, value);
    }
}
