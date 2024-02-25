import type { DBOMarks } from "../Types/DBO.types";
import type { DBOPrimitive, TypedArrays } from "../Types/DBO.types";
import { MetaValues, MetaMapValues } from "../Constants/MetaValues.js";
//import { DBONode } from "../Classes/DBONode.js";
import { ByteCounts as BC, ByteDataGet } from "../Constants/ByteData.js";
import { TypedNode } from "../Classes/TypedNode.js";
import { TypedArrayCrete } from "../Constants/ByteData.js";
export const BufferToDBO = {
  _mode: <"object" | "DBO" | "json">"object",
  _cobj: <any>{},
  _parents: <any[]>[],
  _objArray: [],
  _name: "",
  _length: 0,
  _objCount: 0,
  _inOject: false,

  _newDBONode(type: DBOMarks, value: any, listType: string = "start") {
    //@ts-ignore
    return new TypedNode(MetaValues[type], value, MetaValues[listType]);
  },

  _assign(value: any) {
    if (BufferToDBO._mode == "object" || BufferToDBO._mode == "json") {
      if (Array.isArray(this._cobj)) {
        this._cobj.push(value);
      } else {
        this._cobj[this._name] = value;
      }
    } else {
      if (Array.isArray(this._cobj.value)) {
        this._cobj.value.push(value);
      } else {
        this._cobj.value[this._name] = value;
      }
    }
  },

  markFunctions: <Record<DBOMarks, (dv: DataView, index: number) => number>>{
    start: (dv, index) => {
      return BC["8ui"] + index;
    },
    end: (dv, index) => {
      return BC["8ui"] + index;
    },
    name: (dv, index) => {
      BufferToDBO._name = "";
      const length = ByteDataGet["8ui"](dv, index + 1);
      index += BC["8ui"] * 2;
      for (let i = index; i < index + length * BC["16ui"]; i += 2) {
        BufferToDBO._name += String.fromCharCode(ByteDataGet["16ui"](dv, i));
      }
      return index + length * BC["16ui"];
    },
    //made this actually do something not sure if it is was meant not to 
    object: (dv, index) => {
      return BC["8ui"] + index;
    },
    "object-start": (dv, index) => {
      let newObj: any;
      if (BufferToDBO._mode == "object") {
        newObj = {};
      } else {
        newObj = BufferToDBO._newDBONode("object", {});
      }
      if (BufferToDBO._objCount != 0) {
        BufferToDBO._assign(newObj);
        BufferToDBO._parents.push(BufferToDBO._cobj);
      }

      BufferToDBO._objCount++;
      BufferToDBO._cobj = newObj;
      return BC["8ui"] + index;
    },
    "object-end": (dv, index) => {
      if (BufferToDBO._parents.length > 0) {
        BufferToDBO._cobj = BufferToDBO._parents.pop();
      }
      return BC["8ui"] + index;
    },
    array: (dv, index) => {
      return BC["8ui"] + index;
    },
    "array-start": (dv, index) => {
      let newObj: any;
      if (BufferToDBO._mode == "object") {
        newObj = [];
      } else {
        newObj = BufferToDBO._newDBONode("array", []);
      }
      if (BufferToDBO._objCount != 0) {
        BufferToDBO._assign(newObj);
        BufferToDBO._parents.push(BufferToDBO._cobj);
      }

      BufferToDBO._objCount++;
      BufferToDBO._cobj = newObj;

      return BC["8ui"] + index;
    },
    "array-end": (dv, index) => {
      if (BufferToDBO._parents.length > 0) {
        BufferToDBO._cobj = BufferToDBO._parents.pop();
      }
      return BC["8ui"] + index;
    },
    boolean: (dv, index) => {
      const value = ByteDataGet["8ui"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value ? false : true);
      } else {
        BufferToDBO._assign(
          BufferToDBO._newDBONode("boolean", value ? false : true)
        );
      }
      return BC["8ui"] + BC["8i"] + index;
    },
    undefined: (dv, index) => {
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(undefined);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("undefined", undefined));
      }
      return BC["8ui"] + index;
    },
    "8i": (dv, index) => {
      const value = ByteDataGet["8i"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("8i", value));
      }
      return BC["8ui"] + BC["8i"] + index;
    },
    "8ui": (dv, index) => {
      const value = ByteDataGet["8ui"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("8ui", value));
      }
      return BC["8ui"] + BC["8ui"] + index;
    },
    "16i": (dv, index) => {
      const value = ByteDataGet["16i"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("16i", value));
      }
      return BC["8ui"] + BC["16i"] + index;
    },
    "16ui": (dv, index) => {
      const value = ByteDataGet["16ui"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("16ui", value));
      }
      return BC["8ui"] + BC["16ui"] + index;
    },
    "32f": (dv, index) => {
      const value = ByteDataGet["32f"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("32f", value));
      }
      return BC["8ui"] + BC["32f"] + index;
    },
    "32i": (dv, index) => {
      const value = ByteDataGet["32i"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("32i", value));
      }
      return BC["8ui"] + BC["32i"] + index;
    },
    "32ui": (dv, index) => {
      const value = ByteDataGet["32ui"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("32ui", value));
      }
      return BC["8ui"] + BC["8ui"] + BC["32ui"] + index + 1;
    },
    "64f": (dv, index) => {
      const value = ByteDataGet["64f"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("64f", value));
      }
      return BC["8ui"] + BC["64f"] + index;
    },
    bigi: (dv, index) => {
      const value = ByteDataGet["bigi"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("bigi", value));
      }
      return BC["8ui"] + BC["bigi"] + index;
    },
    bigui: (dv, index) => {
      const value = ByteDataGet["bigui"](dv, index + 1);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(value);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("bigui", value));
      }
      return BC["8ui"] + BC["bigui"] + index;
    },
    "fixed-typed-array": (dv, index) => {},
    "fixed-string": (dv, index) => {},
    "string-array": (dv, index) => {
      const size = ByteDataGet["32ui"](dv, index + 1);
      index += BC["32ui"] + BC["8ui"];
      const array: string[] = [];
      for (let i = 0; i < size; i++) {
        let string = "";
        const stringSize = ByteDataGet["32ui"](dv, index);
        index += BC["32ui"];
        for (let k = 0; k < stringSize; k++) {
          string += String.fromCharCode(ByteDataGet["16ui"](dv, index));
          index += BC["16ui"];
        }
        array.push(string);
      }
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(array);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("string-array", array));
      }
      return index;
    },
    string: (dv, index) => {
      const length = ByteDataGet["32ui"](dv, index + 1);
      index += BC["32f"] + BC["8ui"];
      let string = "";
      for (let i = index; i < index + length * BC["16ui"]; i += 2) {
        string += String.fromCharCode(ByteDataGet["16ui"](dv, i));
      }
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(string);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("string", string));
      }
      return index + length * BC["16ui"];
    },
    "typed-array": (dv, index) => {
      const type = MetaMapValues[ByteDataGet["8ui"](dv, index + 1)];
      const length = ByteDataGet["32ui"](dv, index + 2);
      index += BC["8ui"] * 2 + BC["32ui"];
      let array: TypedArrays | number[];
      if (BufferToDBO._mode == "json") {
        array = [];
      } else {
        array = TypedArrayCrete[type as DBOPrimitive](length);
      }
      const func = ByteDataGet[<DBOPrimitive>type];
      for (let i = 0; i < length; i++) {
        array[i] = func(dv, index);
        index += BC[<DBOPrimitive>type];
      }
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(array);
      } else {
        BufferToDBO._assign(
          BufferToDBO._newDBONode("typed-array", array, type)
        );
      }
      return index;
    },
    json: (dv, index) => {
      const length = ByteDataGet["32ui"](dv, index + 1);
      index += BC["32f"] + BC["8ui"];
      let jsonString = "";
      for (let i = index; i < index + length * BC["16ui"]; i += 2) {
        jsonString += String.fromCharCode(ByteDataGet["16ui"](dv, i));
      }

      const result = JSON.parse(jsonString);
      if (BufferToDBO._mode != "DBO") {
        BufferToDBO._assign(result);
      } else {
        BufferToDBO._assign(BufferToDBO._newDBONode("string", result));
      }
      return index + length * BC["16ui"];
    },
    DBO: (dv, index) => {},
  },

  toObject<T>(buffer: ArrayBuffer, byteOffSet = 0): T {
    this._mode = "object";
    let legnth = buffer.byteLength;
    const dv = new DataView(buffer);
    this._objCount = 0;
    let index = byteOffSet;
    let mark: DBOMarks = "16i";
    let markType: number = 0;
    while (index < legnth) {
      markType = ByteDataGet["8ui"](dv, index);
      mark = MetaMapValues[markType];

      index = this.markFunctions[mark](dv, index);
    }
    return <T>this._cobj;
  },

  toJSON<T>(buffer: ArrayBuffer, byteOffSet = 0): T {
    this._mode = "json";
    let legnth = buffer.byteLength;
    const dv = new DataView(buffer);
    this._objCount = 0;
    let index = byteOffSet;
    let mark: DBOMarks = "16i";
    let markType: number = 0;
    while (index < legnth) {
      markType = ByteDataGet["8ui"](dv, index);
      mark = MetaMapValues[markType];
      index = this.markFunctions[mark](dv, index);
    }
    return <T>this._cobj;
  },

  toDBO<T>(buffer: ArrayBuffer, byteOffSet = 0, byteOffSetEnd = 0): T {
    this._mode = "DBO";
    let legnth;

    if (byteOffSetEnd == 0) {
      legnth = buffer.byteLength;
    } else {
      legnth = byteOffSetEnd;
    }

    const dv = new DataView(buffer);
    this._objCount = 0;
    let index = byteOffSet;
    let mark: DBOMarks = "16i";
    let markType: number = 0;
    while (index < legnth) {
      markType = ByteDataGet["8ui"](dv, index);
      mark = MetaMapValues[markType];
      index = this.markFunctions[mark](dv, index);
    }
    this._parents = [];
    return <T>this._cobj;
  },
};
