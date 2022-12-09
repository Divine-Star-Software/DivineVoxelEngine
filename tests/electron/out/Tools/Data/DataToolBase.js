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
}
export class PositionBoundDataTool extends DataToolBase {
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
}
