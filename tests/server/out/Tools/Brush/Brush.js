import { DataTool } from "../../Tools/Data/DataTool.js";
import { DimensionsRegister } from "../../Data/Dimensions/DimensionsRegister.js";
import { WorldPainter } from "../../Data/World/WorldPainter.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
export class BrushTool {
    data = {
        id: "dve:air",
        position: [0, 0, 0],
        state: 0,
        shapeState: 0,
        dimension: "main",
        secondaryState: 0,
        secondaryVoxelId: "dve:air",
        level: 0,
        levelState: 0,
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
        this.data.dimension = DimensionsRegister.getDimensionStringId(dimensionId);
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
    getRaw() {
        this._dt.setId(VoxelPaletteReader.id.getPaletteId(this.data.id, this.data.state));
        this._dt
            .setSecondary(true)
            .setId(VoxelPaletteReader.id.getPaletteId(this.data.secondaryVoxelId, this.data.secondaryState))
            .setSecondary(false);
        this._dt.setLevel(this.data.state);
        this._dt.setLevelState(this.data.levelState);
        this._dt.setShapeState(this.data.shapeState);
        return this._dt.data.raw;
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
    erease() {
        WorldPainter.paint.erease(this.data.dimension, this.data.position[0], this.data.position[1], this.data.position[2]);
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
