import { DataTool } from "../../Tools/Data/DataTool.js";
import { DimensionsRegister } from "../../Data/Dimensions/DimensionsRegister.js";
import { WorldPainter } from "../../Data/World/WorldPainter.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
export class VoxelBrush {
    data = {
        id: "",
        position: [0, 0, 0],
        state: 0,
        shapeState: 0,
        dimension: 0,
        secondaryState: 0,
        secondaryVoxelId: "",
    };
    _dt = new DataTool();
    _raw = [];
    setId(id, state = 0, shapeState = 0) {
        this.data.id = id;
        this.data.state = state;
        this.data.shapeState = shapeState;
        return this;
    }
    setDimension(dimensionId) {
        this.data.dimension = DimensionsRegister.getDimensionNumericId(dimensionId);
        this._dt.setDimension(dimensionId);
        return this;
    }
    setSecondaryId(id, state = 0) {
        this.data.secondaryVoxelId = id;
        this.data.secondaryState = state;
        return this;
    }
    setState(state) {
        this.data.state = state;
        return this;
    }
    setShapeState(state) {
        this.data.shapeState = state;
        return this;
    }
    setRaw(data) {
        this._dt.loadInRaw(data);
        this.data.id = this._dt.getStringId();
        this.data.shapeState = this._dt.getShapeState();
        this.data.state = this._dt.getState();
        this._dt.setSecondary(true);
        if (this._dt.data.secondaryId >= 2) {
            this.data.secondaryVoxelId = this._dt.getStringId();
            this.data.secondaryState = this._dt.getState();
        }
        this._dt.setSecondary(false);
        return this;
    }
    setXYZ(x, y, z) {
        this.data.position[0] = x;
        this.data.position[1] = y;
        this.data.position[2] = z;
        return this;
    }
    getData() {
        return this.data;
    }
    paint() {
        WorldPainter.paint.voxel(this.data);
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
}