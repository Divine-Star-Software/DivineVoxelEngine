export class DataToolBase {
    tags;
    _c;
    constructor(tags) {
        this.tags = tags;
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
