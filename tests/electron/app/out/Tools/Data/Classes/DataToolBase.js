import { Util } from "../../../Global/Util.helper.js";
import { DimensionsRegister } from "../../../Data/World/Dimensions/DimensionsRegister.js";
export class LocationBoundTool {
    location = ["main", 0, 0, 0];
    setDimension(dimensionId) {
        this.location[0] = dimensionId;
        return this;
    }
    getLocation() {
        return this.location;
    }
    setPosition(x, y, z) {
        this.location[1] = x;
        this.location[2] = y;
        this.location[3] = z;
        return this;
    }
    setLocation(location) {
        this.location[0] = location[0];
        this.location[1] = location[1];
        this.location[2] = location[2];
        this.location[3] = location[3];
        return this;
    }
}
export class DataToolBase extends LocationBoundTool {
    tags;
    _c;
    constructor() {
        super();
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
    getBuffer() {
        if (this._c instanceof DataView)
            return this._c.buffer;
        return this._c;
    }
    getAsArrayBuffer() {
        return Util.converSABToBuffer(this.getBuffer());
    }
    getBufferSize() {
        return this.tags.tagSize;
    }
}
export class PositionBoundDataTool extends DataToolBase {
    position = { x: 0, y: 0, z: 0 };
    constructor() {
        super();
    }
    getPositionData() {
        this.position.x = this.getTagValue("#dve_p_x");
        this.position.y = this.getTagValue("#dve_p_y");
        this.position.z = this.getTagValue("#dve_p_z");
        return this.position;
    }
    setPositionData(x, y, z) {
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
        const pos = this.getPositionData();
        return [this.getDimensionId(), pos.x, pos.y, pos.z];
    }
}
