//objects
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { PositionBoundDataTool } from "./DataToolBase.js";
import { ColumnTags } from "../../Data/World/Column/ColumnTags.js";
export class ColumnDataTool extends PositionBoundDataTool {
    tags = ColumnTags;
    loadIn(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        const column = WorldRegister.column.get(this.dimension, x, z, y);
        if (!column)
            return false;
        this.tags.setBuffer(column.data);
        this._c = column.data;
        return true;
    }
    setColumn(chunk) {
        this.tags.setBuffer(chunk.data);
        this._c = chunk.data;
        return this;
    }
}
