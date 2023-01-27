import { Util } from "../../Global/Util.helper.js";
import { DimensionsRegister } from "../../Data/World/Dimensions/DimensionsRegister.js";
import { LocationBoundTool } from "./LocationBoundTool.js";
import { WorldDataTagIDs } from "../../Data/Constants/Tags/WorldDataTagIds.js";
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
    loadInAt(x, y, z) {
        this.setXYZ(x, y, z);
        return this.loadIn();
    }
    loadInAtLocation(location) {
        this.setLocation(location);
        return this.loadIn();
    }
}
export class EncodedPositionDataTool extends DataToolBase {
    position = { x: 0, y: 0, z: 0 };
    constructor() {
        super();
    }
    getPositionData() {
        this.position.x = this.getTagValue(WorldDataTagIDs.positionX);
        this.position.y = this.getTagValue(WorldDataTagIDs.positionY);
        this.position.z = this.getTagValue(WorldDataTagIDs.positionZ);
        return this.position;
    }
    setPositionData(x, y, z) {
        this.setTagValue(WorldDataTagIDs.positionX, x);
        this.setTagValue(WorldDataTagIDs.positionY, y);
        this.setTagValue(WorldDataTagIDs.positionZ, z);
        return this.position;
    }
    setDimensionId(dimensionId) {
        this.setTagValue(WorldDataTagIDs.dimensionId, DimensionsRegister.getDimensionNumericId(dimensionId));
    }
    getDimensionId() {
        return DimensionsRegister.getDimensionStringId(this.getTagValue(WorldDataTagIDs.dimensionId));
    }
    getLocationData() {
        const pos = this.getPositionData();
        return [this.getDimensionId(), pos.x, pos.y, pos.z];
    }
}
