import { MetaMapValues } from "../Constants/MetaValues.js";
export class TypedNode {
    data;
    get length() {
        return this.data[2];
    }
    get type() {
        return this.data[0];
    }
    get typeName() {
        return MetaMapValues[this.type];
    }
    get listType() {
        return this.data[1];
    }
    get listTypeName() {
        return MetaMapValues[this.listType];
    }
    get value() {
        return this.data[3];
    }
    set value(data) {
        this.data[3] = data;
    }
    constructor(type, value, listType = 0, length = 0) {
        this.data = [type, listType, length, value];
    }
}
