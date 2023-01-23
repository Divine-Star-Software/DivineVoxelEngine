import { MetaMapValues } from "../Constants/MetaValues.js";

export class TypedNode<T> {
  data : [type : number,listType : number,length : number, value : T]
  get length() {
    return this.data[2]
  }
  get type() {
    return this.data[0]
  }
  get typeName() {
    return MetaMapValues[this.type];
  }
  get listType() {
    return this.data[1]
  }
  get listTypeName() {
    return MetaMapValues[this.listType];
  }
  get value() {
    return this.data[3]
  }
  set value(data : T) {
    this.data[3] = data;
  }

  constructor(type: number, value: T, listType = 0, length = 0) {
    this.data = [type,listType,length,value];
  }
}
