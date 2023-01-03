"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBTUtil = exports.NumberTypeMap = exports.NumberTypeRecord = exports.TagNodeTypes = void 0;
exports.TagNodeTypes = {
    boolean: 0,
    number: 1,
    typedNumber: 2,
    typedNumberArray: 3,
};
var NumberTypeByteSize = {
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
exports.NumberTypeRecord = {
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
exports.NumberTypeMap = {};
for (var _i = 0, _a = Object.keys(exports.NumberTypeRecord); _i < _a.length; _i++) {
    var key = _a[_i];
    //@ts-ignore
    exports.NumberTypeMap[Number(exports.NumberTypeRecord[key])] = key;
}
var TypedNumberSetFunctions = {
    "8ui": function (data, index, value) {
        data.setUint8(index, value);
    },
    "8i": function (data, index, value) {
        data.setInt8(index, value);
    },
    "16ui": function (data, index, value) {
        data.setUint16(index, value);
    },
    "16i": function (data, index, value) {
        data.setInt16(index, value);
    },
    "32ui": function (data, index, value) {
        data.setUint32(index, value);
    },
    "32i": function (data, index, value) {
        data.setInt32(index, value);
    },
    "32f": function (data, index, value) {
        data.setFloat32(index, value);
    },
    "64f": function (data, index, value) {
        data.setFloat64(index, value);
    },
    "64i": function (data, index, value) {
        data.setBigUint64(index, BigInt(value));
    },
    "64ui": function (data, index, value) {
        data.setBigUint64(index, BigInt(value));
    },
};
var TypedNumberGetFunctions = {
    "8ui": function (data, index) {
        return data.getUint8(index);
    },
    "8i": function (data, index) {
        return data.getInt8(index);
    },
    "16ui": function (data, index) {
        return data.getUint16(index);
    },
    "16i": function (data, index) {
        return data.getInt16(index);
    },
    "32ui": function (data, index) {
        return data.getUint32(index);
    },
    "32i": function (data, index) {
        return data.getInt32(index);
    },
    "32f": function (data, index) {
        return data.getFloat32(index);
    },
    "64f": function (data, index) {
        return data.getFloat64(index);
    },
    "64i": function (data, index) {
        return Number(data.getBigUint64(index));
    },
    "64ui": function (data, index) {
        return Number(data.getBigUint64(index));
    },
};
exports.DBTUtil = {
    setTypedNumber: function (data, index, numberType, value) {
        TypedNumberSetFunctions[exports.NumberTypeMap[numberType]](data, index, value);
    },
    getTypedNumber: function (data, index, numberType) {
        return TypedNumberGetFunctions[exports.NumberTypeMap[numberType]](data, index);
    },
    calculateBitsNeeded: function (min, max) {
        var range = max - min;
        return Math.ceil(Math.log2(range));
    },
    getTypedSize: function (type) {
        return NumberTypeByteSize[type];
    },
    getTypedSizeFromNumber: function (t) {
        return NumberTypeByteSize[exports.NumberTypeMap[t]];
    },
    getBitValue: function (data, index, bitSize) {
        index *= bitSize;
        var mask = Math.pow(2, bitSize) - 1;
        return ((mask << index) & data) >>> index;
    },
    setBitValue: function (data, index, value, bitSize) {
        index *= bitSize;
        var mask = Math.pow(2, bitSize) - 1;
        return (data & ~(mask << index)) | ((value & mask) << index);
    },
};
