import { MetaValues, MetaMapValues } from "../Constants/MetaValues.js";
//import { MMDNode } from "../Classes/MMDNode.js";
import { ByteCounts as BC, ByteDataGet } from "../Constants/ByteData.js";
import { TypedNode } from "../Classes/TypedNode.js";
export const BToMMD = {
    _mode: "object",
    _cobj: {},
    _parents: [],
    _objArray: [],
    _name: "",
    _length: 0,
    _objCount: 0,
    _inOject: false,
    _newMMDNode(type, value, listType = "start") {
        //@ts-ignore
        return new TypedNode(MetaValues[type], value, MetaValues[listType]);
    },
    _assign(value) {
        if (this._mode == "object") {
            if (Array.isArray(this._cobj)) {
                this._cobj.push(value);
            }
            else {
                this._cobj[this._name] = value;
            }
        }
        else {
            if (Array.isArray(this._cobj.v)) {
                this._cobj.value.push(value);
            }
            else {
                this._cobj.value[this._name] = value;
            }
        }
    },
    markFunctions: {
        start: (dv, index) => {
            return BC["8ui"] + index;
        },
        end: (dv, index) => {
            return BC["8ui"] + index;
        },
        name: (dv, index) => {
            BToMMD._name = "";
            const length = ByteDataGet["8ui"](dv, index + 1);
            index += BC["8ui"] * 2;
            for (let i = index; i < index + length * BC["16ui"]; i += 2) {
                BToMMD._name += String.fromCharCode(ByteDataGet["16ui"](dv, i));
            }
            return index + length * BC["16ui"];
        },
        object: (dv, index) => { },
        "object-start": (dv, index) => {
            let newObj;
            if (BToMMD._mode == "object") {
                newObj = {};
            }
            else {
                newObj = BToMMD._newMMDNode("object", {});
            }
            if (BToMMD._objCount != 0) {
                BToMMD._assign(newObj);
                BToMMD._parents.push(BToMMD._cobj);
            }
            BToMMD._objCount++;
            BToMMD._cobj = newObj;
            return BC["8ui"] + index;
        },
        "object-end": (dv, index) => {
            if (BToMMD._parents.length > 0) {
                BToMMD._cobj = BToMMD._parents.pop();
            }
            return BC["8ui"] + index;
        },
        array: (dv, index) => {
            return BC["8ui"] + index;
        },
        "array-start": (dv, index) => {
            let newObj;
            if (BToMMD._mode == "object") {
                newObj = [];
            }
            else {
                newObj = BToMMD._newMMDNode("array", []);
            }
            if (BToMMD._objCount != 0) {
                BToMMD._assign(newObj);
                BToMMD._parents.push(BToMMD._cobj);
            }
            BToMMD._objCount++;
            BToMMD._cobj = newObj;
            return BC["8ui"] + index;
        },
        "array-end": (dv, index) => {
            if (BToMMD._parents.length > 0) {
                BToMMD._cobj = BToMMD._parents.pop();
            }
            return BC["8ui"] + index;
        },
        "8i": (dv, index) => {
            const value = ByteDataGet["8i"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("8i", value));
            }
            return BC["8ui"] + BC["8i"] + index;
        },
        "8ui": (dv, index) => {
            const value = ByteDataGet["8ui"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("8ui", value));
            }
            return BC["8ui"] + BC["8ui"] + index;
        },
        "16i": (dv, index) => {
            const value = ByteDataGet["16i"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("16i", value));
            }
            return BC["8ui"] + BC["16i"] + index;
        },
        "16ui": (dv, index) => {
            const value = ByteDataGet["16ui"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("16ui", value));
            }
            return BC["8ui"] + BC["16ui"] + index;
        },
        "32f": (dv, index) => {
            const value = ByteDataGet["32f"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("32f", value));
            }
            return BC["8ui"] + BC["32f"] + index;
        },
        "32i": (dv, index) => {
            const value = ByteDataGet["32i"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("32i", value));
            }
            return BC["8ui"] + BC["32i"] + index;
        },
        "32ui": (dv, index) => {
            const value = ByteDataGet["32ui"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("32ui", value));
            }
            return BC["8ui"] + BC["8ui"] + BC["32ui"] + index + 1;
        },
        "64f": (dv, index) => {
            const value = ByteDataGet["64f"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("64f", value));
            }
            return BC["8ui"] + BC["64f"] + index;
        },
        bigi: (dv, index) => {
            const value = ByteDataGet["bigi"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("bigi", value));
            }
            return BC["8ui"] + BC["bigi"] + index;
        },
        bigui: (dv, index) => {
            const value = ByteDataGet["bigui"](dv, index + 1);
            if (BToMMD._mode == "object") {
                BToMMD._assign(value);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("bigui", value));
            }
            return BC["8ui"] + BC["bigui"] + index;
        },
        "fixed-typed-array": (dv, index) => { },
        "fixed-string": (dv, index) => { },
        "string-array": (dv, index) => {
            const size = ByteDataGet["32ui"](dv, index + 1);
            index += BC["32ui"] + BC["8ui"];
            const array = [];
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
            if (BToMMD._mode == "object") {
                BToMMD._assign(array);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("string-array", array));
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
            if (BToMMD._mode == "object") {
                BToMMD._assign(string);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("string", string));
            }
            return index + length * BC["16ui"];
        },
        "typed-array": (dv, index) => {
            const type = MetaMapValues[ByteDataGet["8ui"](dv, index + 1)];
            const length = ByteDataGet["32ui"](dv, index + 2);
            index += BC["8ui"] * 2 + BC["32ui"];
            let array = [];
            const func = ByteDataGet[type];
            for (let i = 0; i < length; i++) {
                array.push(func(dv, index));
                index += BC[type];
            }
            if (BToMMD._mode == "object") {
                BToMMD._assign(array);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("typed-array", array, type));
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
            if (BToMMD._mode == "object") {
                BToMMD._assign(result);
            }
            else {
                BToMMD._assign(BToMMD._newMMDNode("string", result));
            }
            return index + length * BC["16ui"];
        },
        mmd: (dv, index) => { },
    },
    toObject(buffer, byteOffSet = 0) {
        this._mode = "object";
        console.log("hello");
        let legnth = buffer.byteLength;
        const dv = new DataView(buffer);
        this._objCount = 0;
        let index = byteOffSet;
        let mark = "16i";
        let markType = 0;
        while (index < legnth) {
            markType = ByteDataGet["8ui"](dv, index);
            mark = MetaMapValues[markType];
            index = this.markFunctions[mark](dv, index);
        }
        return this._cobj;
    },
    toMMD(buffer, byteOffSet = 0, byteOffSetEnd = 0) {
        this._mode = "mmd";
        let legnth;
        if (byteOffSetEnd == 0) {
            legnth = buffer.byteLength;
        }
        else {
            legnth = byteOffSetEnd;
        }
        const dv = new DataView(buffer);
        this._objCount = 0;
        let index = byteOffSet;
        let mark = "16i";
        let markType = 0;
        while (index < legnth) {
            markType = ByteDataGet["8ui"](dv, index);
            mark = MetaMapValues[markType];
            index = this.markFunctions[mark](dv, index);
        }
        this._parents = [];
        return this._cobj;
    },
};
