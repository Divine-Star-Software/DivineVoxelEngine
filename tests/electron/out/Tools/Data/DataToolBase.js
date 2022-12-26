import { DimensionsRegister } from "../../Data/World/Dimensions/DimensionsRegister.js";
export class DataToolBase {
    tags;
    _c;
    dimension = "main";
    position = {
        x: 0,
        y: 0,
        z: 0,
    };
    constructor() { }
    setDimension(dimensionId) {
        this.dimension = dimensionId;
        return this;
    }
    getTagValue(id) {
        this.tags.setBuffer(this._c);
        return this.tags.getTag(id);
    }
    setTagValue(id, value) {
        this.tags.setBuffer(this._c);
        return this.tags.setTag(id, value);
    }
    getArrayTagValue(id, index) {
        this.tags.setBuffer(this._c);
        return this.tags.getArrayTagValue(id, index);
    }
    setArrayTagValue(id, index, value) {
        this.tags.setBuffer(this._c);
        return this.tags.setArrayTagValue(id, index, value);
    }
    setBuffer(buffer) {
        this._c = buffer;
        this.tags.setBuffer(this._c);
    }
    getBufferSize() {
        return this.tags.tagSize;
    }
}
export class PositionBoundDataTool extends DataToolBase {
    getPosition() {
        this.position.x = this.getTagValue("#dve_p_x");
        this.position.y = this.getTagValue("#dve_p_y");
        this.position.z = this.getTagValue("#dve_p_z");
        return this.position;
    }
    setPosition(x, y, z) {
        this.setTagValue("#dve_p_x", x);
        this.setTagValue("#dve_p_y", y);
        this.setTagValue("#dve_p_z", z);
        return this.position;
    }
    setDimensionId(dimensionId) {
        this.setTagValue("#dve_dimension_id", DimensionsRegister.getDimensionNumericId(dimensionId));
    }
    getDimensionId() {
        return DimensionsRegister.getDimensionStringId(this.getTagValue("#dve_dimension_id"));
    }
    getLocationData() {
        const pos = this.getPosition();
        return [this.getDimensionId(), pos.x, pos.y, pos.z];
    }
}
