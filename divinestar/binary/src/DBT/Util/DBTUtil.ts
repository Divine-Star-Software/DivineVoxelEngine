import { NumberTypes } from "../Types/DBTSchema.types";
export const TagNodeTypes = {
  boolean: 0,
  number: 1,
  typedNumber: 2,
  typedNumberArray: 3,
  bitArray: 4,
};
const NumberTypeByteSize: Record<NumberTypes, number> = {
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

export const NumberTypeRecord: Record<NumberTypes, number> = {
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

export const NumberTypeMap: Record<number, NumberTypes> = {};
for (const key of Object.keys(NumberTypeRecord)) {
  //@ts-ignore
  NumberTypeMap[Number(NumberTypeRecord[key])] = key;
}
const TypedNumberSetFunctions: Record<
  NumberTypes,
  (data: DataView, index: number, value: number) => void
> = {
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

const TypedNumberGetFunctions: Record<
  NumberTypes,
  (data: DataView, index: number) => number
> = {
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

export const DBTUtil = {
  setTypedNumber(
    data: DataView,
    index: number,
    numberType: number,
    value: number
  ) {
    TypedNumberSetFunctions[NumberTypeMap[numberType]](data, index, value);
  },
  getTypedNumber(data: DataView, index: number, numberType: number) {
    return TypedNumberGetFunctions[NumberTypeMap[numberType]](data, index);
  },
  calculateBitsNeeded(min: number, max: number) {
    let range = max - min;
    return Math.ceil(Math.log2(range));
  },

  getTypedSize(type: NumberTypes) {
    return NumberTypeByteSize[type];
  },
  getTypedSizeFromNumber(t: number) {
    return NumberTypeByteSize[NumberTypeMap[t]];
  },
  getBitValue(data: number, index: number, bitSize: number) {
    index *= bitSize;
    const mask = 2 ** bitSize - 1;
    return ((mask << index) & data) >>> index;
  },
  setBitValue(data: number, index: number, value: number, bitSize: number) {
    index *= bitSize;
    const mask = 2 ** bitSize - 1;
    return (data & ~(mask << index)) | ((value & mask) << index);
  },

  getBitArrayIndex(data: DataView, byteIndex: number, arrayIndex: number) {
    const arrayByteIndex = (arrayIndex / 8) >> 0;
    const arrayBitIndex = arrayIndex - arrayByteIndex * 8;
    const arrayByte = data.getUint8(arrayByteIndex + byteIndex);
    return this.getBitValue(arrayByte, arrayBitIndex, 1);
  },

  setBitArrayIndex(
    data: DataView,
    byteIndex: number,
    arrayIndex: number,
    value: number
  ) {
    const arrayByteIndex = (arrayIndex / 8) >> 0;
    const arrayBitIndex = arrayIndex - arrayByteIndex * 8;
    const arrayByte = data.getUint8(arrayByteIndex + byteIndex);
    data.setUint8(
      arrayByteIndex + byteIndex,
      this.setBitValue(arrayByte, arrayBitIndex, value, 1)
    );
  },
};
