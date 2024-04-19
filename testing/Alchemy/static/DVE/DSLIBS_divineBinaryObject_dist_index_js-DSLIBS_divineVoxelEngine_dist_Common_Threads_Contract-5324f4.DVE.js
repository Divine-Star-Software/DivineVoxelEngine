"use strict";
(self["webpackChunkdve_testing"] = self["webpackChunkdve_testing"] || []).push([["DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4"],{

/***/ "../../DSLIBS/divineBinaryObject/dist/Classes/TypedNode.js":
/*!*****************************************************************!*\
  !*** ../../DSLIBS/divineBinaryObject/dist/Classes/TypedNode.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypedNode": () => (/* binding */ TypedNode)
/* harmony export */ });
/* harmony import */ var _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/MetaValues.js */ "../../DSLIBS/divineBinaryObject/dist/Constants/MetaValues.js");

class TypedNode {
    data;
    get length() {
        return this.data[2];
    }
    get type() {
        return this.data[0];
    }
    get typeName() {
        return _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaMapValues[this.type];
    }
    get primiteName() {
        return _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaMapValues[this.type];
    }
    get listType() {
        return this.data[1];
    }
    get listTypeName() {
        return _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaMapValues[this.listType];
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


/***/ }),

/***/ "../../DSLIBS/divineBinaryObject/dist/Constants/ByteData.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/divineBinaryObject/dist/Constants/ByteData.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ByteCounts": () => (/* binding */ ByteCounts),
/* harmony export */   "ByteDataGet": () => (/* binding */ ByteDataGet),
/* harmony export */   "ByteDataSet": () => (/* binding */ ByteDataSet),
/* harmony export */   "ByteParser": () => (/* binding */ ByteParser),
/* harmony export */   "TypedArrayCrete": () => (/* binding */ TypedArrayCrete),
/* harmony export */   "TypedArrayMap": () => (/* binding */ TypedArrayMap),
/* harmony export */   "TypedArrayRecord": () => (/* binding */ TypedArrayRecord)
/* harmony export */ });
const ByteCounts = {
    "8i": 1,
    "8ui": 1,
    "8uic": 1,
    "16i": 2,
    "16ui": 2,
    "32i": 4,
    "32ui": 4,
    "32f": 4,
    "64f": 8,
    bigi: 8,
    bigui: 8,
};
const ByteDataGet = {
    "8i": (dv, index) => dv.getInt8(index),
    "8ui": (dv, index) => dv.getUint8(index),
    "8uic": (dv, index) => dv.getUint8(index),
    "16i": (dv, index) => dv.getInt16(index),
    "16ui": (dv, index) => dv.getUint16(index),
    "32i": (dv, index) => dv.getInt32(index),
    "32ui": (dv, index) => dv.getUint32(index),
    "32f": (dv, index) => dv.getFloat32(index),
    "64f": (dv, index) => dv.getFloat64(index),
    //@ts-ignore
    bigi: (dv, index) => dv.getBigInt64(index),
    //@ts-ignore
    bigui: (dv, index) => dv.getBigUint64(index),
};
const ByteDataSet = {
    "8i": (dv, index, value) => dv.setInt8(index, value),
    "8ui": (dv, index, value) => dv.setUint8(index, value),
    "8uic": (dv, index, value) => dv.setUint8(index, value),
    "16i": (dv, index, value) => dv.setInt16(index, value),
    "16ui": (dv, index, value) => dv.setUint16(index, value),
    "32i": (dv, index, value) => dv.setInt32(index, value),
    "32ui": (dv, index, value) => dv.setUint32(index, value),
    "32f": (dv, index, value) => dv.setFloat32(index, value),
    "64f": (dv, index, value) => dv.setFloat64(index, value),
    bigi: (dv, index, value) => dv.setBigInt64(index, BigInt(value)),
    bigui: (dv, index, value) => dv.setBigUint64(index, BigInt(value)),
};
const TypedArrayCrete = {
    "8i": (length) => new Int8Array(length),
    "8ui": (length) => new Uint8Array(length),
    "8uic": (length) => new Uint8ClampedArray(length),
    "16i": (length) => new Int16Array(length),
    "16ui": (length) => new Uint16Array(length),
    "32i": (length) => new Int32Array(length),
    "32ui": (length) => new Uint32Array(length),
    "32f": (length) => new Float32Array(length),
    "64f": (length) => new Float64Array(length),
    bigi: (length) => new BigInt64Array(length),
    bigui: (length) => new BigUint64Array(length),
};
const TypedArrayMap = {
    "8i": Int8Array,
    "8ui": Uint8Array,
    "8uic": Uint8ClampedArray,
    "16i": Int16Array,
    "16ui": Uint16Array,
    "32i": Int32Array,
    "32ui": Uint32Array,
    "32f": Float32Array,
    "64f": Float64Array,
    bigi: BigInt64Array,
    bigui: BigUint64Array,
};
const TypedArrayRecord = new Map([
    [Int8Array, "8i"],
    [Uint8Array, "8ui"],
    [Uint8ClampedArray, "8uic"],
    [Int16Array, "16i"],
    [Uint16Array, "16ui"],
    [Int32Array, "32i"],
    [Uint32Array, "32ui"],
    [Float32Array, "32f"],
    [Float64Array, "64f"],
    [BigInt64Array, "bigi"],
    [BigUint64Array, "bigui"],
]);
const ByteParser = {
    view: new DataView(new ArrayBuffer(8)),
    count: 0,
    value: 0,
    setValue(type, value) {
        this.value = value;
        ByteDataSet[type](this.view, 0, value);
        this.count = ByteCounts[type];
        return this;
    },
    addBytes(data) {
        for (let i = 0; i < this.count; i++) {
            data.push(this.view.getUint8(i));
        }
    },
};


/***/ }),

/***/ "../../DSLIBS/divineBinaryObject/dist/Constants/MetaValues.js":
/*!********************************************************************!*\
  !*** ../../DSLIBS/divineBinaryObject/dist/Constants/MetaValues.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MetaMapValues": () => (/* binding */ MetaMapValues),
/* harmony export */   "MetaValues": () => (/* binding */ MetaValues)
/* harmony export */ });
const markers = [
    "start",
    "end",
    "object",
    "object-start",
    "object-end",
    "array",
    "array-start",
    "array-end",
    "name",
    "8i",
    "8ui",
    "8uic",
    "16i",
    "16ui",
    "32f",
    "32i",
    "32ui",
    "64f",
    "bigi",
    "bigui",
    "fixed-typed-array",
    "fixed-string",
    "string",
    "fixed-string-array",
    "string-array",
    "typed-array",
    "json",
    "DBO",
    "boolean",
    "undefined",
];
const metaValues = {};
for (let i = 0; i < markers.length; i++) {
    metaValues[markers[i]] = i;
}
const MetaValues = metaValues;
const MetaMapValues = {};
for (const key of Object.keys(MetaValues)) {
    //@ts-ignore
    MetaMapValues[Number(MetaValues[key])] = key;
}


/***/ }),

/***/ "../../DSLIBS/divineBinaryObject/dist/DBO/BufferToDBO.js":
/*!***************************************************************!*\
  !*** ../../DSLIBS/divineBinaryObject/dist/DBO/BufferToDBO.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BufferToDBO": () => (/* binding */ BufferToDBO)
/* harmony export */ });
/* harmony import */ var _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/MetaValues.js */ "../../DSLIBS/divineBinaryObject/dist/Constants/MetaValues.js");
/* harmony import */ var _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Constants/ByteData.js */ "../../DSLIBS/divineBinaryObject/dist/Constants/ByteData.js");
/* harmony import */ var _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Classes/TypedNode.js */ "../../DSLIBS/divineBinaryObject/dist/Classes/TypedNode.js");

//import { DBONode } from "../Classes/DBONode.js";



const BufferToDBO = {
    _mode: "object",
    _cobj: {},
    _parents: [],
    _objArray: [],
    _name: "",
    _length: 0,
    _objCount: 0,
    _inOject: false,
    _newDBONode(type, value, listType = "start") {
        //@ts-ignore
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_2__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaValues[type], value, _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaValues[listType]);
    },
    _assign(value) {
        if (BufferToDBO._mode == "object" || BufferToDBO._mode == "json") {
            if (Array.isArray(this._cobj)) {
                this._cobj.push(value);
            }
            else {
                this._cobj[this._name] = value;
            }
        }
        else {
            if (Array.isArray(this._cobj.value)) {
                this._cobj.value.push(value);
            }
            else {
                this._cobj.value[this._name] = value;
            }
        }
    },
    markFunctions: {
        start: (dv, index) => {
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + index;
        },
        end: (dv, index) => {
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + index;
        },
        name: (dv, index) => {
            BufferToDBO._name = "";
            const length = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["8ui"](dv, index + 1);
            index += _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] * 2;
            for (let i = index; i < index + length * _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["16ui"]; i += 2) {
                BufferToDBO._name += String.fromCharCode(_Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["16ui"](dv, i));
            }
            return index + length * _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["16ui"];
        },
        object: (dv, index) => { },
        "object-start": (dv, index) => {
            let newObj;
            if (BufferToDBO._mode == "object") {
                newObj = {};
            }
            else {
                newObj = BufferToDBO._newDBONode("object", {});
            }
            if (BufferToDBO._objCount != 0) {
                BufferToDBO._assign(newObj);
                BufferToDBO._parents.push(BufferToDBO._cobj);
            }
            BufferToDBO._objCount++;
            BufferToDBO._cobj = newObj;
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + index;
        },
        "object-end": (dv, index) => {
            if (BufferToDBO._parents.length > 0) {
                BufferToDBO._cobj = BufferToDBO._parents.pop();
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + index;
        },
        array: (dv, index) => {
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + index;
        },
        "array-start": (dv, index) => {
            let newObj;
            if (BufferToDBO._mode == "object") {
                newObj = [];
            }
            else {
                newObj = BufferToDBO._newDBONode("array", []);
            }
            if (BufferToDBO._objCount != 0) {
                BufferToDBO._assign(newObj);
                BufferToDBO._parents.push(BufferToDBO._cobj);
            }
            BufferToDBO._objCount++;
            BufferToDBO._cobj = newObj;
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + index;
        },
        "array-end": (dv, index) => {
            if (BufferToDBO._parents.length > 0) {
                BufferToDBO._cobj = BufferToDBO._parents.pop();
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + index;
        },
        boolean: (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["8ui"](dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value ? false : true);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("boolean", value ? false : true));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8i"] + index;
        },
        undefined: (dv, index) => {
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(undefined);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("undefined", undefined));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + index;
        },
        "8i": (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["8i"](dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("8i", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8i"] + index;
        },
        "8ui": (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["8ui"](dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("8ui", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + index;
        },
        "16i": (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["16i"](dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("16i", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["16i"] + index;
        },
        "16ui": (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["16ui"](dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("16ui", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["16ui"] + index;
        },
        "32f": (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["32f"](dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("32f", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["32f"] + index;
        },
        "32i": (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["32i"](dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("32i", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["32i"] + index;
        },
        "32ui": (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["32ui"](dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("32ui", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["32ui"] + index + 1;
        },
        "64f": (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["64f"](dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("64f", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["64f"] + index;
        },
        bigi: (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet.bigi(dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("bigi", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts.bigi + index;
        },
        bigui: (dv, index) => {
            const value = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet.bigui(dv, index + 1);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(value);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("bigui", value));
            }
            return _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts.bigui + index;
        },
        "fixed-typed-array": (dv, index) => { },
        "fixed-string": (dv, index) => { },
        "string-array": (dv, index) => {
            const size = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["32ui"](dv, index + 1);
            index += _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["32ui"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"];
            const array = [];
            for (let i = 0; i < size; i++) {
                let string = "";
                const stringSize = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["32ui"](dv, index);
                index += _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["32ui"];
                for (let k = 0; k < stringSize; k++) {
                    string += String.fromCharCode(_Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["16ui"](dv, index));
                    index += _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["16ui"];
                }
                array.push(string);
            }
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(array);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("string-array", array));
            }
            return index;
        },
        string: (dv, index) => {
            const length = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["32ui"](dv, index + 1);
            index += _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["32f"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"];
            let string = "";
            for (let i = index; i < index + length * _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["16ui"]; i += 2) {
                string += String.fromCharCode(_Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["16ui"](dv, i));
            }
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(string);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("string", string));
            }
            return index + length * _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["16ui"];
        },
        "typed-array": (dv, index) => {
            const type = _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaMapValues[_Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["8ui"](dv, index + 1)];
            const length = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["32ui"](dv, index + 2);
            index += _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"] * 2 + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["32ui"];
            let array;
            if (BufferToDBO._mode == "json") {
                array = [];
            }
            else {
                array = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.TypedArrayCrete[type](length);
            }
            const func = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet[type];
            for (let i = 0; i < length; i++) {
                array[i] = func(dv, index);
                index += _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts[type];
            }
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(array);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("typed-array", array, type));
            }
            return index;
        },
        json: (dv, index) => {
            const length = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["32ui"](dv, index + 1);
            index += _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["32f"] + _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["8ui"];
            let jsonString = "";
            for (let i = index; i < index + length * _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["16ui"]; i += 2) {
                jsonString += String.fromCharCode(_Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["16ui"](dv, i));
            }
            const result = JSON.parse(jsonString);
            if (BufferToDBO._mode != "DBO") {
                BufferToDBO._assign(result);
            }
            else {
                BufferToDBO._assign(BufferToDBO._newDBONode("string", result));
            }
            return index + length * _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteCounts["16ui"];
        },
        DBO: (dv, index) => { },
    },
    toObject(buffer, byteOffSet = 0) {
        this._mode = "object";
        let legnth = buffer.byteLength;
        const dv = new DataView(buffer);
        this._objCount = 0;
        let index = byteOffSet;
        let mark = "16i";
        let markType = 0;
        while (index < legnth) {
            markType = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["8ui"](dv, index);
            mark = _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaMapValues[markType];
            index = this.markFunctions[mark](dv, index);
        }
        return this._cobj;
    },
    toJSON(buffer, byteOffSet = 0) {
        this._mode = "json";
        let legnth = buffer.byteLength;
        const dv = new DataView(buffer);
        this._objCount = 0;
        let index = byteOffSet;
        let mark = "16i";
        let markType = 0;
        while (index < legnth) {
            markType = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["8ui"](dv, index);
            mark = _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaMapValues[markType];
            index = this.markFunctions[mark](dv, index);
        }
        return this._cobj;
    },
    toDBO(buffer, byteOffSet = 0, byteOffSetEnd = 0) {
        this._mode = "DBO";
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
            markType = _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteDataGet["8ui"](dv, index);
            mark = _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaMapValues[markType];
            index = this.markFunctions[mark](dv, index);
        }
        this._parents = [];
        return this._cobj;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineBinaryObject/dist/DBO/DBOToBuffer.js":
/*!***************************************************************!*\
  !*** ../../DSLIBS/divineBinaryObject/dist/DBO/DBOToBuffer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DBOToBuffer": () => (/* binding */ DBOToBuffer)
/* harmony export */ });
/* harmony import */ var _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/MetaValues.js */ "../../DSLIBS/divineBinaryObject/dist/Constants/MetaValues.js");
/* harmony import */ var _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Constants/ByteData.js */ "../../DSLIBS/divineBinaryObject/dist/Constants/ByteData.js");


const DBOToBuffer = {
    _proto: [],
    _tokenizeString(string) {
        for (let i = 0; i < string.length; i++) {
            this._addToken("16ui", string.charCodeAt(i));
        }
    },
    _traverseObj(data) {
        this._addMarker("object-start");
        //for the object start and end marks
        for (const key of Object.keys(data.value)) {
            let length = key.length;
            if (length > 255) {
                throw new Error("An object key cannot be longer then 255 chars.");
            }
            this._addMarker("name");
            this._addToken("8ui", key.length);
            this._tokenizeString(key);
            const node = data.value[key];
            if (node.typeName == "object" && !ArrayBuffer.isView(node.value)) {
                this._traverseObj(node);
                continue;
            }
            if (node.typeName == "array" && !ArrayBuffer.isView(node.value)) {
                this._traverseArray(node);
                continue;
            }
            this._tokenizePrimiives(node);
        }
        this._addMarker("object-end");
    },
    _traverseArray(data) {
        this._addMarker("array-start");
        //for object array start and end marks
        const array = data.value;
        for (const node of array) {
            if (typeof node.value == "object" &&
                !Array.isArray(node.value) &&
                !ArrayBuffer.isView(node.value)) {
                this._traverseObj(node);
                continue;
            }
            if (typeof node.value == "object" &&
                Array.isArray(node.value) &&
                !ArrayBuffer.isView(node.value)) {
                this._traverseArray(node);
                continue;
            }
            this._tokenizePrimiives(node);
        }
        this._addMarker("array-end");
    },
    _tokenizePrimiives(node) {
        if (node.typeName == "string") {
            this._addMarker("string");
            this._addToken("32ui", node.value.length);
            for (let i = 0; i < node.value.length; i++) {
                this._addToken("16ui", node.value.charCodeAt(i));
            }
            return;
        }
        if (typeof node.value == "number") {
            this._addMarker(node.typeName);
            this._addToken(node.primiteName, node.value);
            return;
        }
        if (typeof node.value == "boolean") {
            this._addMarker(node.typeName);
            this._addToken("8ui", node.value ? 0 : 1);
            return;
        }
        if (typeof node.value == "undefined") {
            this._addMarker(node.typeName);
            return;
        }
        if (node.typeName == "typed-array") {
            this._addMarker("typed-array");
            this._addToken("8ui", node.listType);
            this._addToken("32ui", node.value.length);
            let array = node.value;
            for (let i = 0; i < array.length; i++) {
                this._addToken(node.listTypeName, array[i]);
            }
        }
        if (node.typeName == "string-array") {
            this._addMarker("string-array");
            this._addToken("32ui", node.value.length);
            let array = node.value;
            for (let i = 0; i < array.length; i++) {
                const value = array[i];
                this._addToken("32ui", value.length);
                for (let k = 0; k < value.length; k++) {
                    this._addToken("16ui", value.charCodeAt(k));
                }
            }
            return;
        }
        if (node.typeName == "json") {
            let json = "";
            if (typeof node.value == "object") {
                json = JSON.stringify(node.value);
            }
            else {
                json = node.value;
            }
            this._addMarker("json");
            this._addToken("32ui", json.length);
            for (let i = 0; i < json.length; i++) {
                this._addToken("16ui", json.charCodeAt(i));
            }
            return;
        }
    },
    _tokenize(node) {
        //start as two bytes for the stand and end tags
        if (node.typeName == "object" && !Array.isArray(node.value)) {
            this._traverseObj(node);
        }
        if (node.typeName == "array" && Array.isArray(node.value)) {
            this._traverseArray(node);
        }
    },
    toBuffer(data, byteOffSet = 0) {
        this._addMarker("start");
        this._tokenize(data);
        this._addMarker("end");
        const array = Uint8Array.from(this._proto);
        this._proto = [];
        return array.buffer;
    },
    _addMarker(marker) {
        _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteParser.setValue("8ui", _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_0__.MetaValues[marker]).addBytes(this._proto);
    },
    _addToken(type, value) {
        _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.ByteParser.setValue(type, value).addBytes(this._proto);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineBinaryObject/dist/DBO/ObjectToBuffer.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/divineBinaryObject/dist/DBO/ObjectToBuffer.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectToBuffer": () => (/* binding */ ObjectToBuffer)
/* harmony export */ });
/* harmony import */ var _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/ByteData.js */ "../../DSLIBS/divineBinaryObject/dist/Constants/ByteData.js");
/* harmony import */ var _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Classes/TypedNode.js */ "../../DSLIBS/divineBinaryObject/dist/Classes/TypedNode.js");
/* harmony import */ var _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NodeMaker.js */ "../../DSLIBS/divineBinaryObject/dist/NodeMaker.js");
/* harmony import */ var _DBOToBuffer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DBOToBuffer.js */ "../../DSLIBS/divineBinaryObject/dist/DBO/DBOToBuffer.js");




const ObjectToBuffer = {
    _name: "",
    _traverseObj(obj) {
        const node = _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__.TNM.object({});
        for (const key of Object.keys(obj)) {
            const value = obj[key];
            this._name = key;
            if (value instanceof _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_1__.TypedNode) {
                node.value[key] = value;
                continue;
            }
            if (ArrayBuffer.isView(value)) {
                node.value[key] = this._addPrimitive(value);
                continue;
            }
            if (typeof value == "object" && !Array.isArray(value)) {
                node.value[key] = this._traverseObj(value);
                continue;
            }
            if (typeof value == "object" && Array.isArray(value)) {
                node.value[key] = this._traverseArray(value);
                continue;
            }
            node.value[key] = this._addPrimitive(value);
        }
        return node;
    },
    _traverseArray(array) {
        const node = _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__.TNM.array([]);
        for (const value of array) {
            if (value instanceof _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_1__.TypedNode) {
                node.value.push(value);
                continue;
            }
            if (ArrayBuffer.isView(value)) {
                node.value.push(this._addPrimitive(value));
                continue;
            }
            if (typeof value == "object" && !Array.isArray(value)) {
                node.value.push(this._traverseObj(value));
                continue;
            }
            if (typeof value == "object" && Array.isArray(value) && !ArrayBuffer.isView(value)) {
                node.value.push(this._traverseArray(value));
                continue;
            }
            node.value.push(this._addPrimitive(value));
        }
        return node;
    },
    _addPrimitive(node) {
        if (typeof node == "string") {
            return _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__.TNM.string(node);
        }
        if (typeof node == "number") {
            return _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__.TNM._64f(node);
        }
        if (typeof node == "boolean") {
            return _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__.TNM.boolean(node);
        }
        if (typeof node == "undefined") {
            return _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__.TNM.undefined();
        }
        if (ArrayBuffer.isView(node)) {
            //@ts-ignore
            if (_Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_0__.TypedArrayRecord.has(node.constructor)) {
                return _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__.TNM.typedArray(
                //@ts-ignore
                _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_0__.TypedArrayRecord.get(node.constructor), 
                //@ts-ignore
                node);
            }
        }
        if (node instanceof _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_1__.TypedNode) {
            return node;
        }
        throw new Error(`Unsuppourted type for DBO parser.`);
    },
    toDBO(object) {
        if (typeof object == "object" && !Array.isArray(object)) {
            const parent = _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__.TNM.object({});
            parent.value = this._traverseObj(object).value;
            return parent;
        }
        if (typeof object == "object" && Array.isArray(object)) {
            const parent = _NodeMaker_js__WEBPACK_IMPORTED_MODULE_2__.TNM.array([]);
            parent.value = this._traverseArray(object).value;
            return parent;
        }
        return this._addPrimitive(object);
    },
    toBuffer(object) {
        const dbo = this.toDBO(object);
        return _DBOToBuffer_js__WEBPACK_IMPORTED_MODULE_3__.DBOToBuffer.toBuffer(dbo);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineBinaryObject/dist/DivineBinaryObject.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/divineBinaryObject/dist/DivineBinaryObject.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DBO": () => (/* binding */ DBO)
/* harmony export */ });
/* harmony import */ var _NodeMaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeMaker.js */ "../../DSLIBS/divineBinaryObject/dist/NodeMaker.js");
/* harmony import */ var _DBO_BufferToDBO_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DBO/BufferToDBO.js */ "../../DSLIBS/divineBinaryObject/dist/DBO/BufferToDBO.js");
/* harmony import */ var _DBO_ObjectToBuffer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DBO/ObjectToBuffer.js */ "../../DSLIBS/divineBinaryObject/dist/DBO/ObjectToBuffer.js");
/* harmony import */ var _DBO_DBOToBuffer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DBO/DBOToBuffer.js */ "../../DSLIBS/divineBinaryObject/dist/DBO/DBOToBuffer.js");




const DBO = {
    nodes: _NodeMaker_js__WEBPACK_IMPORTED_MODULE_0__.TNM,
    bufferToObject(buffer, byteOffSet = 0) {
        return _DBO_BufferToDBO_js__WEBPACK_IMPORTED_MODULE_1__.BufferToDBO.toObject(buffer);
    },
    objectToBuffer(obj) {
        return _DBO_ObjectToBuffer_js__WEBPACK_IMPORTED_MODULE_2__.ObjectToBuffer.toBuffer(obj);
    },
    objectToDBO(object) {
        return _DBO_ObjectToBuffer_js__WEBPACK_IMPORTED_MODULE_2__.ObjectToBuffer.toDBO(object);
    },
    dboToBuffer(data) {
        return _DBO_DBOToBuffer_js__WEBPACK_IMPORTED_MODULE_3__.DBOToBuffer.toBuffer(data);
    },
    bufferToDBO(buffer, byteOffSet = 0, byteOffSetEnd = 0) {
        return _DBO_BufferToDBO_js__WEBPACK_IMPORTED_MODULE_1__.BufferToDBO.toDBO(buffer, byteOffSet, byteOffSetEnd);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineBinaryObject/dist/NodeMaker.js":
/*!*********************************************************!*\
  !*** ../../DSLIBS/divineBinaryObject/dist/NodeMaker.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TNM": () => (/* binding */ TNM)
/* harmony export */ });
/* harmony import */ var _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/TypedNode.js */ "../../DSLIBS/divineBinaryObject/dist/Classes/TypedNode.js");
/* harmony import */ var _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants/MetaValues.js */ "../../DSLIBS/divineBinaryObject/dist/Constants/MetaValues.js");
/* harmony import */ var _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants/ByteData.js */ "../../DSLIBS/divineBinaryObject/dist/Constants/ByteData.js");



const TNM = {
    json(data) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues.json, data);
    },
    DBO(data) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues.DBO, data);
    },
    object(data) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues.object, data);
    },
    array(data) {
        if (!Array.isArray(data))
            throw new Error("Data for array must be an array.");
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues.array, data);
    },
    _8i(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["8i"], value);
    },
    _8ui(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["8ui"], value);
    },
    _16i(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["16i"], value);
    },
    _16ui(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["16ui"], value);
    },
    _32ui(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["32ui"], value);
    },
    _32i(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["32i"], value);
    },
    _32f(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["32f"], value);
    },
    _64f(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["64f"], value);
    },
    bigi(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues.bigi, value);
    },
    bigui(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues.bigui, value);
    },
    boolean(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues.boolean, value);
    },
    undefined() {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues.undefined, undefined);
    },
    typedArray(type, value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["typed-array"], 
        //@ts-ignore
        ArrayBuffer.isView(value) ? value : _Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_2__.TypedArrayMap[type].from(value), _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues[type]);
    },
    stringArray(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["string-array"], value);
    },
    string(value) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues.string, value);
    },
    fixedString(value, length) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["fixed-string"], value, 0, length);
    },
    fixedTypedArray(type, value, length) {
        return new _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_0__.TypedNode(_Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues["fixed-typed-array"], value, _Constants_MetaValues_js__WEBPACK_IMPORTED_MODULE_1__.MetaValues[type], length);
    },
    toJSONString(json) {
        if (typeof json === "string") {
            json = JSON.parse(json);
        }
        let output = JSON.stringify(json, function (k, v) {
            if (v instanceof Array)
                return JSON.stringify(v);
            return v;
        }, 2)
            .replace(/\\/g, "")
            .replace(/\"\[/g, "[")
            .replace(/\]\"/g, "]")
            .replace(/\"\{/g, "{")
            .replace(/\}\"/g, "}");
        return output;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineBinaryObject/dist/index.js":
/*!*****************************************************!*\
  !*** ../../DSLIBS/divineBinaryObject/dist/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DBO": () => (/* reexport safe */ _DivineBinaryObject_js__WEBPACK_IMPORTED_MODULE_2__.DBO),
/* harmony export */   "TNM": () => (/* reexport safe */ _NodeMaker_js__WEBPACK_IMPORTED_MODULE_0__.TNM),
/* harmony export */   "TypedNode": () => (/* reexport safe */ _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_1__.TypedNode)
/* harmony export */ });
/* harmony import */ var _NodeMaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeMaker.js */ "../../DSLIBS/divineBinaryObject/dist/NodeMaker.js");
/* harmony import */ var _Classes_TypedNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes/TypedNode.js */ "../../DSLIBS/divineBinaryObject/dist/Classes/TypedNode.js");
/* harmony import */ var _DivineBinaryObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DivineBinaryObject.js */ "../../DSLIBS/divineBinaryObject/dist/DivineBinaryObject.js");





/***/ }),

/***/ "../../DSLIBS/divineBinaryTags/dist/Classes/TagManagerBase.js":
/*!********************************************************************!*\
  !*** ../../DSLIBS/divineBinaryTags/dist/Classes/TagManagerBase.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagManagerBase": () => (/* binding */ TagManagerBase)
/* harmony export */ });
/* harmony import */ var _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/DBTUtil.js */ "../../DSLIBS/divineBinaryTags/dist/Util/DBTUtil.js");

const TagIndexData = [0, 0, 0, 0];
const getIndexData = (data, indexBufferIndex) => {
    TagIndexData[0] = data.getUint32(indexBufferIndex);
    indexBufferIndex += _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("32ui");
    TagIndexData[1] = data.getUint8(indexBufferIndex);
    indexBufferIndex += _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("8ui");
    TagIndexData[2] = data.getUint8(indexBufferIndex);
    indexBufferIndex += _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("8ui");
    TagIndexData[3] = data.getUint8(indexBufferIndex);
    indexBufferIndex += _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("8ui");
    return TagIndexData;
};
class TagManagerBase {
    id;
    byteOffSet = 0;
    tagSize = 0;
    tagIndexes = 0;
    data = new DataView(new ArrayBuffer(0));
    indexMap = new Map();
    index = new DataView(new ArrayBuffer(0));
    constructor(id) {
        this.id = id;
    }
    setBuffer(data) {
        if (data instanceof DataView) {
            this.data = data;
            return;
        }
        this.data = new DataView(data);
    }
    getBuffer() {
        if (this.data instanceof DataView) {
            return this.data.buffer;
        }
        return this.data;
    }
    setTagIndex(index) {
        this.byteOffSet = index * this.tagSize;
    }
    getTag(id) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.boolean ||
            indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.number) {
            return _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getBitValue(this.data.getUint8(indexData[0] + this.byteOffSet), indexData[1], indexData[2]);
        }
        if (indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.typedNumber) {
            return _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedNumber(this.data, indexData[0] + this.byteOffSet, indexData[2]);
        }
        return -Infinity;
    }
    setTag(id, value) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.boolean ||
            indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.number) {
            this.data.setUint8(indexData[0] + this.byteOffSet, _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.setBitValue(this.data.getUint8(indexData[0] + this.byteOffSet), indexData[1], value, indexData[2]));
            return true;
        }
        if (indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.typedNumber) {
            _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.setTypedNumber(this.data, indexData[0] + this.byteOffSet, indexData[2], value);
            return true;
        }
        return false;
    }
    getArrayTagValue(id, index) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.typedNumberArray) {
            return _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedNumber(this.data, indexData[0] +
                this.byteOffSet +
                index * _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSizeFromNumber(indexData[2]), indexData[2]);
        }
        if (indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.bitArray) {
            return _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getBitArrayIndex(this.data, indexData[0] + this.byteOffSet, index);
        }
        throw new Error(`Tag with id: ${id} is not an array.`);
    }
    /**## getArrayTagByteIndex
     *  Get the actual byte index for the provided index of the array.
     * @param id
     * @param index
     * @returns
     */
    getArrayTagByteIndex(id, index) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.typedNumberArray) {
            return (indexData[0] +
                this.byteOffSet +
                index * _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSizeFromNumber(indexData[2]));
        }
        return -Infinity;
    }
    setArrayTagValue(id, index, value) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.typedNumberArray) {
            return _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.setTypedNumber(this.data, indexData[0] +
                this.byteOffSet +
                index * _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSizeFromNumber(indexData[2]), indexData[2], value);
        }
        if (indexData[3] == _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.bitArray) {
            return _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.setBitArrayIndex(this.data, indexData[0] + this.byteOffSet, index, value);
        }
        return -Infinity;
    }
    loopThroughTags(run) {
        this.indexMap.forEach((i, id) => {
            run(id, this.getTag(id));
        });
    }
    loopThroughIndex(run) {
        this.indexMap.forEach((index, id) => {
            const indexData = getIndexData(this.index, index);
            run(indexData);
        });
    }
    loopThroughAllIndexTags(run) {
        for (let index = 0; index < this.tagIndexes; index++) {
            this.setTagIndex(index);
            this.indexMap.forEach((i, id) => {
                run(id, this.getTag(id), index);
            });
        }
    }
}


/***/ }),

/***/ "../../DSLIBS/divineBinaryTags/dist/DivineBinaryTags.js":
/*!**************************************************************!*\
  !*** ../../DSLIBS/divineBinaryTags/dist/DivineBinaryTags.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DivineBinaryTags": () => (/* binding */ DivineBinaryTags)
/* harmony export */ });
/* harmony import */ var _RemoteTagManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RemoteTagManager.js */ "../../DSLIBS/divineBinaryTags/dist/RemoteTagManager.js");
/* harmony import */ var _TagManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagManager.js */ "../../DSLIBS/divineBinaryTags/dist/TagManager.js");


const DivineBinaryTags = {
    createTagManager(id) {
        return new _TagManager_js__WEBPACK_IMPORTED_MODULE_1__.TagManager(id);
    },
    createRemoteTagManager(id) {
        return new _RemoteTagManager_js__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager(id);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineBinaryTags/dist/RemoteTagManager.js":
/*!**************************************************************!*\
  !*** ../../DSLIBS/divineBinaryTags/dist/RemoteTagManager.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RemoteTagManager": () => (/* binding */ RemoteTagManager)
/* harmony export */ });
/* harmony import */ var _Classes_TagManagerBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/TagManagerBase.js */ "../../DSLIBS/divineBinaryTags/dist/Classes/TagManagerBase.js");

class RemoteTagManager extends _Classes_TagManagerBase_js__WEBPACK_IMPORTED_MODULE_0__.TagManagerBase {
    id;
    initData;
    constructor(id) {
        super(id);
        this.id = id;
    }
    $INIT(data) {
        this.data = new DataView(data.buffer);
        this.index = new DataView(data.indexBuffer);
        this.indexMap = data.indexMap;
        this.tagIndexes = data.totalIndexes;
        this.tagSize = data.tagSize;
        this.initData = data;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineBinaryTags/dist/TagManager.js":
/*!********************************************************!*\
  !*** ../../DSLIBS/divineBinaryTags/dist/TagManager.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagManager": () => (/* binding */ TagManager)
/* harmony export */ });
/* harmony import */ var _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util/DBTUtil.js */ "../../DSLIBS/divineBinaryTags/dist/Util/DBTUtil.js");
/* harmony import */ var _Classes_TagManagerBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes/TagManagerBase.js */ "../../DSLIBS/divineBinaryTags/dist/Classes/TagManagerBase.js");


const TagIndexSize = _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("32ui") + _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("8ui") * 3;
const setIndexData = (data, indexBufferIndex, byteIndex, bitOffSet, bitSize, type) => {
    data.setUint32(indexBufferIndex, byteIndex);
    indexBufferIndex += _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("32ui");
    data.setUint8(indexBufferIndex, bitOffSet);
    indexBufferIndex += _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("8ui");
    data.setUint8(indexBufferIndex, bitSize);
    indexBufferIndex += _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("8ui");
    data.setUint8(indexBufferIndex, type);
    indexBufferIndex += _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize("8ui");
    return indexBufferIndex;
};
class TagManager extends _Classes_TagManagerBase_js__WEBPACK_IMPORTED_MODULE_1__.TagManagerBase {
    id;
    schema = new Map();
    initData = {};
    constructor(id) {
        super(id);
        this.id = id;
    }
    registerTag(tagData) {
        this.schema.set(tagData.id, tagData);
    }
    $INIT(initData) {
        /*
    [Process Tags]
    */
        const headers = new Map();
        const booleans = [];
        const numbers = [];
        const typedNumbers = new Map();
        const typedNumbersArrays = new Map();
        const bitArrays = [];
        this.schema.forEach((tag) => {
            if (tag.type == "header") {
                let tags = headers.get(tag.numberType);
                if (!tags) {
                    tags = [];
                    headers.set(tag.numberType, tags);
                }
                tags.push(tag);
            }
            if (tag.type == "boolean") {
                booleans.push(tag);
            }
            if (tag.type == "number") {
                const range = tag.range;
                const bitSize = _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.calculateBitsNeeded(range[0], range[1]);
                numbers[bitSize] ??= [];
                numbers[bitSize].push(tag);
            }
            if (tag.type == "typed-number") {
                let tags = typedNumbers.get(tag.numberType);
                if (!tags) {
                    tags = [];
                    typedNumbers.set(tag.numberType, tags);
                }
                tags.push(tag);
            }
            if (tag.type == "typed-number-array") {
                let arrayTags = typedNumbersArrays.get(tag.numberType);
                if (!arrayTags) {
                    arrayTags = [];
                    typedNumbersArrays.set(tag.numberType, arrayTags);
                }
                arrayTags.push(tag);
            }
            if (tag.type == "bit-array") {
                bitArrays.push(tag);
            }
        });
        /*
    [Build Index]
    */
        const indexSize = this.schema.size * TagIndexSize;
        let indexBuffer = new ArrayBuffer(indexSize);
        if (initData?.indexBufferMode == "shared") {
            indexBuffer = new SharedArrayBuffer(indexSize);
        }
        const index = new DataView(indexBuffer);
        this.index = index;
        let indexBufferIndex = 0;
        let byteIndex = 0;
        let bitIndex = 0;
        let bitSize = 1;
        /*
    [Headers]
    */
        headers.forEach((tags, type) => {
            const byteSise = _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize(type);
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.NumberTypeRecord[tag.numberType], _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.typedNumber);
                byteIndex += byteSise;
            }
        });
        /*
    [Booleans]
    */
        bitSize = 1;
        for (let i = 0; i < booleans.length; i++) {
            const bool = booleans[i];
            this.indexMap.set(bool.id, indexBufferIndex);
            indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, bitIndex, bitSize, _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.boolean);
            bitIndex++;
            if (bitIndex >= 8) {
                byteIndex++;
                bitIndex = 0;
            }
        }
        /*
    [Ranged Numbers]
    */
        byteIndex++;
        bitIndex = 0;
        let cachedBitSize = 0;
        numbers.forEach((tags, bitS) => {
            bitSize = bitS;
            if (cachedBitSize != bitSize) {
                byteIndex++;
                bitIndex = 0;
            }
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, bitIndex, bitSize, _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.number);
                bitIndex += bitSize;
                if (bitIndex >= 8) {
                    byteIndex++;
                    bitIndex = 0;
                }
            }
        });
        /*
    [Typed Numbers]
    */
        bitIndex = 0;
        byteIndex++;
        typedNumbers.forEach((tags, type) => {
            const byteSise = _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize(type);
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.NumberTypeRecord[tag.numberType], _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.typedNumber);
                byteIndex += byteSise;
            }
        });
        /*
    [Typed Numbers Arrays]
    */
        byteIndex++;
        typedNumbersArrays.forEach((tags, type) => {
            const byteSise = _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.DBTUtil.getTypedSize(type);
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.NumberTypeRecord[tag.numberType], _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.typedNumberArray);
                byteIndex += byteSise * tag.length;
            }
        });
        byteIndex++;
        bitArrays.forEach((tag) => {
            const byteSise = Math.ceil(tag.length / 8) + 1;
            this.indexMap.set(tag.id, indexBufferIndex);
            indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, byteSise, _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_0__.TagNodeTypes.bitArray);
            byteIndex += byteSise;
        });
        /*
    [Create Remote Tag Manager Data]
    */
        let numberOfIndexes = 1;
        if (initData?.numberOfIndexes) {
            numberOfIndexes = initData.numberOfIndexes;
        }
        this.tagIndexes = numberOfIndexes;
        this.tagSize = byteIndex;
        const remoteData = {
            bufferSize: byteIndex * numberOfIndexes,
            buffer: new ArrayBuffer(0),
            indexBuffer: indexBuffer,
            indexMap: this.indexMap,
            tagSize: this.tagSize,
            totalIndexes: numberOfIndexes,
        };
        this.initData = remoteData;
        return remoteData;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineBinaryTags/dist/Types/DBTSchema.types.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/divineBinaryTags/dist/Types/DBTSchema.types.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/divineBinaryTags/dist/Types/Util.types.js":
/*!**************************************************************!*\
  !*** ../../DSLIBS/divineBinaryTags/dist/Types/Util.types.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/divineBinaryTags/dist/Util/DBTUtil.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/divineBinaryTags/dist/Util/DBTUtil.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DBTUtil": () => (/* binding */ DBTUtil),
/* harmony export */   "NumberTypeMap": () => (/* binding */ NumberTypeMap),
/* harmony export */   "NumberTypeRecord": () => (/* binding */ NumberTypeRecord),
/* harmony export */   "TagNodeTypes": () => (/* binding */ TagNodeTypes)
/* harmony export */ });
const TagNodeTypes = {
    boolean: 0,
    number: 1,
    typedNumber: 2,
    typedNumberArray: 3,
    bitArray: 4,
};
const NumberTypeByteSize = {
    "8ui": 1,
    "8i": 1,
    "16ui": 2,
    "16i": 2,
    "32ui": 4,
    "32i": 4,
    "32f": 4,
    "64f": 8,
    "64i": 8,
    "64ui": 8,
};
const NumberTypeRecord = {
    "8ui": 0,
    "8i": 1,
    "16ui": 2,
    "16i": 3,
    "32ui": 4,
    "32i": 5,
    "32f": 6,
    "64f": 7,
    "64i": 8,
    "64ui": 9,
};
const NumberTypeMap = {};
for (const key of Object.keys(NumberTypeRecord)) {
    //@ts-ignore
    NumberTypeMap[Number(NumberTypeRecord[key])] = key;
}
const TypedNumberSetFunctions = {
    "8ui": (d, i, v) => d.setUint8(i, v),
    "8i": (d, i, v) => d.setInt8(i, v),
    "16ui": (d, i, v) => d.setUint16(i, v),
    "16i": (d, i, v) => d.setInt16(i, v),
    "32ui": (d, i, v) => d.setUint32(i, v),
    "32i": (d, i, v) => d.setInt32(i, v),
    "32f": (d, i, v) => d.setFloat32(i, v),
    "64f": (d, i, v) => d.setFloat64(i, v),
    "64i": (d, i, v) => d.setBigUint64(i, BigInt(v)),
    "64ui": (d, i, v) => d.setBigUint64(i, BigInt(v)),
};
const TypedNumberGetFunctions = {
    "8ui": (d, i) => d.getUint8(i),
    "8i": (d, i) => d.getInt8(i),
    "16ui": (d, i) => d.getUint16(i),
    "16i": (d, i) => d.getInt16(i),
    "32ui": (d, i) => d.getUint32(i),
    "32i": (d, i) => d.getInt32(i),
    "32f": (d, i) => d.getFloat32(i),
    "64f": (d, i) => d.getFloat64(i),
    "64i": (d, i) => Number(d.getBigUint64(i)),
    "64ui": (d, i) => Number(d.getBigUint64(i)),
};
const DBTUtil = {
    setTypedNumber(data, index, numberType, value) {
        TypedNumberSetFunctions[NumberTypeMap[numberType]](data, index, value);
    },
    getTypedNumber(data, index, numberType) {
        return TypedNumberGetFunctions[NumberTypeMap[numberType]](data, index);
    },
    calculateBitsNeeded(min, max) {
        let range = max - min;
        return Math.ceil(Math.log2(range));
    },
    getTypedSize(type) {
        return NumberTypeByteSize[type];
    },
    getTypedSizeFromNumber(t) {
        return NumberTypeByteSize[NumberTypeMap[t]];
    },
    getBitValue(data, index, bitSize) {
        index *= bitSize;
        const mask = 2 ** bitSize - 1;
        return ((mask << index) & data) >>> index;
    },
    setBitValue(data, index, value, bitSize) {
        index *= bitSize;
        const mask = 2 ** bitSize - 1;
        return (data & ~(mask << index)) | ((value & mask) << index);
    },
    getBitArrayIndex(data, byteIndex, arrayIndex) {
        const arrayByteIndex = (arrayIndex / 8) >> 0;
        const arrayBitIndex = arrayIndex - arrayByteIndex * 8;
        const arrayByte = data.getUint8(arrayByteIndex + byteIndex);
        return this.getBitValue(arrayByte, arrayBitIndex, 1);
    },
    setBitArrayIndex(data, byteIndex, arrayIndex, value) {
        const arrayByteIndex = (arrayIndex / 8) >> 0;
        const arrayBitIndex = arrayIndex - arrayByteIndex * 8;
        const arrayByte = data.getUint8(arrayByteIndex + byteIndex);
        data.setUint8(arrayByteIndex + byteIndex, this.setBitValue(arrayByte, arrayBitIndex, value, 1));
    },
};


/***/ }),

/***/ "../../DSLIBS/divineBinaryTags/dist/index.js":
/*!***************************************************!*\
  !*** ../../DSLIBS/divineBinaryTags/dist/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DBTUtil": () => (/* reexport safe */ _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_6__.DBTUtil),
/* harmony export */   "DivineBinaryTags": () => (/* reexport safe */ _DivineBinaryTags_js__WEBPACK_IMPORTED_MODULE_0__.DivineBinaryTags),
/* harmony export */   "NumberTypeMap": () => (/* reexport safe */ _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_6__.NumberTypeMap),
/* harmony export */   "NumberTypeRecord": () => (/* reexport safe */ _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_6__.NumberTypeRecord),
/* harmony export */   "RemoteTagManager": () => (/* reexport safe */ _RemoteTagManager_js__WEBPACK_IMPORTED_MODULE_1__.RemoteTagManager),
/* harmony export */   "TagManager": () => (/* reexport safe */ _TagManager_js__WEBPACK_IMPORTED_MODULE_2__.TagManager),
/* harmony export */   "TagManagerBase": () => (/* reexport safe */ _Classes_TagManagerBase_js__WEBPACK_IMPORTED_MODULE_3__.TagManagerBase),
/* harmony export */   "TagNodeTypes": () => (/* reexport safe */ _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_6__.TagNodeTypes)
/* harmony export */ });
/* harmony import */ var _DivineBinaryTags_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DivineBinaryTags.js */ "../../DSLIBS/divineBinaryTags/dist/DivineBinaryTags.js");
/* harmony import */ var _RemoteTagManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RemoteTagManager.js */ "../../DSLIBS/divineBinaryTags/dist/RemoteTagManager.js");
/* harmony import */ var _TagManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TagManager.js */ "../../DSLIBS/divineBinaryTags/dist/TagManager.js");
/* harmony import */ var _Classes_TagManagerBase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Classes/TagManagerBase.js */ "../../DSLIBS/divineBinaryTags/dist/Classes/TagManagerBase.js");
/* harmony import */ var _Types_DBTSchema_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Types/DBTSchema.types.js */ "../../DSLIBS/divineBinaryTags/dist/Types/DBTSchema.types.js");
/* harmony import */ var _Types_Util_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Types/Util.types.js */ "../../DSLIBS/divineBinaryTags/dist/Types/Util.types.js");
/* harmony import */ var _Util_DBTUtil_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Util/DBTUtil.js */ "../../DSLIBS/divineBinaryTags/dist/Util/DBTUtil.js");









/***/ }),

/***/ "../../DSLIBS/divineHooks/dist/Classes/AsyncHook.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/divineHooks/dist/Classes/AsyncHook.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncHook": () => (/* binding */ AsyncHook)
/* harmony export */ });
class AsyncHook {
    _onRun = [];
    async run(data) {
        let returnData = false;
        for (const run of this._onRun) {
            returnData = await run(data);
        }
        return returnData;
    }
    addToRun(run) {
        this._onRun.push(run);
    }
}


/***/ }),

/***/ "../../DSLIBS/divineHooks/dist/Classes/SyncHook.js":
/*!*********************************************************!*\
  !*** ../../DSLIBS/divineHooks/dist/Classes/SyncHook.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyncHook": () => (/* binding */ SyncHook)
/* harmony export */ });
class SyncHook {
    _onRun = [];
    run(data) {
        let returnData = false;
        for (const run of this._onRun) {
            returnData = run(data);
        }
        return returnData;
    }
    addToRun(run) {
        this._onRun.push(run);
    }
}


/***/ }),

/***/ "../../DSLIBS/divineHooks/dist/Hooks.js":
/*!**********************************************!*\
  !*** ../../DSLIBS/divineHooks/dist/Hooks.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hooks": () => (/* binding */ Hooks)
/* harmony export */ });
/* harmony import */ var _Classes_AsyncHook_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/AsyncHook.js */ "../../DSLIBS/divineHooks/dist/Classes/AsyncHook.js");
/* harmony import */ var _Classes_SyncHook_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes/SyncHook.js */ "../../DSLIBS/divineHooks/dist/Classes/SyncHook.js");


const Hooks = {
    getAsyncHook() {
        return new _Classes_AsyncHook_js__WEBPACK_IMPORTED_MODULE_0__.AsyncHook();
    },
    getSyncHook() {
        return new _Classes_SyncHook_js__WEBPACK_IMPORTED_MODULE_1__.SyncHook();
    },
};


/***/ }),

/***/ "../../DSLIBS/divineHooks/dist/index.js":
/*!**********************************************!*\
  !*** ../../DSLIBS/divineHooks/dist/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hooks": () => (/* reexport safe */ _Hooks_js__WEBPACK_IMPORTED_MODULE_0__.Hooks)
/* harmony export */ });
/* harmony import */ var _Hooks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hooks.js */ "../../DSLIBS/divineHooks/dist/Hooks.js");



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/DataSyncIds.js":
/*!***********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/DataSyncIds.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSyncIds": () => (/* binding */ DataSyncIds)
/* harmony export */ });
const DataSyncIds = {
    chunk: 0,
    column: 1,
    region: 2,
    regionHeader: 2,
    voxelPalette: 3,
    voxelTags: 4,
    materials: 4,
    colliders: 4,
    dimesnion: 5,
    chunkTags: 6,
    columnTags: 7,
    regionTags: 8,
    substanceTags: 8,
    substancePalette: 8,
    registerStringMap: 0,
    registerObjectMap: 0,
};
let index = 0;
for (const key of Object.keys(DataSyncIds)) {
    DataSyncIds[key] = index;
    index++;
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/ChunkTagIds.js":
/*!******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/ChunkTagIds.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChunkTagIDs": () => (/* binding */ ChunkTagIDs)
/* harmony export */ });
const ChunkTagIDs = {
    minHeight: "#dve_min_height",
    maxHeight: "#dve_max_height",
    heightMap: "#dve_height_map",
    dirtyMap: "#dve_dirty_map",
    voxelIDSegment: "#dve_voxel_id",
    voxelLightSegment: "#dve_voxel_light",
    voxelStateSegment: "#dve_voxel_state",
    voxelSecondaryIDSegment: "#dve_voxel_secondary_id",
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/SubstanceTagIds.js":
/*!**********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/SubstanceTagIds.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubstanceTagIds": () => (/* binding */ SubstanceTagIds)
/* harmony export */ });
const SubstanceTagIds = {
    parent: "#dve_parent_substance",
    rendered: "#dve_rendered_substance",
    isSolid: "#dve_is_solid",
    isLiquid: "#dve_is_liquid",
    flowRate: "#dve_flow_rate",
    culledSubstnaces: "#dve_culled_substances",
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/VoxelTagIds.js":
/*!******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/VoxelTagIds.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelTagIDs": () => (/* binding */ VoxelTagIDs)
/* harmony export */ });
const VoxelTagIDs = {
    substance: "#dve_substance",
    shapeID: "#dve_shape_id",
    material: "#dve_material",
    hardness: "#dve_hardness",
    colliderID: "#dve_collider_id",
    checkCollisions: "#dve_check_collisions",
    isLightSource: "#dve_is_light_source",
    lightValue: "#dve_light_value",
    isRich: "#dve_is_rich",
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/WorldDataTagIds.js":
/*!**********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/WorldDataTagIds.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldDataTagIDs": () => (/* binding */ WorldDataTagIDs)
/* harmony export */ });
const WorldDataTagIDs = {
    header: "#dve_header",
    dataType: "#dve_data_type",
    dimensionId: "#dve_dimension_id",
    positionX: "#dve_p_x",
    positionY: "#dve_p_y",
    positionZ: "#dve_p_z",
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js":
/*!*************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataHooks": () => (/* binding */ DataHooks)
/* harmony export */ });
/* harmony import */ var divine_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-hooks */ "../../DSLIBS/divineHooks/dist/index.js");

const DataHooks = {
    dimension: {
        onRegisterDimension: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
    },
    chunk: {
        onGetAsync: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getAsyncHook(),
        onGetSync: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
        onNew: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getAsyncHook(),
        onRemove: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
    },
    column: {
        onGetAsync: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getAsyncHook(),
        onGetSync: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
        onNew: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getAsyncHook(),
        onRemove: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
    },
    region: {
        onGetAsync: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getAsyncHook(),
        onGetSync: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
        onNew: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getAsyncHook(),
        onRemove: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
    },
    paint: {
        onAddToRGBUpdate: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
        onRichVoxelPaint: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
    },
    settingsSynced: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/DataManager.js":
/*!***************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/DataManager.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataManager": () => (/* binding */ DataManager)
/* harmony export */ });
/* harmony import */ var _World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./World/Dimensions/DimensionsRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Dimensions/DimensionsRegister.js");
/* harmony import */ var _Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register/MappedDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Register/MappedDataRegister.js");
/* harmony import */ var _Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Voxel/VoxelTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelTags.js");
/* harmony import */ var _World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./World/WorldBounds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldBounds.js");
/* harmony import */ var _World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./World/WorldPainter.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldPainter.js");
/* harmony import */ var _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./World/Chunk/ChunkTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Chunk/ChunkTags.js");
/* harmony import */ var _World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./World/Column/ColumnTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Column/ColumnTags.js");
/* harmony import */ var _World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./World/Region/RegionTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionTags.js");
/* harmony import */ var _World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./World/Region/RegionHeaderRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionHeaderRegister.js");
/* harmony import */ var _Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Substance/SubstanceTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstanceTags.js");












const DataManager = {
    world: _World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_4__.WorldPainter,
    worldBounds: _World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_3__.WorldBounds,
    spaces: _World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_9__.WorldSpaces,
    registers: {
        dimensions: _World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_0__.DimensionsRegister,
        world: _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_5__.WorldRegister,
        mapped: _Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_1__.MappedDataRegister,
        regionHeader: _World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_10__.RegionHeaderRegister,
    },
    tags: {
        voxels: _Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags,
        substances: _Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_11__.SubstanceTags,
        chunks: _World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_6__.ChunkTags,
        column: _World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_7__.ColumnTags,
        region: _World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_8__.RegionTags,
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LightData": () => (/* binding */ LightData)
/* harmony export */ });
/**# Light Byte
 * ---
 * Used to decode light color info.
 */
const LightData = {
    SRS: 2,
    _lightValues: [0, 0, 0, 0],
    getS(value) {
        return value & 0xf;
    },
    getR(value) {
        return (value & (0xf << 4)) >> 4;
    },
    getG(value) {
        return (value & (0xf << 8)) >> 8;
    },
    getB(value) {
        return (value & (0xf << 12)) >> 12;
    },
    setS(value, sl) {
        return (sl & ~0xf) | value;
    },
    setR(value, sl) {
        return (sl & ~(0xf << 4)) | (value << 4);
    },
    setG(value, sl) {
        return (sl & ~(0xf << 8)) | (value << 8);
    },
    setB(value, sl) {
        return (sl & ~(0xf << 12)) | (value << 12);
    },
    removeS(sl) {
        return this.setS(0, sl);
    },
    hasRGBLight(sl) {
        if (sl <= 0)
            return false;
        if (this.getR(sl) > 0)
            return true;
        if (this.getG(sl) > 0)
            return true;
        if (this.getB(sl) > 0)
            return true;
        return false;
    },
    hasSunLight(sl) {
        if (sl <= 0)
            return false;
        if (this.getS(sl) > 0)
            return true;
        return false;
    },
    mixLight(l1, l2) {
        const s1 = this.getS(l1);
        const s2 = this.getS(l2);
        const s = s1 < s2 ? s2 : s1;
        const r1 = this.getR(l1);
        const r2 = this.getR(l2);
        const r = r1 < r2 ? r2 : r1;
        const g1 = this.getG(l1);
        const g2 = this.getG(l2);
        const g = g1 < g2 ? g2 : g1;
        const b1 = this.getB(l1);
        const b2 = this.getB(l2);
        const b = b1 < b2 ? b2 : b1;
        let nl = this.setS(s, 0);
        nl = this.setR(r, nl);
        nl = this.setG(g, nl);
        nl = this.setB(b, nl);
        return nl;
    },
    getRGB(sl) {
        if (sl < 0)
            return 0;
        return (sl & 0xfff0) >> 4;
    },
    setRGB(value, sl) {
        if (sl < 0)
            return 0;
        return (sl & ~0xfff0) | (value << 4);
    },
    decodeLightFromVoxelData(voxelData) {
        return (voxelData & (0xffff << 0)) >> 0;
    },
    encodeLightIntoVoxelData(voxelData, encodedLight) {
        return (voxelData & ~(0xffff << 0)) | (encodedLight << 0);
    },
    /**# Set Light Values
     * ---
     * Give an array of light values it will return an encoded light number.
     * @param values
     */
    setLightValues(values) {
        let value = this.setS(values[0], 0);
        value = this.setR(values[1], value);
        value = this.setG(values[2], value);
        return this.setB(values[3], value);
    },
    /**# Get Light Values
     * ---
     * Given an encoded light number it will return an array of its values.
     * - 0: Sun Light
     * - 1: Red Light
     * - 2: Green Light
     * - 3: Blue Light
     * @param value
     */
    getLightValues(value) {
        this._lightValues[0] = this.getS(value);
        this._lightValues[1] = this.getR(value);
        this._lightValues[2] = this.getG(value);
        this._lightValues[3] = this.getB(value);
        return this._lightValues;
    },
    /**# Is Less Than For RGB Remove
     * ---
     * Compares values for the RGB encoded light values.
     * Used for RGB light remove.
     * @param n1
     * @param n2
     */
    isLessThanForRGBRemove(n1, n2) {
        let r1 = this.getR(n1);
        let g1 = this.getG(n1);
        let b1 = this.getB(n1);
        let r2 = this.getR(n2);
        let g2 = this.getG(n2);
        let b2 = this.getB(n2);
        return r1 < r2 || g1 < g2 || b1 < b2;
    },
    /**# Is Less Than For RGB Add
     * ---
     * Compares values for the RGB encoded light values.
     * Used for RGB light add.
     * @param n1
     * @param n2
     */
    isLessThanForRGBAdd(n1, n2) {
        let r1 = this.getR(n1) + 2;
        let g1 = this.getG(n1) + 2;
        let b1 = this.getB(n1) + 2;
        let r2 = this.getR(n2);
        let g2 = this.getG(n2);
        let b2 = this.getB(n2);
        return r1 <= r2 || g1 <= g2 || b1 <= b2;
    },
    /**# Is Greater Or Equal Than For RGB Remove
     * ---
     * Compares values for the RGB encoded light values.
     * Used for RGB light remove.
     * @param n1
     * @param n2
     */
    isGreaterOrEqualThanForRGBRemove(n1, n2) {
        let r1 = this.getR(n1);
        let g1 = this.getG(n1);
        let b1 = this.getB(n1);
        let r2 = this.getR(n2);
        let g2 = this.getG(n2);
        let b2 = this.getB(n2);
        return r1 >= r2 || g1 >= g2 || b1 >= b2;
    },
    /**# Get Minus One For RGB
     * ---
     * Returns the RGB light values minus one.
     * @param sl - source light value
     */
    getMinusOneForRGB(sl, nl) {
        let s = this.getS(nl);
        let r = this.getR(sl) - 1;
        if (r < 0)
            r = 0;
        let rn = this.getR(nl);
        if (r < rn) {
            r = rn;
        }
        let g = this.getG(sl) - 1;
        if (g < 0)
            g = 0;
        let gn = this.getG(nl);
        if (g < gn) {
            g = gn;
        }
        let b = this.getB(sl) - 1;
        if (b < 0)
            b = 0;
        let bn = this.getB(nl);
        if (b < bn) {
            b = bn;
        }
        let bv = 0;
        bv = this.setS(s, bv);
        bv = this.setR(r, bv);
        bv = this.setG(g, bv);
        bv = this.setB(b, bv);
        return bv;
    },
    /**# Remove RGB Light
     * ---
     * Removes all RGB light from an encoded light value.
     * @param sl - source light value
     */
    removeRGBLight(sl) {
        let s = this.getS(sl);
        let bv = 0;
        bv = this.setR(0, bv);
        bv = this.setG(0, bv);
        bv = this.setB(0, bv);
        bv = this.setS(s, bv);
        return bv;
    },
    /**# Get Full Sun Light
     * --
     * Alters the encoded light number passed to it to give it full sun light.
     * @param sl - source light value
     */
    getFullSunLight(sl) {
        return sl | 0b1111;
    },
    /**# Is Less Than For Sun Add
     * ---
     * Used to calculate sun light addition.
     * Used to check all neighbors expect down.
     * @param n1
     * @param n2
     */
    isLessThanForSunAdd(n1, n2) {
        let sl1 = this.getS(n1);
        let sl2 = this.getS(n2);
        return sl1 + this.SRS < sl2;
    },
    /**# Is Less Than For Sun Add Down
     *
     * Used to calculate sun light addition.
     * Used to check only the down neighbor.
     * @param n1
     * @param n2
     */
    isLessThanForSunAddDown(n1, n2) {
        let sl1 = this.getS(n1);
        let sl2 = this.getS(n2);
        if (sl2 == 0xf) {
            return sl1 < sl2;
        }
        return sl1 + this.SRS < sl2;
    },
    isLessThanForSunAddUp(n1, n2) {
        let sl1 = this.getS(n1);
        let sl2 = this.getS(n2);
        if (sl1 == sl2)
            return false;
        if (sl2 == 0xf || sl1 == 0xf)
            return false;
        return sl1 + this.SRS < sl2;
    },
    /**# Get Sun Light For Under Voxel
     * ---
     * Gets the sun light value for sun light addition when setting the
     * down neighbor.
     * @param currentVoxel
     */
    getSunLightForUnderVoxel(sl, nl) {
        let s = this.getS(sl);
        let sn = this.getS(nl);
        if (s == 15) {
            sn = s;
        }
        if (s < 15) {
            sn = s - this.SRS;
        }
        let r = this.getR(nl);
        let g = this.getG(nl);
        let b = this.getB(nl);
        let bv = 0;
        bv = this.setS(sn, bv);
        bv = this.setR(r, bv);
        bv = this.setG(g, bv);
        bv = this.setB(b, bv);
        return bv;
    },
    /**# Get Minus One For Sun
     * ---
     * Returns the sun light level passed to it minus one.
     * Used for sun light addition on all neighbors expect the down one.
     * @param sl - source light value
     */
    getMinusOneForSun(sl, nl) {
        let s = this.getS(sl) - this.SRS;
        if (s < 0)
            s = 0;
        let sn = this.getS(nl);
        if (s < sn) {
            s = sn;
        }
        let r = this.getR(nl);
        let g = this.getG(nl);
        let b = this.getB(nl);
        let bv = 0;
        bv = this.setS(s, bv);
        bv = this.setR(r, bv);
        bv = this.setG(g, bv);
        bv = this.setB(b, bv);
        return bv;
    },
    /**# Is Less Than For Sun Remove
     * ---
     * Compares two encoded light values sun light values.
     * Used for sun light removal.
     * @param n1
     * @param sl - source light value
     */
    isLessThanForSunRemove(n1, sl) {
        let s1 = this.getS(n1);
        let s2 = this.getS(sl);
        return s1 < s2;
    },
    /**# Is Greater Or Equal Than For Sun Remove
     * ---
     * Compares two encoded light values sun light values.
     * Used for sun light removal.
     * @param n1
     * @param sl - source light value
     */
    isGreaterOrEqualThanForSunRemove(n1, sl) {
        let s1 = this.getS(n1);
        let s2 = this.getS(sl);
        return s1 >= s2;
    },
    /**# Sun Light Compare For Down Sun Remove
     * ---
     * Compares two encoded light values sun light values.
     * Used for sun light removal in the downward direction only.
     * @param n1
     * @param sl - source light value
     */
    sunLightCompareForDownSunRemove(n1, sl) {
        let s2 = this.getS(sl);
        if (s2 == 0xf)
            return true;
        let s1 = this.getS(n1);
        return s1 < s2;
    },
    /**# Remove Sun Light
     * ---
     * Removes the sun light from a light encoded value.
     * @param sl - source light value
     */
    removeSunLight(sl) {
        return this.removeS(sl);
    },
    minusOneForAll(sl) {
        let s = this.getS(sl) - this.SRS;
        let r = this.getR(sl) - 1;
        let g = this.getG(sl) - 1;
        let b = this.getB(sl) - 1;
        if (s < 0)
            s = 0;
        if (r < 0)
            r = 0;
        if (g < 0)
            g = 0;
        if (b < 0)
            b = 0;
        let nl = this.setS(s, 0);
        nl = this.setR(r, nl);
        nl = this.setG(g, nl);
        nl = this.setB(b, nl);
        return nl;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Register/MappedDataRegister.js":
/*!*******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Register/MappedDataRegister.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MappedDataRegister": () => (/* binding */ MappedDataRegister)
/* harmony export */ });
const MappedDataRegister = {
    stringMaps: {
        segments: new Map(),
        sync(data) {
            const [segment, id, value] = data;
            let segmentMap = this.segments.get(segment);
            if (!segmentMap) {
                segmentMap = new Map();
                this.segments.set(segment, segmentMap);
            }
            segmentMap.set(id, value);
            return;
        },
        get(segment, id, index) {
            const segmentMap = this.segments.get(segment);
            if (!segmentMap)
                return "";
            const stringMap = segmentMap.get(id);
            if (!stringMap) {
                return "";
            }
            return stringMap[index];
        },
    },
    objectMaps: {
        segments: new Map(),
        sync(data) {
            const [segment, id, value] = data;
            let segmentMap = this.segments.get(segment);
            if (!segmentMap) {
                segmentMap = new Map();
                this.segments.set(segment, segmentMap);
            }
            segmentMap.set(id, value);
            return;
        },
        get(segment, id, index) {
            const segmentMap = this.segments.get(segment);
            if (!segmentMap)
                return null;
            const objectMap = segmentMap.get(id);
            if (!objectMap) {
                return null;
            }
            return objectMap[index];
        },
    },
};
MappedDataRegister.stringMaps.segments.set("voxel", new Map());
MappedDataRegister.stringMaps.segments.set("substance", new Map());
MappedDataRegister.objectMaps.segments.set("substance", new Map());


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EngineSettings": () => (/* binding */ EngineSettings)
/* harmony export */ });
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../World/WorldBounds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldBounds.js");
/* harmony import */ var _World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");



/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
const EngineSettings = {
    enviorment: _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__.Util.getEnviorment(),
    //context: <EngineSettingsContext>"MatrixLoadedThread",
    settings: {
        nexus: {
            enabled: false,
            autoSyncChunks: true,
            autoSyncVoxelPalette: true,
        },
        data: {
            enabled: false,
            autoSyncChunks: true,
            mode: "server",
        },
        fx: {
            enabled: false,
            autoSyncChunks: true,
            autoSyncVoxelPalette: true,
        },
        server: {
            enabled: false,
        },
        richWorld: {
            enabled: false,
            autoSyncChunks: true,
            autoSyncVoxelPalette: true,
        },
        textures: {
            animationTime: 20,
            textureSize: 16,
            mipMapSizes: [16, 12, 8, 4],
        },
        updating: {
            autoRebuild: true,
        },
        world: {
            maxX: Infinity,
            minX: -Infinity,
            maxZ: Infinity,
            minZ: -Infinity,
            maxY: 256,
            minY: 0,
        },
        regions: {
            regionXPow2: 9,
            regionYPow2: 8,
            regionZPow2: 9,
        },
        chunks: {
            autoHeightMap: true,
            chunkXPow2: 4,
            chunkYPow2: 4,
            chunkZPow2: 4,
        },
        voxels: {
            doColors: true,
        },
        flow: {
            enable: true,
            baseFlowLimit: 100
        },
        lighting: {
            doAO: true,
            doSunLight: true,
            doRGBLight: true,
            autoRGBLight: true,
            autoSunLight: true,
        },
        meshes: {
            clearChachedGeometry: true,
            checkMagmaCollisions: false,
            checkLiquidCollisions: false,
            checkFloraCollisions: false,
            checkSolidCollisions: false,
            seralize: false,
            pickable: false,
        },
        materials: {
            mode: "classic",
            doAO: true,
            doSunLight: true,
            doRGBLight: true,
            disableFloraShaderEffects: false,
            disableLiquidShaderEffects: false,
        },
    },
    getSettings() {
        return this.settings;
    },
    syncSettings(data) {
        //safetly set data without prototype pollution
        for (const settingsKey of Object.keys(data)) {
            if (settingsKey.includes("__")) {
                throw new Error("Can not include properties with multpile underscores.");
            }
            if (this.settings[settingsKey] !== undefined) {
                for (const propertyKey of Object.keys(data[settingsKey])) {
                    if (propertyKey.includes("__")) {
                        throw new Error("Can not include properties with multpile underscores.");
                    }
                    if (this.settings[settingsKey][propertyKey] !== undefined) {
                        //@ts-ignore
                        this.settings[settingsKey][propertyKey] = data[settingsKey][propertyKey];
                    }
                }
            }
        }
        this.__syncWithObjects();
    },
    __syncWithObjects() {
        _World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.$INIT(this.settings);
        if (this.settings.world) {
            _World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_1__.WorldBounds.setWorldBounds(this.settings.world.minX, this.settings.world.maxX, this.settings.world.minZ, this.settings.world.maxZ, this.settings.world.minY, this.settings.world.maxY);
        }
    },
    syncWithWorldBounds(worldBounds) { },
    getSettingsCopy() {
        return JSON.parse(JSON.stringify(this.settings));
    },
    syncChunkInRichWorldThread() {
        return (this.settings.richWorld.enabled && this.settings.richWorld.autoSyncChunks);
    },
    richDataEnabled() {
        return this.settings.richWorld.enabled;
    },
    syncChunkInFXThread() {
        return this.settings.fx.enabled && this.settings.fx.autoSyncChunks;
    },
    syncChunkInDataThread() {
        return this.settings.data.enabled && this.settings.data.autoSyncChunks;
    },
    syncChunksInNexusThread() {
        return this.settings.nexus.enabled && this.settings.nexus.autoSyncChunks;
    },
    doSunPropagation() {
        return this.settings.lighting.autoSunLight == true;
    },
    doRGBPropagation() {
        return this.settings.lighting.autoRGBLight == true;
    },
    doLight() {
        return this.doRGBPropagation() || this.doSunPropagation();
    },
    doFlow() {
        return this.settings.flow.enable;
    },
    saveWorldData() {
        return this.settings.data.enabled;
    },
    isServer() {
        return this.settings.server.enabled && this.enviorment == "node";
    },
    isClient() {
        return this.enviorment != "browser";
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstancePalette.js":
/*!******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstancePalette.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubstancePaletteReader": () => (/* binding */ SubstancePaletteReader)
/* harmony export */ });
const SubstancePaletteReader = {
    _palette: [],
    _map: new Map(),
    setPalette(palette, map) {
        this._palette = palette;
        this._map = new Map(Object.entries(map));
    },
    id: {
        stringFromNumber(id) {
            return SubstancePaletteReader._palette[id];
        },
        numberFromString(id) {
            return SubstancePaletteReader._map.get(id);
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstanceTags.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstanceTags.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubstanceTags": () => (/* binding */ SubstanceTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");
/* harmony import */ var _SubstancePalette_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubstancePalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstancePalette.js");


class SDTags extends divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager {
    id;
    constructor(id) {
        super(id);
        this.id = id;
    }
    setSubstance(id) {
        this.setTagIndex(typeof id == "string" ? _SubstancePalette_js__WEBPACK_IMPORTED_MODULE_1__.SubstancePaletteReader.id.numberFromString(id) : id);
    }
}
const SubstanceTags = new SDTags("substance-data");


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelPalette.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelPalette.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelPaletteReader": () => (/* binding */ VoxelPaletteReader)
/* harmony export */ });
const VoxelPaletteReader = {
    _palette: ["dve_air", "dve_barrier"],
    _map: new Map(),
    setVoxelPalette(voxelPalette, voxelPaletteMap) {
        this._palette = voxelPalette;
        this._map = new Map(Object.entries(voxelPaletteMap));
    },
    id: {
        stringFromNumber(id) {
            return VoxelPaletteReader._palette[id];
        },
        numberFromString(id) {
            return VoxelPaletteReader._map.get(id);
        },
        getPaletteId(voxelId, voxelState) {
            const numericID = VoxelPaletteReader._map.get(voxelId);
            if (numericID == undefined)
                return -1;
            const stateId = voxelState + numericID;
            if (VoxelPaletteReader._palette[stateId] != voxelId) {
                throw new Error(`${voxelState} is not a valid state for voxel with id : ${voxelId}`);
            }
            if (stateId) {
                return stateId;
            }
            return -1;
        },
        baseNumeric(id) {
            if (id < 2)
                return id;
            const vid = this.numberFromString(this.stringFromNumber(id));
            if (!vid)
                return -1;
            return vid;
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelReader.js":
/*!*********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelReader.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelReader": () => (/* binding */ VoxelReader)
/* harmony export */ });
const voxelStateMasks = {
    level: 0b00_1111,
    levelState: 0b11_0000,
    shapeState: 0b1111_1111_11_00_0000,
};
/**# Voxel Byte
 * ---
 * Used to decode voxel data.
 */
const VoxelReader = {
    getLevel(stateData) {
        return stateData & voxelStateMasks.level;
    },
    setLevel(stateData, level) {
        return (stateData & ~voxelStateMasks.level) | level;
    },
    getLevelState(stateData) {
        return (stateData & voxelStateMasks.levelState) >> 4;
    },
    setLevelState(stateData, levelState) {
        return (stateData & ~voxelStateMasks.levelState) | (levelState << 4);
    },
    getShapeState(voxelData) {
        return (voxelData & voxelStateMasks.shapeState) >> 6;
    },
    setShapeState(voxelData, shapeState) {
        return (voxelData & ~voxelStateMasks.shapeState) | (shapeState << 6);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelTags.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelTags.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelTags": () => (/* binding */ VoxelTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");

class VDTags extends divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager {
    id;
    voxelIndex = new Uint16Array();
    constructor(id) {
        super(id);
        this.id = id;
    }
    sync(voxelMap) {
        this.voxelIndex = voxelMap;
    }
    setVoxel(id) {
        const index = this.voxelIndex[id];
        this.setTagIndex(index);
    }
}
const VoxelTags = new VDTags("voxel-data");


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Chunk/ChunkTags.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/World/Chunk/ChunkTags.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChunkTags": () => (/* binding */ ChunkTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");

const ChunkTags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("chunk-tags");


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Column/ColumnTags.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/World/Column/ColumnTags.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColumnTags": () => (/* binding */ ColumnTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");

const ColumnTags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("column-tags");


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Dimensions/DimensionsRegister.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/World/Dimensions/DimensionsRegister.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DimensionsRegister": () => (/* binding */ DimensionsRegister)
/* harmony export */ });
/* harmony import */ var _DataHooks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");
/* harmony import */ var _WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");


const DimensionsRegister = {
    _count: 1,
    dimensionRecord: {
        main: 0,
    },
    dimensionMap: {
        0: "main",
    },
    __defaultDimensionOptions: {
        liquidFlowSpeed: 0.1,
        magmaFlowSpeed: 0.1,
        sunLight: true,
    },
    _dimensions: {},
    registerDimension(id, option) {
        if (!option) {
            option = this.__defaultDimensionOptions;
        }
        const dimensionData = {
            id: id,
            options: option,
        };
        this._dimensions[id] = dimensionData;
        this.dimensionRecord[id] = this._count;
        this.dimensionMap[this._count] = id;
        _DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.dimension.onRegisterDimension.run(dimensionData);
        _WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.dimensions.add(id);
    },
    getDimension(id) {
        id = this.getDimensionStringId(id);
        return this._dimensions[id];
    },
    getDimensionStringId(id) {
        if (typeof id == "number") {
            return this.dimensionMap[id];
        }
        return id;
    },
    getDimensionNumericId(id) {
        if (typeof id == "string") {
            return this.dimensionRecord[id];
        }
        return id;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionHeaderRegister.js":
/*!*************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionHeaderRegister.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegionHeaderRegister": () => (/* binding */ RegionHeaderRegister)
/* harmony export */ });
/* harmony import */ var _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _RegionTags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RegionTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionTags.js");


const RegionHeaderRegister = {
    _headers: new Map(),
    remove(location) {
        const [dimensionId, x, y, z] = location;
        const dimension = this._headers.get(dimensionId);
        if (!dimension)
            return false;
        const regionKey = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.region.getKeyXYZ(x, y, z);
        return dimension.delete(regionKey);
    },
    add(location, buffer) {
        const [dimensionId, x, y, z] = location;
        let dimension = this._headers.get(dimensionId);
        if (!dimension) {
            dimension = new Map();
            this._headers.set(dimensionId, dimension);
        }
        const regionKey = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.region.getKeyXYZ(x, y, z);
        dimension.set(regionKey, {
            buffer: buffer,
            data: new DataView(buffer),
        });
    },
    get(location) {
        const [dimensionId, x, y, z] = location;
        let dimension = this._headers.get(dimensionId);
        if (!dimension)
            return false;
        return dimension.get(_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.region.getKeyXYZ(x, y, z));
    },
    /**# isStored
     * @param location
     * @returns
     *
     * Returns 1 if stored
     *
     * Returns 0 if not stored
     *
     * Returns -1 if region header is not loaded
     *
     */
    isStored(location) {
        const header = this.get(location);
        if (!header)
            return -1;
        _RegionTags_js__WEBPACK_IMPORTED_MODULE_1__.RegionHeaderTags.setBuffer(header.data);
        const columnIndex = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.column.getIndexXYZ(location[1], location[2], location[3]);
        return _RegionTags_js__WEBPACK_IMPORTED_MODULE_1__.RegionHeaderTags.getArrayTagValue("#dved-column-save-timestamp", columnIndex) != 0
            ? 1
            : 0;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionTags.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionTags.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegionHeaderTags": () => (/* binding */ RegionHeaderTags),
/* harmony export */   "RegionTags": () => (/* binding */ RegionTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");

const RegionTags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("region-tags");
const RegionHeaderTags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("region-header-tags");


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldBounds.js":
/*!*********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldBounds.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldBounds": () => (/* binding */ WorldBounds)
/* harmony export */ });
const WorldBounds = {
    bounds: {
        MinZ: -Infinity,
        MaxZ: Infinity,
        MinX: -Infinity,
        MaxX: Infinity,
        MinY: 0,
        MaxY: 256,
    },
    setWorldBounds(minX, maxX, minZ, maxZ, minY, maxY) {
        this.bounds.MinX = minX;
        this.bounds.MaxX = maxX;
        this.bounds.MinX = minZ;
        this.bounds.MaxZ = maxZ;
        this.bounds.MinY = minY;
        this.bounds.MaxY = maxY;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldPainter.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldPainter.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldPainter": () => (/* binding */ WorldPainter)
/* harmony export */ });
/* harmony import */ var _WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _DataHooks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");
/* harmony import */ var _Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Voxel/VoxelPalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelPalette.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");




const WP = {
    _currentionDimension: "main",
    paint: {
        _dt: new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_3__.DataTool(),
        voxel(location, data, update = true) {
            if (!location[0]) {
                location[0] = WP._currentionDimension;
            }
            let chunk = _WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.chunk.get(location);
            if (!chunk) {
                let buffer = _DataHooks_js__WEBPACK_IMPORTED_MODULE_1__.DataHooks.chunk.onGetSync.run(location);
                if (!buffer)
                    return;
                chunk = _WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.chunk.add(location, buffer);
            }
            this.__paint(location, data, update);
        },
        __paint(location, data, update = true) {
            this._dt.setLocation(location);
            if (!this._dt.setLocation(location).loadIn())
                return;
            const id = _Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_2__.VoxelPaletteReader.id.getPaletteId(data.id, data.state ? data.state : 0);
            if (id < 0)
                return false;
            this._dt.setId(id);
            this._dt.setShapeState(data.shapeState ? data.shapeState : 0);
            if (this._dt.getSubstnaceData().isLiquid()) {
                this._dt.setLevel(15);
            }
            if (data.secondaryVoxelId && data.secondaryVoxelId != "dve_air") {
                const vid = _Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_2__.VoxelPaletteReader.id.getPaletteId(data.secondaryVoxelId, data.secondaryState ? data.secondaryState : 0);
                if (vid > 0) {
                    this._dt.setSecondary(true);
                    this._dt.setId(vid);
                    this._dt.setSecondary(false);
                }
            }
            if (this._dt.isLightSource() && this._dt.getLightSourceValue()) {
                this._dt.setLight(this._dt.getLightSourceValue());
                if (update) {
                    _DataHooks_js__WEBPACK_IMPORTED_MODULE_1__.DataHooks.paint.onAddToRGBUpdate.run(location);
                }
            }
            if (this._dt.isRich()) {
                _DataHooks_js__WEBPACK_IMPORTED_MODULE_1__.DataHooks.paint.onRichVoxelPaint.run([this._dt.getStringId(), location]);
            }
            this._dt.commit(1);
        },
        erase(location) {
            this._dt.setLocation(location);
            if (!this._dt.loadIn())
                return;
            if (!this._dt.isRenderable())
                return;
            this._dt
                .setLight(0)
                .setLevel(0)
                .setLevelState(0)
                .setShapeState(0)
                .setAir()
                .commit(2);
        },
    },
};
const WorldPainter = WP;


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js":
/*!***********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldRegister": () => (/* binding */ WorldRegister)
/* harmony export */ });
/* harmony import */ var _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");
/* harmony import */ var _WorldBounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WorldBounds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldBounds.js");
/* harmony import */ var _Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dimensions/DimensionsRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Dimensions/DimensionsRegister.js");
/* harmony import */ var _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js");
/* harmony import */ var _Tools_Data_WorldData_RegionDataTool_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Tools/Data/WorldData/RegionDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/RegionDataTool.js");
/* harmony import */ var _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");







const chunkTool = new _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_3__.ChunkDataTool();
const columnTool = new _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_4__.ColumnDataTool();
const regionTool = new _Tools_Data_WorldData_RegionDataTool_js__WEBPACK_IMPORTED_MODULE_5__.RegionDataTool();
const WorldRegister = {
    _dimensions: new Map(),
    _cacheOn: false,
    _chunkCache: new Map(),
    _columnCache: new Map(),
    cache: {
        enable() {
            WorldRegister._cacheOn = true;
            WorldRegister._chunkCache.clear();
            WorldRegister._columnCache.clear();
        },
        disable() {
            WorldRegister._cacheOn = false;
            WorldRegister._chunkCache.clear();
            WorldRegister._columnCache.clear();
        },
        _addChunk(key, data) {
            WorldRegister._chunkCache.set(key, data);
        },
        _addColumn(key, data) {
            WorldRegister._columnCache.set(key, data);
        },
        _getChunk(key) {
            return WorldRegister._chunkCache.get(key);
        },
        _getColumn(key) {
            return WorldRegister._columnCache.get(key);
        },
    },
    dimensions: {
        add(id) {
            const dimesnion = new Map();
            id = _Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_2__.DimensionsRegister.getDimensionStringId(id);
            WorldRegister._dimensions.set(id, dimesnion);
            return dimesnion;
        },
        get(id) {
            id = _Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_2__.DimensionsRegister.getDimensionStringId(id);
            return WorldRegister._dimensions.get(id);
        },
    },
    region: {
        add(location, sab) {
            let dimension = WorldRegister.dimensions.get(location[0]);
            if (!dimension) {
                dimension = WorldRegister.dimensions.add(location[0]);
            }
            const region = this._getRegionData(sab);
            const regionPOS = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.region.getPositionLocation(location);
            regionTool.setRegion(region);
            regionTool.setPositionData(regionPOS.x, regionPOS.y, regionPOS.z);
            regionTool.setDimensionId(location[0]);
            dimension.set(_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.region.getKey(), region);
            return region;
        },
        _getRegionData(sab) {
            return {
                columns: new Map(),
                buffer: sab,
                data: new DataView(sab),
            };
        },
        get(location) {
            const dimension = WorldRegister.dimensions.get(location[0]);
            if (!dimension)
                return false;
            const region = dimension.get(_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.region.getKeyLocation(location));
            if (!region)
                return false;
            return region;
        },
        remove(location) {
            const dimension = WorldRegister.dimensions.get(location[0]);
            if (!dimension)
                return false;
            const key = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.region.getKeyLocation(location);
            const region = dimension.get(key);
            if (!region)
                return false;
            dimension.delete(key);
            return true;
        },
    },
    column: {
        add(location, sab) {
            let region = WorldRegister.region.get(location);
            if (!region) {
                let buffer = _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.region.onGetSync.run(location);
                if (!buffer)
                    return;
                region = WorldRegister.region.add(location, buffer);
                _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.region.onNew.run(location);
            }
            const column = this._getColumnData(sab);
            const columnPOS = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.column.getPositionLocation(location);
            columnTool.setColumn(column);
            columnTool.setPositionData(columnPOS.x, columnPOS.y, columnPOS.z);
            columnTool.setDimensionId(location[0]);
            region.columns.set(_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.column.getIndex(), column);
            return column;
        },
        _getColumnData(sab) {
            return {
                chunks: new Map(),
                buffer: sab,
                data: new DataView(sab),
            };
        },
        get(location) {
            const columnKey = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.column.getKeyLocation(location);
            let addColumn = false;
            if (WorldRegister._cacheOn) {
                const column = WorldRegister.cache._getColumn(columnKey);
                if (column)
                    return column;
                addColumn = true;
            }
            const region = WorldRegister.region.get(location);
            if (!region)
                return false;
            const column = region.columns.get(_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.column.getIndexLocation(location));
            if (!column)
                return false;
            if (addColumn) {
                WorldRegister.cache._addColumn(columnKey, column);
            }
            return column;
        },
        remove(location) {
            const region = WorldRegister.region.get(location);
            if (!region)
                return false;
            const index = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.column.getIndexLocation(location);
            const column = region.columns.get(index);
            if (!column)
                return false;
            region.columns.delete(index);
            return true;
        },
        fill(location) {
            for (let cy = _WorldBounds_js__WEBPACK_IMPORTED_MODULE_1__.WorldBounds.bounds.MinY; cy < _WorldBounds_js__WEBPACK_IMPORTED_MODULE_1__.WorldBounds.bounds.MaxY; cy += _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.chunk._bounds.y) {
                location[2] = cy;
                if (!WorldRegister.chunk.get(location)) {
                    const chunk = _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.chunk.onGetSync.run(location);
                    if (!chunk)
                        continue;
                    WorldRegister.chunk.add(location, chunk);
                }
            }
        },
        /*   height: {
           getRelative(location: LocationData) {
            location = [...location];
            const chunkWidth = WorldSpaces.chunk._bounds.x;
            const chunkDepth = WorldSpaces.chunk._bounds.z;
            let maxHeight = -Infinity;
            const [dimension, x, y, z] = location;
            for (const check of $2dMooreNeighborhood) {
             location[1] = check[0] * chunkWidth + x;
             location[3] = check[1] * chunkDepth + z;
             const height = this.getAbsolute(location);
             if (height > maxHeight) {
              maxHeight = height;
             }
            }
            return maxHeight;
           },
           getAbsolute(location: LocationData) {
            const column = WorldRegister.column.get(location);
            if (!column) return WorldBounds.bounds.MinY;
            if (column.chunks.size == 0) return WorldBounds.bounds.MinY;
            let maxHeight = WorldBounds.bounds.MinY;
            for (const [key, chunk] of column.chunks) {
             if (!chunk) continue;
        
             chunkTool.setChunk(chunk);
             const chunkPOS = chunkTool.getPositionData();
             let chunkMax = chunkTool.getTagValue("#dve_max_height");
             if (chunkMax == 0) continue;
             chunkMax += chunkPOS.y;
             if (maxHeight < chunkMax) {
              maxHeight = chunkMax;
             }
            }
            return maxHeight + 1;
           },
          }, */
    },
    chunk: {
        add(location, sab) {
            let column = WorldRegister.column.get(location);
            if (!column) {
                let buffer = _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.column.onGetSync.run(location);
                if (!buffer)
                    return;
                column = WorldRegister.column.add(location, buffer);
                _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.column.onNew.run(location);
            }
            if (!column)
                return;
            const chunk = this._getChunkData(sab);
            chunkTool.setChunk(chunk);
            const chunkPOS = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.chunk.getPositionLocation(location);
            chunkTool.setPositionData(chunkPOS.x, chunkPOS.y, chunkPOS.z);
            chunkTool.setDimensionId(location[0]);
            column.chunks.set(_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.chunk.getIndex(), chunk);
            _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.chunk.onNew.run(location);
            return chunk;
        },
        _getChunkData(sab) {
            return {
                buffer: sab,
                data: new DataView(sab),
            };
        },
        addFromServer(location, chunkBuffer) {
            const sab = new SharedArrayBuffer(chunkBuffer.byteLength);
            const temp = new Uint8Array(chunkBuffer);
            const temp2 = new Uint8Array(sab);
            temp2.set(temp, 0);
            const chunk = this._getChunkData(sab);
            chunkTool.setChunk(chunk);
            let column = WorldRegister.column.get(location);
            if (!column)
                return;
            column.chunks.set(_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.chunk.getIndexLocation(location), chunk);
            _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.chunk.onNew.run(location);
            return chunk;
        },
        get(location) {
            const chunkKey = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.chunk.getKeyLocation(location);
            let addChunk = false;
            if (WorldRegister._cacheOn) {
                const chunk = WorldRegister.cache._getChunk(chunkKey);
                if (chunk)
                    return chunk;
                addChunk = true;
            }
            const column = WorldRegister.column.get(location);
            if (!column)
                return false;
            const chunk = column.chunks.get(_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.chunk.getIndex());
            if (!chunk)
                return;
            if (addChunk) {
                WorldRegister.cache._addChunk(chunkKey, chunk);
            }
            return chunk;
        },
        remove(location) {
            const column = WorldRegister.column.get(location);
            if (!column)
                return false;
            const index = _WorldSpaces_js__WEBPACK_IMPORTED_MODULE_6__.WorldSpaces.chunk.getIndexLocation(location);
            const chunk = column.chunks.get(index);
            if (!chunk)
                return false;
            column.chunks.delete(index);
            return true;
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js":
/*!*********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldSpaces": () => (/* binding */ WorldSpaces)
/* harmony export */ });
/* harmony import */ var voxelspaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! voxelspaces */ "../../DSLIBS/voxelSpaces/dist/index.js");
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
//types

//Objects

const WorldSpaces = _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__.Util.merge(voxelspaces__WEBPACK_IMPORTED_MODULE_0__.VoxelSpaces.getVoxelSpaces(), {
    $INIT(settings) {
        WorldSpaces.setDimensions({
            regions: {
                x: settings.regions.regionXPow2,
                y: settings.regions.regionYPow2,
                z: settings.regions.regionZPow2,
            },
            columns: {
                x: settings.chunks.chunkXPow2,
                y: settings.regions.regionYPow2,
                z: settings.chunks.chunkZPow2,
            },
            chunks: {
                x: settings.chunks.chunkXPow2,
                y: settings.chunks.chunkYPow2,
                z: settings.chunks.chunkZPow2,
            },
        });
    },
});


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js":
/*!*****************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Util": () => (/* binding */ Util)
/* harmony export */ });
/* harmony import */ var _Util_CreatePromiseCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util/CreatePromiseCheck.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/CreatePromiseCheck.js");
/* harmony import */ var _Util_Queue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util/Queue.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/Queue.js");


const Util = {
    createPromiseCheck: _Util_CreatePromiseCheck_js__WEBPACK_IMPORTED_MODULE_0__.CreatePromiseCheck,
    getEnviorment() {
        let environment = "browser";
        //@ts-ignore
        if (typeof process !== "undefined" && typeof Worker === "undefined") {
            environment = "node";
        }
        return environment;
    },
    getAQueue() {
        return new _Util_Queue_js__WEBPACK_IMPORTED_MODULE_1__.Queue();
    },
    merge(target, newObject) {
        return Object.assign(target, newObject);
    },
    degtoRad(degrees) {
        return degrees * (Math.PI / 180);
    },
    radToDeg(radians) {
        return radians * (180 / Math.PI);
    },
    convertBufferToSAB(buffer) {
        const sab = new SharedArrayBuffer(buffer.byteLength);
        const temp = new Uint8Array(buffer);
        const temp2 = new Uint8Array(sab);
        temp2.set(temp, 0);
        return sab;
    },
    converSABToBuffer(buffer) {
        const newBuffer = new ArrayBuffer(buffer.byteLength);
        const temp = new Uint8Array(buffer);
        const temp2 = new Uint8Array(newBuffer);
        temp2.set(temp, 0);
        return newBuffer;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/CreatePromiseCheck.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Global/Util/CreatePromiseCheck.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePromiseCheck": () => (/* binding */ CreatePromiseCheck)
/* harmony export */ });
/* harmony import */ var _SafeInterval_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SafeInterval.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/SafeInterval.js");

const CreatePromiseCheck = (data) => {
    return new Promise((resolve) => {
        const times = {
            inte: -1,
            fail: -1,
        };
        const inte = new _SafeInterval_js__WEBPACK_IMPORTED_MODULE_0__.SafeInterval()
            .setInterval(data.checkInterval)
            .setOnRun(() => {
            if (data.check()) {
                if (data.onReady) {
                    data.onReady();
                }
                if (times.fail > -1) {
                    clearTimeout(times.fail);
                }
                inte.stop();
                resolve(true);
            }
        });
        inte.start();
        if (data.failTimeOut) {
            times.fail = setTimeout(() => {
                inte.stop();
                if (data.onFail) {
                    data.onFail();
                }
                resolve(false);
            }, data.failTimeOut);
        }
    });
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/Queue.js":
/*!****************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Global/Util/Queue.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Queue": () => (/* binding */ Queue)
/* harmony export */ });
class QueueNode {
    data;
    next;
    constructor(data) {
        this.data = data;
    }
}
class Queue {
    size = 0;
    first;
    last;
    enqueue(data) {
        const node = new QueueNode(data);
        if (this.size == 0) {
            this.first = node;
            this.last = node;
        }
        else {
            this.last.next = node;
            this.last = node;
        }
        this.size++;
    }
    dequeue() {
        if (this.size == 0)
            return null;
        if (!this.first)
            return null;
        let prevFirst = this.first;
        this.first = prevFirst.next;
        prevFirst.next = null;
        this.size--;
        return prevFirst.data;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/SafeInterval.js":
/*!***********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Global/Util/SafeInterval.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SafeInterval": () => (/* binding */ SafeInterval)
/* harmony export */ });
/** # SafeInterval
 * Creates a predictable sync interval.
 */
class SafeInterval {
    _active = false;
    _run = () => { };
    inteval = 100;
    lastTime = 0;
    currentTimeout = 0;
    setOnRun(run) {
        this._run = run;
        return this;
    }
    setInterval(interval) {
        this.inteval = interval;
        return this;
    }
    async run() {
        if (!this._active)
            return;
        await this._run(performance.now() - this.lastTime);
        this.currentTimeout = setTimeout(() => {
            this.run();
        }, this.inteval);
        return this;
    }
    start() {
        if (!this._active) {
            this._active = true;
            this.run();
        }
        return this;
    }
    stop() {
        this._active = false;
        clearTimeout(this.currentTimeout);
        return this;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/CardinalNeighbors.js":
/*!*******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Constants/CardinalNeighbors.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$2dMooreNeighborhood": () => (/* binding */ $2dMooreNeighborhood),
/* harmony export */   "$3dCardinalNeighbors": () => (/* binding */ $3dCardinalNeighbors),
/* harmony export */   "$3dMooreNeighborhood": () => (/* binding */ $3dMooreNeighborhood)
/* harmony export */ });
const $3dMooreNeighborhood = [];
const $2dMooreNeighborhood = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, 0],
    [0, -1],
    [-1, -1],
    [1, -1],
    [-1, 1],
];
const $3dCardinalNeighbors = [
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, -1],
    [0, 0, 1],
];
for (let y = -1; y < 2; y++) {
    for (const n of $2dMooreNeighborhood) {
        $3dMooreNeighborhood.push([n[0], y, n[1]]);
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/DataToolBase.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/DataToolBase.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataToolBase": () => (/* binding */ DataToolBase),
/* harmony export */   "EncodedPositionDataTool": () => (/* binding */ EncodedPositionDataTool)
/* harmony export */ });
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _Data_World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Data/World/Dimensions/DimensionsRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Dimensions/DimensionsRegister.js");
/* harmony import */ var _LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationBoundTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/LocationBoundTool.js");
/* harmony import */ var _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/Constants/Tags/WorldDataTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/WorldDataTagIds.js");




class DataToolBase extends _LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_2__.LocationBoundTool {
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
        return _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__.Util.converSABToBuffer(this.getBuffer());
    }
    getBufferSize() {
        return this.tags.tagSize;
    }
    loadInAt(x, y, z) {
        this.setXYZ(x, y, z);
        return this.loadIn();
    }
    loadInVec3Array(vec3) {
        this.setXYZ(vec3[0], vec3[1], vec3[2]);
        return this.loadIn();
    }
    loadInVec3(vec3) {
        this.setXYZ(vec3.x, vec3.y, vec3.z);
        return this.loadIn();
    }
    loadInAtLocation(location) {
        this.setLocation(location);
        return this.loadIn();
    }
}
class EncodedPositionDataTool extends DataToolBase {
    position = { x: 0, y: 0, z: 0 };
    constructor() {
        super();
    }
    getPositionData() {
        this.position.x = this.getTagValue(_Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionX);
        this.position.y = this.getTagValue(_Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionY);
        this.position.z = this.getTagValue(_Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionZ);
        return this.position;
    }
    setPositionData(x, y, z) {
        this.setTagValue(_Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionX, x);
        this.setTagValue(_Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionY, y);
        this.setTagValue(_Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionZ, z);
        return this.position;
    }
    setDimensionId(dimensionId) {
        this.setTagValue(_Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.dimensionId, _Data_World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_1__.DimensionsRegister.getDimensionNumericId(dimensionId));
    }
    getDimensionId() {
        return _Data_World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_1__.DimensionsRegister.getDimensionStringId(this.getTagValue(_Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.dimensionId));
    }
    getLocationData() {
        const pos = this.getPositionData();
        return [this.getDimensionId(), pos.x, pos.y, pos.z];
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/LocationBoundTool.js":
/*!******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/LocationBoundTool.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocationBoundTool": () => (/* binding */ LocationBoundTool)
/* harmony export */ });
class LocationBoundTool {
    location = ["main", 0, 0, 0];
    get dimension() {
        return this.location[0];
    }
    set dimension(dimension) {
        this.location[0] = dimension;
    }
    get x() {
        return this.location[1];
    }
    set x(value) {
        this.location[1] = value;
    }
    get y() {
        return this.location[2];
    }
    set y(value) {
        this.location[2] = value;
    }
    get z() {
        return this.location[3];
    }
    set z(value) {
        this.location[3] = value;
    }
    setDimension(dimensionId) {
        this.location[0] = dimensionId;
        return this;
    }
    getLocation() {
        return this.location;
    }
    setXYZ(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    setXZ(x, z) {
        this.setXYZ(x, this.location[2], z);
        return this;
    }
    setLocation(location) {
        this.dimension = location[0];
        this.x = location[1];
        this.y = location[2];
        this.z = location[3];
        return this;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataTool": () => (/* binding */ DataTool)
/* harmony export */ });
/* harmony import */ var _Data_World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/World/Dimensions/DimensionsRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Dimensions/DimensionsRegister.js");
/* harmony import */ var _Data_Voxel_VoxelReader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Data/Voxel/VoxelReader.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelReader.js");
/* harmony import */ var _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Data/Voxel/VoxelTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelTags.js");
/* harmony import */ var _Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/Voxel/VoxelPalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelPalette.js");
/* harmony import */ var _WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WorldData/HeightMapTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/HeightMapTool.js");
/* harmony import */ var _Classes_DataToolBase_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Classes/DataToolBase.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/DataToolBase.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./WorldData/ColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js");
/* harmony import */ var _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Data/Light/LightByte.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js");
/* harmony import */ var _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Data/Constants/Tags/VoxelTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/VoxelTagIds.js");
/* harmony import */ var _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../Data/Register/MappedDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Register/MappedDataRegister.js");
/* harmony import */ var _SubstanceDataTool_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SubstanceDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/SubstanceDataTool.js");













class DataTool extends _Classes_DataToolBase_js__WEBPACK_IMPORTED_MODULE_6__.DataToolBase {
    /**# World Data Mode
     * ---
     * Read data directly from the world.
     */
    static WORLD_DATA_MODE = 0;
    /**# Voxel Matrix Mode
     * ---
     * Read from a voxel matrix.
     */
    static VOXEL_MATRIX_MODE = 1;
    /**# Voxel Data Mode
     * ---
     * Read data from a single voxel passed in via `loadInRaw`
     */
    static VOXEL_DATA_MODE = 2;
    static _dtutil = new DataTool();
    _chunkTool = new _WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_4__.ChunkDataTool();
    _substanceTool = new _SubstanceDataTool_js__WEBPACK_IMPORTED_MODULE_12__.SubstanceDataTool();
    static _heightMapTool = new _WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_5__.HeightMapTool();
    static _columntool = new _WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_8__.ColumnDataTool();
    _locationKey = "";
    _loadedIn = false;
    _mode = 0;
    data = {
        raw: [0, 0, 0, 0],
        id: 0,
        baseId: 0,
        secondaryId: 0,
        secondaryBaseId: 0,
    };
    __secondary = false;
    tags = _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags;
    setMode(mode) {
        this._mode = mode;
        return this;
    }
    clear() {
        this._loadedIn = false;
        this._locationKey = "";
        let i = this.data.raw.length;
        while (i--) {
            this.data.raw[i] = 0;
        }
        this.data.id = 0;
        this.data.baseId = 0;
        this.data.secondaryId = 0;
        this.data.secondaryBaseId = 0;
        return this;
    }
    setDimension(dimensionId) {
        this.location[0] = _Data_World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_0__.DimensionsRegister.getDimensionStringId(dimensionId);
        return this;
    }
    setSecondary(enable) {
        this.__secondary = enable;
        if (enable) {
            _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(this.data.secondaryBaseId);
        }
        else {
            _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(this.data.baseId);
        }
        return this;
    }
    _getBaseId(id) {
        return _Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__.VoxelPaletteReader.id.baseNumeric(id);
    }
    getSubstnaceData() {
        this._substanceTool.setSubstance(this.getSubstance());
        return this._substanceTool;
    }
    getRaw() {
        return this.data.raw;
    }
    loadInRaw(rawData) {
        this.data.raw = rawData;
        this.__process();
        return this;
    }
    __process() {
        this.data.id = this.data.raw[0];
        this.data.secondaryId = this.data.raw[3];
        this.data.baseId = this._getBaseId(this.data.id);
        if (this.data.secondaryId > 1) {
            this.data.secondaryBaseId = this._getBaseId(this.data.secondaryId);
        }
        else {
            this.data.secondaryBaseId = 0;
        }
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(this.data.baseId);
    }
    loadIn() {
        this._c = this.tags.data;
        if (this._mode == DataTool.WORLD_DATA_MODE) {
            if (!this._chunkTool.setLocation(this.location).loadIn())
                return false;
            const index = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_7__.WorldSpaces.voxel.getIndexLocation(this.location);
            this.data.raw[0] = this._chunkTool.segments.id.get(index);
            this.data.raw[1] = this._chunkTool.segments.light.get(index);
            this.data.raw[2] = this._chunkTool.segments.state.get(index);
            this.data.raw[3] = this._chunkTool.segments.secondaryId.get(index);
            this.__process();
            this._loadedIn = true;
            return true;
        }
        if (this._mode == DataTool.VOXEL_MATRIX_MODE) {
            return false;
        }
        if (this._mode == DataTool.VOXEL_DATA_MODE) {
            this.data.raw[0] = 0;
            this.data.raw[1] = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_9__.LightData.getS(0xff);
            this.data.raw[2] = 0;
            return false;
        }
        return false;
    }
    commit(heightMapUpdate = 0) {
        if (!this._loadedIn)
            return false;
        if (this._mode == DataTool.WORLD_DATA_MODE) {
            const index = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_7__.WorldSpaces.voxel.getIndexLocation(this.location);
            this._chunkTool.segments.id.set(index, this.data.raw[0]);
            this._chunkTool.segments.light.set(index, this.data.raw[1]);
            this._chunkTool.segments.state.set(index, this.data.raw[2]);
            this._chunkTool.segments.secondaryId.set(index, this.data.raw[3]);
            if (DataTool._columntool.loadInAtLocation(this.location)) {
                DataTool._columntool.markAsNotStored();
            }
            if (heightMapUpdate) {
                DataTool._heightMapTool.chunk._c = this._chunkTool._c;
                const substance = this.getTemplateSubstance();
                //on add
                if (heightMapUpdate == 1) {
                    DataTool._heightMapTool.chunk.setY(this.y).setHasVoxels(true);
                    //  DataTool._heightMapTool.chunk.update("add", substance, this.location);
                }
                //on remove
                if (heightMapUpdate == 2) {
                    DataTool._heightMapTool.chunk.setY(this.y).setDirty(true);
                    //   DataTool._heightMapTool.chunk.update("remove", substance, this.location);
                }
            }
            this._loadedIn = false;
            return true;
        }
        if (this._mode == DataTool.VOXEL_MATRIX_MODE) {
            return false;
        }
        if (this._mode == DataTool.VOXEL_DATA_MODE) {
            return false;
        }
        return false;
    }
    hasRGBLight() {
        const light = this.getLight();
        if (light <= 0)
            false;
        return _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_9__.LightData.hasRGBLight(light);
    }
    hasSunLight() {
        const light = this.getLight();
        if (light <= 0)
            false;
        return _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_9__.LightData.hasSunLight(light);
    }
    getLight() {
        if (this._mode == DataTool.VOXEL_DATA_MODE)
            return 0xf;
        const vID = this.getId(true);
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        if (vID == 0)
            return this.data.raw[1];
        if (vID < 2)
            return -1;
        const lightValue = this.getTagValue(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.lightValue);
        if (this.isOpaque()) {
            if (this.getTagValue(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.isLightSource) && lightValue) {
                return lightValue;
            }
            else {
                return -1;
            }
        }
        if (this.getTagValue("#dve_is_light_source") && lightValue) {
            return _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_9__.LightData.mixLight(this.data.raw[1], lightValue);
        }
        return this.data.raw[1];
    }
    setLight(light) {
        this.data.raw[1] = light;
        return this;
    }
    isOpaque() {
        const substance = this.getSubstance();
        if (substance == "#dve_solid")
            return true;
    }
    getLevel() {
        return _Data_Voxel_VoxelReader_js__WEBPACK_IMPORTED_MODULE_1__.VoxelReader.getLevel(this.data.raw[2]);
    }
    setLevel(level) {
        this.data.raw[2] = _Data_Voxel_VoxelReader_js__WEBPACK_IMPORTED_MODULE_1__.VoxelReader.setLevel(this.data.raw[2], level);
        return this;
    }
    getLevelState() {
        return _Data_Voxel_VoxelReader_js__WEBPACK_IMPORTED_MODULE_1__.VoxelReader.getLevelState(this.data.raw[2]);
    }
    setLevelState(state) {
        this.data.raw[2] = _Data_Voxel_VoxelReader_js__WEBPACK_IMPORTED_MODULE_1__.VoxelReader.setLevelState(this.data.raw[2], state);
        return this;
    }
    getShapeState() {
        return _Data_Voxel_VoxelReader_js__WEBPACK_IMPORTED_MODULE_1__.VoxelReader.getShapeState(this.data.raw[2]);
    }
    setShapeState(state) {
        this.data.raw[2] = _Data_Voxel_VoxelReader_js__WEBPACK_IMPORTED_MODULE_1__.VoxelReader.setShapeState(this.data.raw[2], state);
        return this;
    }
    hasSecondaryVoxel() {
        return this.data.secondaryBaseId > 1;
    }
    //voxel data
    getShapeId() {
        const vID = this.getId(true);
        if (vID < 2)
            return "";
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        return _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_11__.MappedDataRegister.stringMaps.get("voxel", _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.shapeID, _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.getTag(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.shapeID));
    }
    isLightSource() {
        const vID = this.getId(true);
        if (vID < 2)
            return false;
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        return _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.getTag(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.isLightSource) == 1;
    }
    getLightSourceValue() {
        const vID = this.getId(true);
        if (vID < 2)
            return 0;
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        return _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.getTag(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.lightValue);
    }
    getSubstance() {
        const vID = this.getId(true);
        if (vID < 2)
            return "#dve_transparent";
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        const s = (_Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_11__.MappedDataRegister.stringMaps.get("voxel", _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.substance, _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.getTag(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.substance)));
        return s;
    }
    getMaterial() {
        const vID = this.getId(true);
        if (vID < 2)
            return "none";
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        return _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_11__.MappedDataRegister.stringMaps.get("voxel", _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.material, _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.getTag(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.material));
    }
    getHardness() {
        const vID = this.getId(true);
        if (vID < 2)
            return 0;
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        return _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.getTag(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.hardness);
    }
    getCollider() {
        const vID = this.getId(true);
        if (vID < 2)
            return "none";
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        return _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_11__.MappedDataRegister.stringMaps.get("voxel", _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.colliderID, _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.getTag(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.colliderID));
    }
    checkCollisions() {
        const vID = this.getId(true);
        if (vID == 0)
            return false;
        if (vID == 1)
            return true;
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        return this.getTagValue(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.checkCollisions) == 1;
    }
    getTemplateSubstance() {
        let substance = this.getSubstance();
        if (substance == "#dve_transparent") {
            substance = "#dve_solid";
        }
        return substance;
    }
    getState() {
        if (this.__secondary) {
            return this.data.secondaryId - this.data.secondaryBaseId;
        }
        return this.data.id - this.data.baseId;
    }
    isRich() {
        const vID = this.getId(true);
        if (vID < 2)
            return 0;
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.setVoxel(vID);
        return _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTags.getTag(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_10__.VoxelTagIDs.isLightSource);
    }
    //util
    setAir() {
        this.data.raw[0] = 0;
        this.__process();
        return this;
    }
    isAir() {
        return 0 == this.data.raw[0];
    }
    setBarrier() {
        this.data.raw[0] = 1;
        this.__process();
        return this;
    }
    isBarrier() {
        return 1 == this.data.raw[0];
    }
    //voxel id
    getId(base = false) {
        if (this.__secondary) {
            if (!base)
                return this.data.secondaryId;
            return this.data.secondaryBaseId;
        }
        if (!base)
            return this.data.id;
        return this.data.baseId;
    }
    setId(id) {
        if (this.__secondary) {
            this.data.raw[3] = id;
            this.data.secondaryId = id;
            this.data.secondaryBaseId = this._getBaseId(id);
            return this;
        }
        this.data.raw[0] = id;
        this.data.id = id;
        this.data.baseId = this._getBaseId(id);
        return this;
    }
    setStringId(id) {
        return this.setId(_Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__.VoxelPaletteReader.id.numberFromString(id));
    }
    getStringId() {
        if (this.__secondary) {
            return _Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__.VoxelPaletteReader.id.stringFromNumber(this.data.secondaryBaseId);
        }
        return _Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__.VoxelPaletteReader.id.stringFromNumber(this.data.baseId);
    }
    //util
    isRenderable() {
        if (this.data.id < 2 && this.data.secondaryId < 2)
            return false;
        return true;
    }
    isSameVoxel(cx, cy, cz) {
        DataTool._dtutil.loadInAt(cx, cy, cz);
        if (this.__secondary) {
            return this.data.secondaryBaseId == DataTool._dtutil.data.secondaryBaseId;
        }
        return this.data.baseId == DataTool._dtutil.data.baseId;
    }
}



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/SubstanceDataTool.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Data/SubstanceDataTool.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubstanceDataTool": () => (/* binding */ SubstanceDataTool)
/* harmony export */ });
/* harmony import */ var _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/Constants/Tags/SubstanceTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/SubstanceTagIds.js");
/* harmony import */ var _Data_Substance_SubstancePalette_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Data/Substance/SubstancePalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstancePalette.js");
/* harmony import */ var _Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Data/Substance/SubstanceTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstanceTags.js");
/* harmony import */ var _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/Register/MappedDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Register/MappedDataRegister.js");




class SubstanceDataTool {
    static tags = _Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_2__.SubstanceTags;
    static getTagValue(index, tag) {
        this.tags.setTagIndex(index);
        return this.tags.getTag(tag);
    }
    substance = "";
    substanceTagIndex = 0;
    setSubstance(substance) {
        this.substance = substance;
        this.substanceTagIndex =
            _Data_Substance_SubstancePalette_js__WEBPACK_IMPORTED_MODULE_1__.SubstancePaletteReader.id.numberFromString(substance);
    }
    isSolid() {
        return (SubstanceDataTool.getTagValue(this.substanceTagIndex, _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.isSolid) == 1);
    }
    isLiquid() {
        return (SubstanceDataTool.getTagValue(this.substanceTagIndex, _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.isLiquid) == 1);
    }
    getParent() {
        return _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_3__.MappedDataRegister.stringMaps.get("substance", _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.parent, SubstanceDataTool.getTagValue(this.substanceTagIndex, _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.parent));
    }
    getRendered() {
        return _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_3__.MappedDataRegister.stringMaps.get("substance", _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.rendered, SubstanceDataTool.getTagValue(this.substanceTagIndex, _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.rendered));
    }
    getCulled() {
        return _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_3__.MappedDataRegister.objectMaps.get("substance", _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.culledSubstnaces, SubstanceDataTool.getTagValue(this.substanceTagIndex, _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.culledSubstnaces));
    }
    getFlowRate() {
        return SubstanceDataTool.getTagValue(this.substanceTagIndex, _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.flowRate);
    }
}



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js":
/*!*********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChunkDataTool": () => (/* binding */ ChunkDataTool)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Data_World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/World/Chunk/ChunkTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Chunk/ChunkTags.js");
/* harmony import */ var _Classes_DataToolBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Classes/DataToolBase.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/DataToolBase.js");
/* harmony import */ var _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Data/Constants/Tags/ChunkTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/ChunkTagIds.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
//objects





class ChunkDataTool extends _Classes_DataToolBase_js__WEBPACK_IMPORTED_MODULE_2__.EncodedPositionDataTool {
    tags = _Data_World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_1__.ChunkTags;
    constructor() {
        super();
        this.segments.id._s = this;
        this.segments.light._s = this;
        this.segments.state._s = this;
        this.segments.secondaryId._s = this;
    }
    loadIn() {
        _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_4__.WorldSpaces.chunk.updateLoaction(this.location);
        const chunk = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.chunk.get(this.location);
        if (!chunk)
            return false;
        this.tags.setBuffer(chunk.data);
        this._c = chunk.data;
        return true;
    }
    setChunk(chunk) {
        this.tags.setBuffer(chunk.data);
        this._c = chunk.data;
        return this;
    }
    segments = {
        id: {
            _s: {},
            get(index) {
                return this._s.getArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_3__.ChunkTagIDs.voxelIDSegment, index);
            },
            set(index, value) {
                return this._s.setArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_3__.ChunkTagIDs.voxelIDSegment, index, value);
            },
        },
        light: {
            _s: {},
            get(index) {
                return this._s.getArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_3__.ChunkTagIDs.voxelLightSegment, index);
            },
            set(index, value) {
                return this._s.setArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_3__.ChunkTagIDs.voxelLightSegment, index, value);
            },
        },
        state: {
            _s: {},
            get(index) {
                return this._s.getArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_3__.ChunkTagIDs.voxelStateSegment, index);
            },
            set(index, value) {
                return this._s.setArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_3__.ChunkTagIDs.voxelStateSegment, index, value);
            },
        },
        secondaryId: {
            _s: {},
            get(index) {
                return this._s.getArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_3__.ChunkTagIDs.voxelSecondaryIDSegment, index);
            },
            set(index, value) {
                return this._s.setArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_3__.ChunkTagIDs.voxelSecondaryIDSegment, index, value);
            },
        },
    };
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js":
/*!**********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColumnDataTool": () => (/* binding */ ColumnDataTool)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Classes_DataToolBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Classes/DataToolBase.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/DataToolBase.js");
/* harmony import */ var _Data_World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Data/World/Column/ColumnTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Column/ColumnTags.js");
/* harmony import */ var _Data_World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Data/World/Chunk/ChunkTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Chunk/ChunkTags.js");
//objects




class ColumnDataTool extends _Classes_DataToolBase_js__WEBPACK_IMPORTED_MODULE_1__.EncodedPositionDataTool {
    tags = _Data_World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_2__.ColumnTags;
    _column = {};
    loadIn() {
        const column = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.column.get(this.location);
        if (!column)
            return false;
        this.tags.setBuffer(column.data);
        this._c = column.data;
        this._column = column;
        return true;
    }
    setColumn(column) {
        this.tags.setBuffer(column.data);
        this._c = column.data;
        this._column = column;
        return this;
    }
    getColumn() {
        return this._column;
    }
    getNumChunks() {
        return this._column.chunks.size;
    }
    getBufferSizeForWholeColumn() {
        return _Data_World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_2__.ColumnTags.tagSize + _Data_World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_3__.ChunkTags.tagSize * this.getNumChunks();
    }
    isStored() {
        return this.getTagValue("#dve_is_stored") == 1;
    }
    markAsNotStored() {
        this.setTagValue("#dve_is_stored", 0);
        return this;
    }
    markAsStored() {
        this.setTagValue("#dve_is_stored", 1);
        return this;
    }
    isPersistent() {
        return this.getTagValue("#dve_persistent") == 1;
    }
    setPersistence(value) {
        this.setTagValue("#dve_persistent", value ? 1 : 0);
    }
    isDirty() {
        return this.getTagValue("#dve_is_dirty") == 1;
    }
    setDirty(value) {
        this.setTagValue("#dve_is_dirty", value ? 1 : 0);
    }
    getLastSaveTimestamp() {
        return this.getTagValue("#dve_last_save_timestamp");
    }
    setLastSaveTimestamp() {
        return this.setTagValue("#dve_last_save_timestamp", Date.now());
    }
    getLastAnalyzerUpdateTimestamp() {
        return this.getTagValue("#dve_last_analyzer_update_timestamp");
    }
    setLastAnalyzerUpdateTimestamp() {
        return this.setTagValue("#dve_last_analyzer_update_timestamp", Date.now());
    }
    hasRichData() {
        return this.getTagValue("#dve_has_rich_data") == 1;
    }
    setRichData(value) {
        this.setTagValue("#dve_has_rich_data", value ? 1 : 0);
    }
    hasEntityData() {
        return this.getTagValue("#dve_has_entity_data") == 1;
    }
    setEntityData(value) {
        this.setTagValue("#dve_has_entity_data", value ? 1 : 0);
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/HeightMapTool.js":
/*!*********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/HeightMapTool.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeightMapTool": () => (/* binding */ HeightMapTool)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Data/World/WorldBounds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldBounds.js");
/* harmony import */ var _Tools_Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Tools/Classes/LocationBoundTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/LocationBoundTool.js");
/* harmony import */ var _ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Data/Constants/Tags/ChunkTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/ChunkTagIds.js");
/* harmony import */ var _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Math/Constants/CardinalNeighbors.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/CardinalNeighbors.js");
//Data



//tools


//constants


class HeightMapTool extends _Tools_Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_3__.LocationBoundTool {
    static _chunkTool = new _ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_4__.ChunkDataTool();
    chunk = {
        _c: new DataView(new ArrayBuffer(0)),
        _y: 0,
        loadInAt: (x, y, z) => {
            const chunk = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.chunk.get([this.dimension, x, y, z]);
            if (!chunk)
                return false;
            HeightMapTool._chunkTool.setChunk(chunk);
            this.chunk._c = chunk.data;
        },
        loadInAtLocation(location) {
            const chunk = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.chunk.get(location);
            if (!chunk)
                return false;
            HeightMapTool._chunkTool.setChunk(chunk);
            this._c = chunk.data;
        },
        setChunk(chunk) {
            HeightMapTool._chunkTool.setChunk(chunk);
            this._c = chunk.data;
        },
        setY(y) {
            _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.voxel.setXYZ(0, y, 0);
            this._y = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.voxel.getPosition().y;
            return this;
        },
        getMinMax() {
            HeightMapTool._chunkTool._c = this._c;
            let min = Infinity;
            let max = -Infinity;
            let i = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.chunk.getHeight();
            while (i--) {
                if (this.setY(i).hasVoxels()) {
                    if (i < min)
                        min = i;
                    if (i > max)
                        max = i;
                }
            }
            return [min, max];
        },
        hasVoxels() {
            HeightMapTool._chunkTool._c = this._c;
            return (HeightMapTool._chunkTool.getArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_5__.ChunkTagIDs.heightMap, this._y) ==
                1);
        },
        isDirty() {
            HeightMapTool._chunkTool._c = this._c;
            return (HeightMapTool._chunkTool.getArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_5__.ChunkTagIDs.dirtyMap, this._y) ==
                1);
        },
        setHasVoxels(hasVoxels) {
            HeightMapTool._chunkTool._c = this._c;
            return HeightMapTool._chunkTool.setArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_5__.ChunkTagIDs.heightMap, this._y, hasVoxels ? 1 : 0);
        },
        setDirty(isDirty) {
            HeightMapTool._chunkTool._c = this._c;
            return HeightMapTool._chunkTool.setArrayTagValue(_Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_5__.ChunkTagIDs.dirtyMap, this._y, isDirty ? 1 : 0);
        },
    };
    column = {
        getRelative(location) {
            location = [...location];
            const chunkWidth = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.chunk._bounds.x;
            const chunkDepth = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.chunk._bounds.z;
            let maxHeight = -Infinity;
            const [dimension, x, y, z] = location;
            for (const check of _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_6__.$2dMooreNeighborhood) {
                location[1] = check[0] * chunkWidth + x;
                location[3] = check[1] * chunkDepth + z;
                const height = this.getAbsolute(location);
                if (height > maxHeight) {
                    maxHeight = height;
                }
            }
            return maxHeight;
        },
        getAbsolute: (location) => {
            const column = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.column.get(location);
            if (!column)
                return _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_2__.WorldBounds.bounds.MinY;
            if (column.chunks.size == 0)
                return _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_2__.WorldBounds.bounds.MinY;
            let maxHeight = _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_2__.WorldBounds.bounds.MinY;
            for (const [key, chunk] of column.chunks) {
                if (!chunk)
                    continue;
                this.chunk.setChunk(chunk);
                const chunkPOS = HeightMapTool._chunkTool.getPositionData();
                let [chunkMin, chunkMax] = this.chunk.getMinMax();
                if (chunkMax == 0)
                    continue;
                chunkMax += chunkPOS.y;
                if (maxHeight < chunkMax) {
                    maxHeight = chunkMax;
                }
            }
            return maxHeight + 1;
        },
    };
}



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/RegionDataTool.js":
/*!**********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/RegionDataTool.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegionDataTool": () => (/* binding */ RegionDataTool)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Classes_DataToolBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Classes/DataToolBase.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/DataToolBase.js");
/* harmony import */ var _Data_World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Data/World/Region/RegionTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionTags.js");
//objects



class RegionDataTool extends _Classes_DataToolBase_js__WEBPACK_IMPORTED_MODULE_1__.EncodedPositionDataTool {
    tags = _Data_World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_2__.RegionTags;
    _region = {};
    loadIn() {
        const reigon = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.region.get(this.location);
        if (!reigon)
            return false;
        this.tags.setBuffer(reigon.data);
        this._region = reigon;
        this._c = reigon.data;
        return true;
    }
    setRegion(region) {
        this.tags.setBuffer(region.data);
        this._region = region;
        this._c = region.data;
        return this;
    }
    getRegion() {
        return this._region;
    }
    getRegionDataCount() {
        const region = this._region;
        let totalChunks = 0;
        region.columns.forEach((column) => {
            totalChunks += column.chunks.size;
        });
        return {
            chunks: totalChunks,
            columns: region.columns.size,
        };
    }
}


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Comm/Comm.js":
/*!*************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Comm/Comm.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommBase": () => (/* binding */ CommBase)
/* harmony export */ });
/* harmony import */ var _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ThreadComm.js */ "../../DSLIBS/threadComm/dist/ThreadComm.js");
/* harmony import */ var _Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Internal/Messages.js */ "../../DSLIBS/threadComm/dist/Internal/Messages.js");
/* harmony import */ var _Tasks_PromiseTasks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Tasks/PromiseTasks.js */ "../../DSLIBS/threadComm/dist/Tasks/PromiseTasks.js");
/* harmony import */ var _Internal_InternalTasks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Internal/InternalTasks.js */ "../../DSLIBS/threadComm/dist/Internal/InternalTasks.js");




class CommBase {
    name;
    managerName;
    environment = "browser";
    __ready = false;
    port = null;
    messageFunctions = {};
    _manager = null;
    constructor(name, managerName = "worker", commManager = null) {
        this.name = name;
        this.managerName = managerName;
        this._manager = commManager;
    }
    destroy() {
        if (!this.port)
            return;
        if ("terminate" in this.port) {
            this.port.terminate();
        }
    }
    isReady() {
        return this.isPortSet();
    }
    __sendReadySignal() {
        this.sendMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCMessageHeaders.internal, [
            _Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.IsReady,
            _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.threadName,
        ]);
    }
    __onSetPortRun = (port) => { };
    isPortSet() {
        return Boolean(this.port);
    }
    onSetPort(set) {
        this.__onSetPortRun = set;
    }
    __handleMessage(data, event) {
        this.onMessage(data, event);
        if (_Internal_InternalTasks_js__WEBPACK_IMPORTED_MODULE_3__.InternalTasks.isInternal(data)) {
            return _Internal_InternalTasks_js__WEBPACK_IMPORTED_MODULE_3__.InternalTasks.runInternal(data, event);
        }
        if (this._manager) {
            if (this._manager.__isManagerMessage(data)) {
                this._manager.__handleManagerMessage(data, event);
                return;
            }
        }
        const message = data[0];
        if (this.messageFunctions[message]) {
            this.messageFunctions[message].forEach((_) => _(data, event));
            return;
        }
    }
    setPort(port) {
        if (!port) {
            return this.__throwError("Port or worker must not be null.");
        }
        this.port = port;
        this.__onSetPortRun(port);
        if (this.environment == "browser") {
            port.onmessage = (event) => {
                this.__handleMessage(event.data, event);
            };
            port.onmessageerror = (event) => {
                console.log(event);
                this.__throwError("Error occured.");
            };
        }
        if (this.environment == "node") {
            port.on("message", (data) => {
                this.__handleMessage(data, data);
            });
            port.on("error", (data) => {
                console.log(data);
                this.__throwError("Error occured.");
            });
        }
        this.__sendReadySignal();
    }
    __throwError(message) {
        throw new Error(`[ThreadComm: ${this.name}] ${message}`);
    }
    sendMessage(message, data = [], transfers) {
        if (!this.port) {
            return this.__throwError("Port is not set.");
        }
        if (this.environment == "browser" && transfers) {
            this.port.postMessage([message, ...data], transfers);
            return;
        }
        this.port.postMessage([message, ...data]);
    }
    listenForMessage(message, run) {
        this.messageFunctions[message] ??= [];
        this.messageFunctions[message].push(run);
    }
    connectToComm(commToConnectTo) {
        const channel = new MessageChannel();
        commToConnectTo.__sendInternalMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.connectPort, [this.name, this.managerName, channel.port1], [channel.port1]);
        this.__sendInternalMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.connectPort, [commToConnectTo.name, commToConnectTo.managerName, channel.port2], [channel.port2]);
    }
    runTasks(id, data, transfers = [], queueId) {
        let mode = 0;
        let tid = "";
        if (queueId) {
            mode = 2;
            tid = queueId;
        }
        this.__sendInternalMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.runTasks, [id, _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.threadName, mode, tid, data], transfers);
    }
    waitTillTasksExist(id) {
        return new Promise((resolve) => {
            const inte = setInterval(() => {
                this.tasksExist(id, (exists) => {
                    if (exists) {
                        resolve(true);
                        clearInterval(inte);
                    }
                });
            }, 10);
        });
    }
    tasksExist(id, onDone) {
        const promiseId = `${this.name}-${id}-${Date.now()}`;
        this.__sendInternalMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.checkTasks, [
            id,
            _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.threadName,
            promiseId,
        ]);
        _Tasks_PromiseTasks_js__WEBPACK_IMPORTED_MODULE_2__.PromiseTasks.addPromiseTakss("tasks-check", promiseId, (data) => {
            onDone(data);
        });
    }
    runPromiseTasks(id, data, transfers = [], onDone) {
        const requestsID = _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.crypto.randomUUID();
        _Tasks_PromiseTasks_js__WEBPACK_IMPORTED_MODULE_2__.PromiseTasks.addPromiseTakss(id, requestsID, onDone);
        this.__sendInternalMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.runTasks, [id, _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.threadName, 1, requestsID, data], transfers);
    }
    __sendInternalMessage(id, data = [], transfers = []) {
        this.sendMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCMessageHeaders.internal, [id, ...data], transfers);
    }
    __syncQueue(id, sab) {
        this.sendMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCMessageHeaders.internal, [
            _Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.syncQueue,
            _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.threadName,
            id,
            sab,
        ]);
    }
    __unSyqncQueue(id) {
        this.sendMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCMessageHeaders.internal, [
            _Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.unSyncQueue,
            _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.threadName,
            id,
        ]);
    }
    syncData(dataType, data, transfers) {
        this.__sendInternalMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.SyncData, [dataType, data], transfers);
    }
    unSyncData(dataType, data, transfers) {
        this.__sendInternalMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_1__.TCInternalMessages.UnSyncData, [dataType, data], transfers);
    }
    waitTillReady() {
        const self = this;
        return new Promise((resolve, reject) => {
            const inte = setInterval(() => {
                if (this.isReady()) {
                    clearInterval(inte);
                    resolve(true);
                }
            }, 1);
        });
    }
    //meant to be over-ridden for debugging or custom behavior
    onMessage(data, event) { }
}


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Data/DataSync.js":
/*!*****************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Data/DataSync.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSync": () => (/* binding */ DataSync)
/* harmony export */ });
class DataSync {
    __onSyncFunctions = [];
    __onUnSyncFunctions = [];
    constructor() { }
    addOnSync(func) {
        this.__onSyncFunctions.push(func);
    }
    addOnUnSync(func) {
        this.__onUnSyncFunctions.push(func);
    }
    sync(data) {
        for (const func of this.__onSyncFunctions) {
            func(data);
        }
    }
    unSync(data) {
        for (const func of this.__onUnSyncFunctions) {
            func(data);
        }
    }
}


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Data/DataSyncManager.js":
/*!************************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Data/DataSyncManager.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSyncManager": () => (/* binding */ DataSyncManager)
/* harmony export */ });
/* harmony import */ var _DataSync_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataSync.js */ "../../DSLIBS/threadComm/dist/Data/DataSync.js");

const DataSyncManager = {
    _onDataSync: new Map(),
    registerDataSync(dataType, onSync, onUnSync) {
        const sync = new _DataSync_js__WEBPACK_IMPORTED_MODULE_0__.DataSync();
        if (onSync) {
            sync.addOnSync(onSync);
        }
        if (onUnSync) {
            sync.addOnUnSync(onUnSync);
        }
        this._onDataSync.set(dataType, sync);
        return sync;
    },
    getDataSync(id) {
        const dataSync = this._onDataSync.get(id);
        if (!dataSync)
            return false;
        return dataSync;
    }
};


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Internal/InternalTasks.js":
/*!**************************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Internal/InternalTasks.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InternalTasks": () => (/* binding */ InternalTasks)
/* harmony export */ });
/* harmony import */ var _Messages_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages.js */ "../../DSLIBS/threadComm/dist/Internal/Messages.js");
/* harmony import */ var _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ThreadComm.js */ "../../DSLIBS/threadComm/dist/ThreadComm.js");
/* harmony import */ var _Tasks_PromiseTasks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Tasks/PromiseTasks.js */ "../../DSLIBS/threadComm/dist/Tasks/PromiseTasks.js");
/* harmony import */ var _Queue_SyncedQueue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Queue/SyncedQueue.js */ "../../DSLIBS/threadComm/dist/Queue/SyncedQueue.js");
/* harmony import */ var _Tasks_TaskManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Tasks/TaskManager.js */ "../../DSLIBS/threadComm/dist/Tasks/TaskManager.js");
/* harmony import */ var _Data_DataSyncManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Data/DataSyncManager.js */ "../../DSLIBS/threadComm/dist/Data/DataSyncManager.js");






const InternalTasks = {
    _tasks: new Map(),
    registerTasks(headID, taskId, run) {
        let map = this._tasks.get(headID);
        if (!map) {
            map = new Map();
            this._tasks.set(headID, map);
        }
        map.set(taskId, run);
    },
    isInternal(data) {
        const headerId = data[0];
        const tasksId = data[1];
        if (typeof headerId !== "number" || typeof tasksId !== "number")
            return false;
        const map = this._tasks.get(headerId);
        if (!map)
            return false;
        const tasks = map.get(tasksId);
        if (!tasks)
            return false;
        return true;
    },
    runInternal(data, event) {
        const headerId = data[0];
        const tasksId = data[1];
        const map = this._tasks.get(headerId);
        if (!map)
            return false;
        const tasks = map.get(tasksId);
        if (!tasks)
            return false;
        data.shift();
        data.shift();
        tasks(data, event);
    },
};
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.connectPort, (data, event) => {
    const threadName = data[0];
    const threadManager = data[1];
    let port;
    if (_ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.environment == "browser") {
        port = event.ports[0];
    }
    else {
        port = data[2];
    }
    if (threadManager == "worker") {
        const comm = _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getComm(threadName);
        comm.setPort(port);
    }
    if (threadManager != "worker") {
        const comm = _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getCommManager(threadManager);
        comm.addPort(port);
    }
});
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.IsReady, (data, event) => {
    const name = data[0];
    const comm = _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getComm(name);
    if (!comm)
        return;
    comm.__ready = true;
});
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.nameThread, (data, event) => {
    const name = data[0];
    const number = data[1];
    _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.threadName = name;
    _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.threadNumber = number;
});
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.syncQueue, (data, event) => {
    const threadName = data[0];
    const queueId = data[1];
    const queueSAB = data[2];
    if (!_ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm._queues.has(threadName)) {
        _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm._queues.set(threadName, new Map());
    }
    //@ts-ignore
    _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm._queues.get(threadName)
        .set(queueId, new _Queue_SyncedQueue_js__WEBPACK_IMPORTED_MODULE_3__.SyncedQueue(queueId, queueSAB));
});
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.unSyncQueue, (data, event) => {
    const threadName = data[0];
    const queueId = data[1];
    if (!_ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm._queues.has(threadName)) {
        return;
    }
    //@ts-ignore
    _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm._queues.get(threadName).delete(queueId);
});
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.completeTasks, (data, event) => {
    const tasksId = data[0];
    const requestsId = data[1];
    const tasksData = data[2];
    _Tasks_PromiseTasks_js__WEBPACK_IMPORTED_MODULE_2__.PromiseTasks.completePromiseTasks(tasksId, requestsId, tasksData);
});
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.checkTasksResult, (data, event) => {
    const result = data[0];
    const promiseId = data[1];
    _Tasks_PromiseTasks_js__WEBPACK_IMPORTED_MODULE_2__.PromiseTasks.completePromiseTasks("tasks-check", promiseId, result);
});
const __handleTasksDone = (tasksId, mode, threadId, tid, tasksData, transfers) => {
    if (mode == 1) {
        const comm = _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getComm(threadId);
        comm.sendMessage(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, [_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.completeTasks, tasksId, tid, tasksData], transfers);
    }
    if (mode == 2) {
        //complete queue
        if (tid && threadId) {
            const queue = _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getSyncedQueue(threadId, tid);
            if (queue) {
                queue.subtractFromCount();
            }
        }
    }
};
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.runTasks, async (data, event) => {
    //remove tasks id
    const tasksId = data.shift();
    //remove thread id
    const threadId = data.shift();
    //remove queue id
    const mode = data.shift();
    //remove queue id
    const tid = data.shift();
    const takss = _Tasks_TaskManager_js__WEBPACK_IMPORTED_MODULE_4__.TasksManager.getTasks(tasksId);
    if (!takss)
        return;
    if (takss.mode == "async") {
        const tasksData = await takss.run(data[0]);
        __handleTasksDone(tasksId, mode, threadId, tid, tasksData, []);
    }
    if (takss.mode == "deferred") {
        await takss.run(data[0], (tasksData, transfers) => {
            __handleTasksDone(tasksId, mode, threadId, tid, tasksData, transfers);
        });
    }
});
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.checkTasks, async (data, event) => {
    //remove tasks id
    const tasksId = data.shift();
    //remove thread id
    const threadId = data.shift();
    //remove promise id
    const promiseId = data.shift();
    const thread = _ThreadComm_js__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getComm(threadId);
    const takss = _Tasks_TaskManager_js__WEBPACK_IMPORTED_MODULE_4__.TasksManager.getTasks(tasksId);
    if (!takss)
        return;
    if (takss && thread) {
        thread.sendMessage(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, [
            _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.checkTasksResult,
            true,
            promiseId,
        ]);
    }
    if (!takss && thread) {
        thread.sendMessage(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, [
            _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.checkTasksResult,
            false,
            promiseId,
        ]);
    }
});
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.SyncData, async (data, event) => {
    //remove tasks id
    const dataTypeId = data.shift();
    const dataSync = _Data_DataSyncManager_js__WEBPACK_IMPORTED_MODULE_5__.DataSyncManager.getDataSync(dataTypeId);
    if (!dataSync)
        return false;
    const syncData = data.shift();
    dataSync.sync(syncData);
});
InternalTasks.registerTasks(_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, _Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.UnSyncData, async (data, event) => {
    //remove tasks id
    const dataTypeId = data.shift();
    const dataSync = _Data_DataSyncManager_js__WEBPACK_IMPORTED_MODULE_5__.DataSyncManager.getDataSync(dataTypeId);
    if (!dataSync)
        return false;
    const unSyncData = data.shift();
    dataSync.unSync(unSyncData);
});


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Internal/Messages.js":
/*!*********************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Internal/Messages.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TCInternalMessages": () => (/* binding */ TCInternalMessages),
/* harmony export */   "TCMessageHeaders": () => (/* binding */ TCMessageHeaders)
/* harmony export */ });
const TCMessageHeaders = Object.freeze({
    internal: -99,
});
const TCInternalMessages = {
    IsReady: -99,
    nameThread: -98,
    connectPort: -97,
    syncQueue: -96,
    unSyncQueue: -95,
    completeTasks: -94,
    checkTasksResult: -93,
    runTasks: -98,
    checkTasks: -97,
    message: -95,
    SyncData: -990,
    UnSyncData: -980,
};
let start = -1_000;
for (const key in TCInternalMessages) {
    TCInternalMessages[key] = start;
    start += 1;
}


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Manager/CommManager.js":
/*!***********************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Manager/CommManager.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommManager": () => (/* binding */ CommManager)
/* harmony export */ });
/* harmony import */ var _Internal_Messages_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Internal/Messages.js */ "../../DSLIBS/threadComm/dist/Internal/Messages.js");
/* harmony import */ var _Comm_Comm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Comm/Comm.js */ "../../DSLIBS/threadComm/dist/Comm/Comm.js");
/* harmony import */ var _Queue_QueueManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Queue/QueueManager.js */ "../../DSLIBS/threadComm/dist/Queue/QueueManager.js");
/* harmony import */ var _ThreadComm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThreadComm.js */ "../../DSLIBS/threadComm/dist/ThreadComm.js");
//constants

//classes



class CommManager {
    _totalComms = 0;
    _currentCom = 0;
    name = "";
    __comms = [];
    __data = {
        name: "",
        onPortSet: (port, commName) => { },
    };
    __queues = {};
    messageFunctions = {};
    constructor(data) {
        this.__data = data;
        this.name = data.name;
    }
    __throwError(message) {
        throw new Error(`[ThreadCommManager : ${this.__data.name}] ${message}`);
    }
    connectToCom(commToConnectTo) {
        for (const comm of this.__comms) {
            comm.connectToComm(commToConnectTo);
        }
    }
    destroyAll() {
        for (const comm of this.__comms) {
            comm.destroy();
        }
    }
    isReady() {
        let ready = true;
        for (const comm of this.__comms) {
            if (!comm.isPortSet())
                ready = false;
        }
        return ready;
    }
    waitTillAllAreReady() {
        const self = this;
        return new Promise((resolve, reject) => {
            const inte = setInterval(() => {
                if (this.isReady()) {
                    clearInterval(inte);
                    resolve(true);
                }
            }, 1);
        });
    }
    addPort(port) {
        this._totalComms++;
        const newCommName = `${this.__data.name}-${this._totalComms}`;
        const newComm = new _Comm_Comm_js__WEBPACK_IMPORTED_MODULE_1__.CommBase(newCommName, this.__data.name, this);
        _ThreadComm_js__WEBPACK_IMPORTED_MODULE_3__.ThreadComm.addComm(newComm);
        newComm.setPort(port);
        this.__data.onPortSet(port, newCommName);
        this.__comms.push(newComm);
        newComm.sendMessage(_Internal_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCMessageHeaders.internal, [
            _Internal_Messages_js__WEBPACK_IMPORTED_MODULE_0__.TCInternalMessages.nameThread,
            newCommName,
            this._totalComms,
        ]);
    }
    addPorts(ports) {
        for (const port of ports) {
            this.addPort(port);
        }
    }
    addComms(comms) {
        this._totalComms += comms.length;
        this.__comms.push(...comms);
    }
    __isManagerMessage(data) {
        return this.messageFunctions[data[0]] !== undefined;
    }
    __handleManagerMessage(data, event) {
        if (!this.messageFunctions[data[0]])
            return;
        this.messageFunctions[data[0]].forEach((_) => _(data, event));
    }
    listenForMessage(message, run) {
        this.messageFunctions[message] ??= [];
        this.messageFunctions[message].push(run);
    }
    sendMessageToAll(message, data = [], transfers) {
        for (const comm of this.__comms) {
            comm.sendMessage(message, data, transfers);
        }
    }
    runTasksForAll(id, data, transfers = [], queueId) {
        for (const comm of this.__comms) {
            comm.runTasks(id, data, transfers, queueId);
        }
    }
    runTask(id, data, transfers = [], threadNumber = -1, queueId) {
        if (threadNumber < 0) {
            const comm = this.__comms[this._currentCom];
            comm.runTasks(id, data, transfers, queueId);
            return this.__handleCount();
        }
        else {
            const comm = this.__comms[threadNumber];
            comm.runTasks(id, data, transfers, queueId);
            return threadNumber;
        }
    }
    runPromiseTasks(id, data, transfers = [], onDone, threadNumber, excludeThread = -1) {
        if (typeof threadNumber === "undefined") {
            if (this._currentCom == excludeThread) {
                this.__handleCount();
            }
            const comm = this.__comms[this._currentCom];
            comm.runPromiseTasks(id, data, transfers, onDone);
            return this.__handleCount();
        }
        else {
            const comm = this.__comms[threadNumber];
            comm.runPromiseTasks(id, data, transfers, onDone);
            return threadNumber;
        }
    }
    __handleCount() {
        let countReturn = this._currentCom;
        this._currentCom++;
        if (this._currentCom >= this._totalComms) {
            this._currentCom = 0;
        }
        return countReturn;
    }
    addQueue(id, associatedTasksId, getQueueKey = null, beforeRun = (data) => data, afterRun = (data, thread) => { }, getThread = (data) => -1, getTransfers = (data) => []) {
        if (this.__queues[id]) {
            this.__throwError(`Queue with ${id} already exists.`);
        }
        const newQueue = new _Queue_QueueManager_js__WEBPACK_IMPORTED_MODULE_2__.QueueManager(id, (data, queueId) => {
            data = beforeRun(data);
            const thread = this.runTask(associatedTasksId, data, getTransfers(data), getThread(data), queueId);
            afterRun(data, thread);
        }, this, getQueueKey);
        this.__queues[id] = newQueue;
        return newQueue;
    }
    getQueue(id) {
        const queue = this.__queues[id];
        if (!queue) {
            this.__throwError(`Queue with ${id} does not exists.`);
        }
        return queue;
    }
    __syncQueue(id, sab) {
        for (const comm of this.__comms) {
            comm.__syncQueue(id, sab);
        }
    }
    __unSyncQueue(id) {
        for (const comm of this.__comms) {
            comm.__unSyqncQueue(id);
        }
    }
    syncData(dataType, data) {
        for (const comm of this.__comms) {
            comm.syncData(dataType, data);
        }
    }
    unSyncData(dataType, data) {
        for (const comm of this.__comms) {
            comm.unSyncData(dataType, data);
        }
    }
}


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Meta/Comm/Comm.types.js":
/*!************************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Meta/Comm/Comm.types.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Queue/QueueManager.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Queue/QueueManager.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueueManager": () => (/* binding */ QueueManager)
/* harmony export */ });
/* harmony import */ var _tools_Queue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/Queue.js */ "../../DSLIBS/threadComm/dist/tools/Queue.js");

class QueueManager {
    id;
    onRun;
    _manager;
    getQueueKey;
    __queueData = {};
    constructor(id, onRun, _manager, getQueueKey = null) {
        this.id = id;
        this.onRun = onRun;
        this._manager = _manager;
        this.getQueueKey = getQueueKey;
    }
    __getQueueKey(data) {
        if (this.getQueueKey !== null) {
            return this.getQueueKey(data);
        }
        if (Array.isArray(data)) {
            return data.toString();
        }
        if (typeof data == "object") {
            return JSON.stringify(data);
        }
        return String(data);
    }
    __getQueueData(id) {
        const queue = this.__queueData[id];
        if (!queue) {
            throw new Error(`Queue with id: ${id} does not exists.`);
        }
        return this.__queueData[id];
    }
    addQueue(queueId) {
        const sab = new SharedArrayBuffer(4);
        if (this.__queueData[queueId])
            return false;
        this.__queueData[queueId] = {
            queue: new _tools_Queue_js__WEBPACK_IMPORTED_MODULE_0__.Queue(),
            map: {},
            stateSAB: sab,
            state: new Uint32Array(sab),
        };
        const syncId = this._getSyncId(queueId);
        this._manager.__syncQueue(syncId, sab);
        return true;
    }
    _getSyncId(queueId) {
        return `${this.id}-${queueId}`;
    }
    removeQueue(queueId) {
        if (!this.__queueData[queueId])
            return false;
        delete this.__queueData[queueId];
        const syncId = this._getSyncId(queueId);
        this._manager.__unSyncQueue(syncId);
        return true;
    }
    add(data, queueId = "main") {
        const queueData = this.__getQueueData(queueId);
        const queueKey = this.__getQueueKey(data);
        if (queueData.map[queueKey])
            return;
        queueData.map[queueKey] = true;
        queueData.queue.enqueue(data);
    }
    run(queueId = "main", filter) {
        const reQueue = new _tools_Queue_js__WEBPACK_IMPORTED_MODULE_0__.Queue();
        const newMap = {};
        const queueData = this.__getQueueData(queueId);
        const queue = queueData.queue;
        const state = queueData.state;
        const syncId = this._getSyncId(queueId);
        while (true) {
            const data = queue.dequeue();
            if (!data)
                break;
            if (filter) {
                const filterReturn = filter(data);
                if (filterReturn == 0)
                    continue;
                if (filterReturn == 1) {
                    newMap[this.__getQueueKey(data)] = true;
                    reQueue.enqueue(data);
                    continue;
                }
            }
            Atomics.add(state, 0, 1);
            this.onRun(data, syncId);
        }
        this.__queueData[queueId].map = {};
        if (filter) {
            this.__queueData[queueId].queue = queue;
            this.__queueData[queueId].map = newMap;
        }
    }
    runAndAwait(queueId = "main", filter) {
        this.run(queueId, filter);
        return this.awaitAll(queueId);
    }
    awaitAll(queueId = "main") {
        const queueData = this.__getQueueData(queueId);
        return new Promise((resolve, reject) => {
            const inte = setInterval(() => {
                if (Atomics.load(queueData.state, 0) == 0) {
                    clearInterval(inte);
                    resolve(true);
                }
            }, 1);
        });
    }
    onDone(queueId = "main", run) {
        const queueData = this.__getQueueData(queueId);
        const inte = setInterval(() => {
            if (Atomics.load(queueData.state, 0) == 0) {
                clearInterval(inte);
                run();
            }
        }, 1);
    }
    isDone(queueId = "main") {
        const queueData = this.__getQueueData(queueId);
        return Atomics.load(queueData.state, 0) == 0;
    }
}


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Queue/SyncedQueue.js":
/*!*********************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Queue/SyncedQueue.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyncedQueue": () => (/* binding */ SyncedQueue)
/* harmony export */ });
class SyncedQueue {
    id;
    sab;
    states = new Uint32Array();
    constructor(id, sab) {
        this.id = id;
        this.sab = sab;
        this.states = new Uint32Array(sab);
    }
    addToCount(total = 1) {
        Atomics.add(this.states, 0, total);
    }
    subtractFromCount(total = 1) {
        Atomics.sub(this.states, 0, total);
    }
    getCount() {
        return Atomics.load(this.states, 0);
    }
    isDone() {
        return this.getCount() == 0;
    }
    onDone(onDone) {
        const inte = setInterval(() => {
            if (this.getCount() == 0) {
                clearInterval(inte);
                onDone();
            }
        }, 1);
    }
    wait() {
        return new Promise((resolve, reject) => {
            this.onDone(() => {
                resolve(true);
            });
        });
    }
}


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Tasks/PromiseTasks.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Tasks/PromiseTasks.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PromiseTasks": () => (/* binding */ PromiseTasks)
/* harmony export */ });
const PromiseTasks = {
    _waiting: (new Map()),
    addPromiseTakss(tasksId, tasksRequestsId, onDone) {
        let requestsMap = this._waiting.get(tasksId);
        if (!requestsMap) {
            requestsMap = new Map();
            this._waiting.set(tasksId, requestsMap);
        }
        requestsMap.set(tasksRequestsId, onDone);
    },
    completePromiseTasks(tasksId, tasksRequestsId, data) {
        let requestsMap = this._waiting.get(tasksId);
        if (!requestsMap)
            return;
        const run = requestsMap.get(tasksRequestsId);
        requestsMap.delete(tasksRequestsId);
        if (!run)
            return;
        run(data);
    },
};


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Tasks/TaskManager.js":
/*!*********************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Tasks/TaskManager.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TasksManager": () => (/* binding */ TasksManager)
/* harmony export */ });
/* harmony import */ var _Tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tasks.js */ "../../DSLIBS/threadComm/dist/Tasks/Tasks.js");

const TasksManager = {
    _tasks: new Map(),
    registerTasks(id, run, mode = "async") {
        const tasks = new _Tasks_js__WEBPACK_IMPORTED_MODULE_0__.Task(id, run, mode);
        this._tasks.set(id, tasks);
        return tasks;
    },
    getTasks(id) {
        const tasks = this._tasks.get(id);
        if (!tasks)
            return false;
        return tasks;
    },
};


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/Tasks/Tasks.js":
/*!***************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/Tasks/Tasks.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
class Task {
    name;
    run;
    mode;
    constructor(name, run, mode) {
        this.name = name;
        this.run = run;
        this.mode = mode;
    }
}


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/ThreadComm.js":
/*!**************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/ThreadComm.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThreadComm": () => (/* binding */ ThreadComm)
/* harmony export */ });
/* harmony import */ var _Manager_CommManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager/CommManager.js */ "../../DSLIBS/threadComm/dist/Manager/CommManager.js");
/* harmony import */ var _Comm_Comm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comm/Comm.js */ "../../DSLIBS/threadComm/dist/Comm/Comm.js");
/* harmony import */ var _Tasks_TaskManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tasks/TaskManager.js */ "../../DSLIBS/threadComm/dist/Tasks/TaskManager.js");
/* harmony import */ var _Data_DataSyncManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Data/DataSyncManager.js */ "../../DSLIBS/threadComm/dist/Data/DataSyncManager.js");
/* harmony import */ var _Internal_InternalTasks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Internal/InternalTasks.js */ "../../DSLIBS/threadComm/dist/Internal/InternalTasks.js");
//classes





const ThreadComm = {
    threadNumber: 0,
    threadName: "unamed-threadcomm-thread",
    environment: "browser",
    _comms: {},
    _commManageras: {},
    _queues: new Map(),
    parent: new _Comm_Comm_js__WEBPACK_IMPORTED_MODULE_1__.CommBase(""),
    internal: _Internal_InternalTasks_js__WEBPACK_IMPORTED_MODULE_4__.InternalTasks,
    __initalized: false,
    __expectedPorts: {},
    crypto: {},
    async $INIT(threadName, threadParentName) {
        this.threadName = threadName;
        this.parent.name = threadParentName;
        const port = await this.getWorkerPort();
        this.parent.setPort(port);
        this.__initalized = true;
        this.addComm(this.parent);
        if (this.environment == "browser") {
            this.crypto = crypto;
        }
        if (this.environment == "node") {
            //@ts-ignore
            this.crypto = require("crypto");
        }
    },
    getSyncedQueue(threadId, queueId) {
        if (!this._queues.has(threadId))
            return;
        return this._queues.get(threadId)?.get(queueId);
    },
    addComm(comm) {
        this._comms[comm.name] = comm;
    },
    createComm(name, mergeObject = {}) {
        const newCom = Object.assign(new _Comm_Comm_js__WEBPACK_IMPORTED_MODULE_1__.CommBase(name), mergeObject);
        this._comms[name] = newCom;
        return newCom;
    },
    createCommManager(data) {
        const newCommManager = new _Manager_CommManager_js__WEBPACK_IMPORTED_MODULE_0__.CommManager(data);
        this._commManageras[data.name] = newCommManager;
        return newCommManager;
    },
    getComm(id) {
        return this._comms[id];
    },
    getCommManager(id) {
        return this._commManageras[id];
    },
    async getWorkerPort() {
        if (this.environment == "browser") {
            return self;
        }
        if (this.environment == "node") {
            //@ts-ignore
            const { parentPort } = require("worker_threads");
            return parentPort;
        }
    },
    registerTasks(id, run, mode = "async") {
        _Tasks_TaskManager_js__WEBPACK_IMPORTED_MODULE_2__.TasksManager.registerTasks(id, run, mode);
    },
    onDataSync(dataType, onSync, onUnSync) {
        return _Data_DataSyncManager_js__WEBPACK_IMPORTED_MODULE_3__.DataSyncManager.registerDataSync(dataType, onSync, onUnSync);
    },
};
if (
//@ts-ignore
typeof process !== "undefined" &&
    typeof Worker === "undefined" &&
    typeof window === "undefined") {
    ThreadComm.environment = "node";
}


/***/ }),

/***/ "../../DSLIBS/threadComm/dist/index.js":
/*!*********************************************!*\
  !*** ../../DSLIBS/threadComm/dist/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommBase": () => (/* reexport safe */ _Comm_Comm_js__WEBPACK_IMPORTED_MODULE_1__.CommBase),
/* harmony export */   "CommManager": () => (/* reexport safe */ _Manager_CommManager_js__WEBPACK_IMPORTED_MODULE_3__.CommManager),
/* harmony export */   "DataSync": () => (/* reexport safe */ _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync),
/* harmony export */   "Task": () => (/* reexport safe */ _Tasks_Tasks_js__WEBPACK_IMPORTED_MODULE_4__.Task),
/* harmony export */   "ThreadComm": () => (/* reexport safe */ _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__.ThreadComm)
/* harmony export */ });
/* harmony import */ var _ThreadComm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ThreadComm.js */ "../../DSLIBS/threadComm/dist/ThreadComm.js");
/* harmony import */ var _Comm_Comm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comm/Comm.js */ "../../DSLIBS/threadComm/dist/Comm/Comm.js");
/* harmony import */ var _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Data/DataSync.js */ "../../DSLIBS/threadComm/dist/Data/DataSync.js");
/* harmony import */ var _Manager_CommManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Manager/CommManager.js */ "../../DSLIBS/threadComm/dist/Manager/CommManager.js");
/* harmony import */ var _Tasks_Tasks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tasks/Tasks.js */ "../../DSLIBS/threadComm/dist/Tasks/Tasks.js");
/* harmony import */ var _Meta_Comm_Comm_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Meta/Comm/Comm.types.js */ "../../DSLIBS/threadComm/dist/Meta/Comm/Comm.types.js");








/***/ }),

/***/ "../../DSLIBS/threadComm/dist/tools/Queue.js":
/*!***************************************************!*\
  !*** ../../DSLIBS/threadComm/dist/tools/Queue.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Queue": () => (/* binding */ Queue)
/* harmony export */ });
class QueueNode {
    data;
    next;
    constructor(data) {
        this.data = data;
    }
}
//test
class Queue {
    size = 0;
    first;
    last;
    enqueue(data) {
        const node = new QueueNode(data);
        if (this.size == 0) {
            this.first = node;
            this.last = node;
        }
        else {
            this.last.next = node;
            this.last = node;
        }
        this.size++;
    }
    dequeue() {
        if (this.size == 0)
            return null;
        if (!this.first)
            return null;
        let prevFirst = this.first;
        this.first = prevFirst.next;
        prevFirst.next = null;
        this.size--;
        return prevFirst.data;
    }
}


/***/ }),

/***/ "../../DSLIBS/voxelSpaces/dist/Classes/VoxelSpace.js":
/*!***********************************************************!*\
  !*** ../../DSLIBS/voxelSpaces/dist/Classes/VoxelSpace.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelSpace": () => (/* binding */ VoxelSpace)
/* harmony export */ });
class VSVec3 {
    x;
    y;
    z;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    copy() {
        return new VSVec3(this.x, this.y, this.z);
    }
    copyTo(vec3) {
        vec3.x = this.x;
        vec3.y = this.y;
        vec3.z = this.z;
    }
    toString() {
        return `${this.x}_${this.y}_${this.z}`;
    }
    multiply(vec3) {
        this.x *= vec3.x;
        this.y *= vec3.y;
        this.z *= vec3.z;
        return this;
    }
}
//Objects
class VoxelSpace {
    data;
    static simpleCubeHash(space) {
        space._position.x =
            (space._position.x >> space._boundsPower2.x) << space._boundsPower2.x;
        space._position.y =
            (space._position.y >> space._boundsPower2.y) << space._boundsPower2.y;
        space._position.z =
            (space._position.z >> space._boundsPower2.z) << space._boundsPower2.z;
        return space._position;
    }
    static getPositionFromIndex(position, bounds, index) {
        position.y = index % bounds.y >> 0;
        position.x = (index / bounds.y) % bounds.x >> 0;
        position.z = (index / (bounds.x * bounds.z)) >> 0;
        return position;
    }
    static getIndex(position, bounds) {
        return (position.y + position.x * bounds.y + position.z * bounds.z * bounds.x);
    }
    static WholeVec3 = new VSVec3(1, 1, 1);
    static spatialHash(space, parentSpace, divisor = VoxelSpace.WholeVec3) {
        const parentPosition = parentSpace.getPositionXYZ(space._position.x, space._position.y, space._position.z);
        space._hashedPosition.x =
            Math.abs(space._position.x - parentPosition.x) / divisor.x;
        space._hashedPosition.y =
            Math.abs(space._position.y - parentPosition.y) / divisor.y;
        space._hashedPosition.z =
            Math.abs(space._position.z - parentPosition.z) / divisor.z;
        return space._hashedPosition;
    }
    static mapLocationToVec3(location, vector) {
        location[1] = vector.x;
        location[2] = vector.y;
        location[3] = vector.z;
    }
    _location = ["main", 0, 0, 0];
    _position = new VSVec3(0, 0, 0);
    _hashedPosition = new VSVec3(0, 0, 0);
    _bounds = new VSVec3(0, 0, 0);
    _boundsPower2 = new VSVec3(0, 0, 0);
    _boundsSet = false;
    constructor(data) {
        this.data = data;
    }
    getVolume() {
        return this._bounds.x * this._bounds.y * this._bounds.z;
    }
    getArea() {
        return this._bounds.x * this._bounds.z;
    }
    getHeight() {
        return this._bounds.y;
    }
    getWidth() {
        return this._bounds.x;
    }
    getDepth() {
        return this._bounds.z;
    }
    setXYZ(x, y, z) {
        this._position.x = x;
        this._position.y = y;
        this._position.z = z;
        this.getPosition();
        VoxelSpace.mapLocationToVec3(this._location, this._position);
        return this;
    }
    setXZ(x, z) {
        this._position.x = x;
        this._position.z = z;
        this.getPosition();
        VoxelSpace.mapLocationToVec3(this._location, this._position);
        return this;
    }
    getLocation() {
        this.data.getPosition(this);
        VoxelSpace.mapLocationToVec3(this._location, this._position);
        return this._location;
    }
    getLocationXYZ(x, y, z) {
        this.setXYZ(x, y, z);
        VoxelSpace.mapLocationToVec3(this._location, this._position);
        return this._location;
    }
    setLocation(location) {
        this.setXYZ(location[1], location[2], location[3]);
        return this;
    }
    updateLoaction(location) {
        this.setXYZ(location[1], location[2], location[3]);
        location[1] = this._location[1];
        location[2] = this._location[2];
        location[3] = this._location[3];
        return this;
    }
    setCubeBounds(bounds) {
        if (this._boundsSet)
            return;
        this._boundsPower2.x = bounds.x;
        this._boundsPower2.y = bounds.y;
        this._boundsPower2.z = bounds.z;
        this._bounds.x = 2 ** this._boundsPower2.x;
        this._bounds.y = 2 ** this._boundsPower2.y;
        this._bounds.z = 2 ** this._boundsPower2.z;
        this._boundsSet = true;
        return this;
    }
    setBounds(bounds) {
        if (this._boundsSet)
            return;
        this._bounds.x = bounds.x;
        this._bounds.y = bounds.y;
        this._bounds.z = bounds.z;
        this._boundsSet = true;
        return this;
    }
    getPosition() {
        return this.data.getPosition(this);
    }
    getPositionXYZ(x, y, z) {
        return this.setXYZ(x, y, z).data.getPosition(this);
    }
    getPositionLocation(location) {
        return this.setLocation(location).data.getPosition(this);
    }
    getIndex() {
        return this.data.getIndex(this);
    }
    getIndexXYZ(x, y, z) {
        return this.setXYZ(x, y, z).data.getIndex(this);
    }
    getIndexToXYZ(index) {
        return this.data.getPostionFromIndex(this, index);
    }
    getIndexLocation(location) {
        return this.setLocation(location).data.getIndex(this);
    }
    getPositionFromIndex(index) {
        return this.data.getPostionFromIndex(this, index);
    }
    getKey() {
        return `${this._position.x}_${this._position.y}_${this._position.z}`;
    }
    getKeyXYZ(x, y, z) {
        return this.setXYZ(x, y, z).getKey();
    }
    getKeyLocation(location) {
        return this.setLocation(location).getKey();
    }
}



/***/ }),

/***/ "../../DSLIBS/voxelSpaces/dist/Types/VoxelSpaces.types.js":
/*!****************************************************************!*\
  !*** ../../DSLIBS/voxelSpaces/dist/Types/VoxelSpaces.types.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/voxelSpaces/dist/VoxelSpaces.js":
/*!****************************************************!*\
  !*** ../../DSLIBS/voxelSpaces/dist/VoxelSpaces.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelSpaces": () => (/* binding */ VoxelSpaces)
/* harmony export */ });
/* harmony import */ var _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/VoxelSpace.js */ "../../DSLIBS/voxelSpaces/dist/Classes/VoxelSpace.js");

const merge = (target, newObject) => {
    return Object.assign(target, newObject);
};
const VoxelSpaces = {
    zeroPointSpace: new _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace({
        getPosition(space) {
            return space._position;
        },
        getIndex() {
            return 0;
        },
        getPostionFromIndex(space, index) {
            return space._position;
        },
    }),
    getVoxelSpaces() {
        const regionSpace = merge(new _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace({
            getPosition(space) {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.simpleCubeHash(space);
            },
            getIndex(space) {
                return -Infinity;
            },
            getPostionFromIndex(space, index) {
                return space._position;
            },
        }), {
            chunkBounds: { x: 0, y: 0, z: 0 },
            columnBounds: { x: 0, y: 0, z: 0 },
            getChunkVolume() {
                return this.chunkBounds.x * this.chunkBounds.y * this.chunkBounds.z;
            },
            getColumnVolume() {
                return (this.columnBounds.x * this.columnBounds.y * this.columnBounds.z);
            },
        });
        const columnSpace = new _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace({
            getPosition(space) {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.simpleCubeHash(space);
            },
            getIndex(space) {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.getIndex(_Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.spatialHash(space, regionSpace, space._bounds), regionSpace.columnBounds);
            },
            getPostionFromIndex(space, index) {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.getPositionFromIndex(space._position, regionSpace.columnBounds, index).multiply(space._bounds);
            },
        });
        const chunkSpace = merge(new _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace({
            getPosition(space) {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.simpleCubeHash(space);
            },
            getIndex(space) {
                const ry = (space._position.y >> regionSpace._boundsPower2.y) <<
                    regionSpace._boundsPower2.y;
                const cy = (space._position.y >> space._boundsPower2.y) <<
                    space._boundsPower2.y;
                return (cy - ry) / space._bounds.y;
            },
            getPostionFromIndex(space, index) {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.getPositionFromIndex(space._position, regionSpace.chunkBounds, index).multiply(space._bounds);
            },
        }), {
            _regionPosition: { x: 0, y: 0, z: 0 },
            getRegionPositonx() {
                chunkSpace.getPosition();
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.spatialHash(chunkSpace, regionSpace, chunkSpace._bounds);
            },
            getRegionPositonxXYZ(x, y, z) {
                return chunkSpace.setXYZ(x, y, z).getRegionPositonx();
            },
            getRegionIndex() {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.getIndex(chunkSpace._hashedPosition, regionSpace.chunkBounds);
            },
            getRegionIndexXYZ(x, y, z) {
                chunkSpace.getRegionPositonxXYZ(x, y, z);
                return chunkSpace.getRegionIndex();
            },
        });
        const voxelSpace = new _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace({
            getPosition(space) {
                _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.spatialHash(space, chunkSpace);
                space._position.x = space._hashedPosition.x;
                space._position.y = space._hashedPosition.y;
                space._position.z = space._hashedPosition.z;
                return space._position;
            },
            getIndex(space) {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.getIndex(space._hashedPosition, space._bounds);
            },
            getPostionFromIndex(space, index) {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.getPositionFromIndex(space._position, chunkSpace._bounds, index);
            },
        });
        return {
            region: regionSpace,
            column: columnSpace,
            chunk: chunkSpace,
            voxel: voxelSpace,
            setDimensions(data) {
                regionSpace.setCubeBounds(data.regions);
                columnSpace.setCubeBounds(data.columns);
                chunkSpace.setCubeBounds(data.chunks);
                voxelSpace.setCubeBounds(data.chunks);
                regionSpace.chunkBounds.x =
                    regionSpace._bounds.x / chunkSpace._bounds.x;
                regionSpace.chunkBounds.y =
                    regionSpace._bounds.y / chunkSpace._bounds.y;
                regionSpace.chunkBounds.z =
                    regionSpace._bounds.z / chunkSpace._bounds.z;
                regionSpace.columnBounds.x =
                    regionSpace._bounds.x / columnSpace._bounds.x;
                regionSpace.columnBounds.y =
                    regionSpace._bounds.y / columnSpace._bounds.y;
                regionSpace.columnBounds.z =
                    regionSpace._bounds.z / columnSpace._bounds.z;
            },
        };
    },
    getZeroPointVoxelSpace(dimensions) {
        const space = new _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace({
            getPosition(space) {
                _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.spatialHash(space, VoxelSpaces.zeroPointSpace);
                space._position.x = space._hashedPosition.x;
                space._position.y = space._hashedPosition.y;
                space._position.z = space._hashedPosition.z;
                return space._position;
            },
            getIndex(space) {
                return _Classes_VoxelSpace_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpace.getIndex(space._hashedPosition, space._bounds);
            },
            getPostionFromIndex(space, index) {
                return space._position;
            },
        });
        space.setBounds(dimensions);
        return space;
    },
};


/***/ }),

/***/ "../../DSLIBS/voxelSpaces/dist/index.js":
/*!**********************************************!*\
  !*** ../../DSLIBS/voxelSpaces/dist/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelSpaces": () => (/* reexport safe */ _VoxelSpaces_js__WEBPACK_IMPORTED_MODULE_0__.VoxelSpaces)
/* harmony export */ });
/* harmony import */ var _VoxelSpaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VoxelSpaces.js */ "../../DSLIBS/voxelSpaces/dist/VoxelSpaces.js");
/* harmony import */ var _Types_VoxelSpaces_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types/VoxelSpaces.types.js */ "../../DSLIBS/voxelSpaces/dist/Types/VoxelSpaces.types.js");




/***/ })

}]);
//# sourceMappingURL=DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4.DVE.js.map