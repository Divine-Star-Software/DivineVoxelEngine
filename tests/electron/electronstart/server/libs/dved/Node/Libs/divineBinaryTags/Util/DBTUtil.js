"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBTUtil = exports.NumberTypeMap = exports.NumberTypeRecord = exports.TagNodeTypes = void 0;
exports.TagNodeTypes = {
    boolean: 0,
    number: 1,
    typedNumber: 2,
    typedNumberArray: 3,
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
for (const key of Object.keys(exports.NumberTypeRecord)) {
    //@ts-ignore
    exports.NumberTypeMap[Number(exports.NumberTypeRecord[key])] = key;
}
const TypedNumberSetFunctions = {
    "8ui": (data, index, value) => {
        data.setUint8(index, value);
    },
    "8i": (data, index, value) => {
        data.setInt8(index, value);
    },
    "16ui": (data, index, value) => {
        data.setUint16(index, value);
    },
    "16i": (data, index, value) => {
        data.setInt16(index, value);
    },
    "32ui": (data, index, value) => {
        data.setUint32(index, value);
    },
    "32i": (data, index, value) => {
        data.setInt32(index, value);
    },
    "32f": (data, index, value) => {
        data.setFloat32(index, value);
    },
    "64f": (data, index, value) => {
        data.setFloat64(index, value);
    },
    "64i": (data, index, value) => {
        data.setBigUint64(index, BigInt(value));
    },
    "64ui": (data, index, value) => {
        data.setBigUint64(index, BigInt(value));
    },
};
const TypedNumberGetFunctions = {
    "8ui": (data, index) => {
        return data.getUint8(index);
    },
    "8i": (data, index) => {
        return data.getInt8(index);
    },
    "16ui": (data, index) => {
        return data.getUint16(index);
    },
    "16i": (data, index) => {
        return data.getInt16(index);
    },
    "32ui": (data, index) => {
        return data.getUint32(index);
    },
    "32i": (data, index) => {
        return data.getInt32(index);
    },
    "32f": (data, index) => {
        return data.getFloat32(index);
    },
    "64f": (data, index) => {
        return data.getFloat64(index);
    },
    "64i": (data, index) => {
        return Number(data.getBigUint64(index));
    },
    "64ui": (data, index) => {
        return Number(data.getBigUint64(index));
    },
};
exports.DBTUtil = {
    setTypedNumber(data, index, numberType, value) {
        TypedNumberSetFunctions[exports.NumberTypeMap[numberType]](data, index, value);
    },
    getTypedNumber(data, index, numberType) {
        return TypedNumberGetFunctions[exports.NumberTypeMap[numberType]](data, index);
    },
    calculateBitsNeeded(min, max) {
        let range = max - min;
        return Math.ceil(Math.log2(range));
    },
    getTypedSize(type) {
        return NumberTypeByteSize[type];
    },
    getTypedSizeFromNumber(t) {
        return NumberTypeByteSize[exports.NumberTypeMap[t]];
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
};
