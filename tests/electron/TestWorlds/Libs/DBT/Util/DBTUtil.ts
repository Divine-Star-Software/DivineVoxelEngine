import { NumberTypes } from "../Types/DBTSchema.tyeps";
export const TagNodeTypes = {
  boolean: 0,
  number: 1,
  typedNumber: 2,
  typedNumberArray: 3,
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


 export const NumberTypeMap: Record<number, NumberTypes> = {
};
for (const key of Object.keys(NumberTypeRecord)) {
  //@ts-ignore
  NumberTypeMap[Number(NumberTypeRecord[key])] = key;
}
const TypedNumberSetFunctions: Record<
  NumberTypes,
  (data: DataView, index: number, value: number) => void
> = {
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

const TypedNumberGetFunctions: Record<
  NumberTypes,
  (data: DataView, index: number) => number
> = {
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
  getTypedSizeFromNumber(t : number) {
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
};
