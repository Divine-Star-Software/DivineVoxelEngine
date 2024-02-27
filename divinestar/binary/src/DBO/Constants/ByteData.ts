import {
  DBOPrimitive,
  TypedArrayClasses,
  TypedArrays,
} from "../Types/DBO.types";

export const ByteCounts: Record<DBOPrimitive, number> = {
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

export const ByteDataGet: Record<
  DBOPrimitive,
  (dv: DataView, index: number) => number
> = {
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

export const ByteDataSet: Record<
  DBOPrimitive,
  (dv: DataView, index: number, value: number) => void
> = {
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

export const TypedArrayCrete: Record<
  DBOPrimitive,
  (length: number) => TypedArrays
> = {
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

export const TypedArrayMap: Record<DBOPrimitive, TypedArrayClasses> = {
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

export const TypedArrayRecord = new Map<TypedArrayClasses, DBOPrimitive>([
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

export const ByteParser = {
  view: new DataView(new ArrayBuffer(8)),
  count: 0,
  value: 0,
  setValue(type: DBOPrimitive, value: number) {
    this.value = value;
    ByteDataSet[type](this.view, 0, value);
    this.count = ByteCounts[type];
    return this;
  },
  addBytes(data: number[]) {

    for (let i = 0; i < this.count; i++) {
      data.push(this.view.getUint8(i));
    }
  },
};
