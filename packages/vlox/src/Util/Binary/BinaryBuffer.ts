import {
  getBitArrayIndex,
  getHalfNibbleArrayIndex,
  getNibbleArrayIndex,
  setBitArrayIndex,
  setHalfNibbleArrayIndex,
  setNibbleArrayIndex,
} from "./BinaryArrays";

export enum BinaryBufferTypes {
  Value = 0,
  BitArray = 1,
  HalfNibbleArray = 2,
  NibbleArray = 4,
  ByteArray = 8,
  ShortArray = 16,
}
export interface BinaryBufferData {
  type: BinaryBufferTypes;
  buffer: number | ArrayBufferLike;
}
export interface BinaryBuffer extends BinaryBufferData {}
export class BinaryBuffer {
  static ByteArrayMax = 256;
  static NibbleArrayMax = 16;
  static HalfNibbleArrayMax = 4;
  static BitArrayMax = 2;

  static GetBuffer(buffers: number | BinaryBufferData | undefined) {
    return !buffers
      ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
      : typeof buffers == "number"
        ? new BinaryBuffer({
            buffer: buffers,
            type: BinaryBufferTypes.Value,
          })
        : new BinaryBuffer(buffers);
  }

  static DetermineSubByteArray = (
    paletteSize: number
  ): BinaryBufferTypes | null => {
    if (paletteSize == BinaryBuffer.BitArrayMax)
      return BinaryBufferTypes.BitArray;
    if (
      paletteSize > BinaryBuffer.BitArrayMax &&
      paletteSize <= BinaryBuffer.HalfNibbleArrayMax
    )
      return BinaryBufferTypes.HalfNibbleArray;
    if (
      paletteSize > BinaryBuffer.HalfNibbleArrayMax &&
      paletteSize <= BinaryBuffer.NibbleArrayMax
    )
      return BinaryBufferTypes.NibbleArray;
    if (
      paletteSize > BinaryBuffer.NibbleArrayMax &&
      paletteSize <= BinaryBuffer.ByteArrayMax
    )
      return BinaryBufferTypes.ByteArray;
    return null;
  };
  static CreateBufferForType(type: BinaryBufferTypes, length: number) {
    if (type == BinaryBufferTypes.ShortArray) return new Uint16Array(length);
    return new Uint8Array(length);
  }
  static GetConvertedBufferSize(
    source: Uint8Array | Uint16Array,
    type: BinaryBufferTypes
  ) {
    if (
      type == BinaryBufferTypes.ShortArray ||
      type == BinaryBufferTypes.ByteArray
    )
      return source.length;
    if (type == BinaryBufferTypes.BitArray) return source.length / 8;
    if (type == BinaryBufferTypes.HalfNibbleArray) return source.length / 4;
    if (type == BinaryBufferTypes.NibbleArray) return source.length / 2;
    if (type == BinaryBufferTypes.Value) return 1;
    return source.length;
  }
  static GetIndexLength(
    source: Uint8Array | Uint16Array,
    type: BinaryBufferTypes
  ) {
    if (
      type == BinaryBufferTypes.ShortArray ||
      type == BinaryBufferTypes.ByteArray
    )
      return source.length;
    if (type == BinaryBufferTypes.BitArray) return source.length * 8;
    if (type == BinaryBufferTypes.HalfNibbleArray) return source.length * 4;
    if (type == BinaryBufferTypes.NibbleArray) return source.length * 2;
    if (type == BinaryBufferTypes.Value) return 1;
    return source.length;
  }
  static ReadBufferAtIndex(
    source: Uint8Array | Uint16Array,
    type: BinaryBufferTypes,
    index: number
  ) {
    if (
      type == BinaryBufferTypes.ShortArray ||
      type == BinaryBufferTypes.ByteArray
    )
      return source[index];
    if (type == BinaryBufferTypes.BitArray)
      return getBitArrayIndex(source as any, index);
    if (type == BinaryBufferTypes.NibbleArray)
      return getNibbleArrayIndex(source as any, index);
    if (type == BinaryBufferTypes.HalfNibbleArray)
      return getHalfNibbleArrayIndex(source as any, index);
    return source[index];
  }
  static SetBufferAtIndex(
    source: Uint8Array | Uint16Array,
    type: BinaryBufferTypes,
    index: number,
    value: number
  ) {
    if (
      type == BinaryBufferTypes.ShortArray ||
      type == BinaryBufferTypes.ByteArray
    ) {
      return (source[index] = value);
    }
    if (type == BinaryBufferTypes.BitArray)
      return setBitArrayIndex(source as any, index, value);
    if (type == BinaryBufferTypes.NibbleArray)
      return setNibbleArrayIndex(source as any, index, value);
    if (type == BinaryBufferTypes.HalfNibbleArray)
      return setHalfNibbleArrayIndex(source as any, index, value);
    return source[index];
  }

  static Convert(
    source: Uint8Array | Uint16Array,
    sourceType: BinaryBufferTypes,
    destinationType: BinaryBufferTypes
  ) {
    if (
      sourceType == destinationType ||
      (sourceType == BinaryBufferTypes.ShortArray &&
        destinationType == BinaryBufferTypes.ByteArray) ||
      (sourceType == BinaryBufferTypes.ByteArray &&
        destinationType == BinaryBufferTypes.ShortArray)
    ) {
      const destination = this.CreateBufferForType(
        destinationType,
        this.GetConvertedBufferSize(source, destinationType)
      );
      destination.set(source);
      return destination;
    }
    const length = this.GetIndexLength(source, sourceType);
    const destination = this.CreateBufferForType(
      destinationType,
      this.GetConvertedBufferSize(source, destinationType)
    );
    for (let i = 0; i < length; i++) {
      this.SetBufferAtIndex(
        destination,
        destinationType,
        i,
        this.ReadBufferAtIndex(source, sourceType, i)
      );
    }
    return destination;
  }

  static Create(data: Partial<BinaryBufferData>): BinaryBufferData {
    return {
      buffer: 0,
      type: BinaryBufferTypes.Value,
      ...data,
    };
  }
  bufferView: Uint8Array | Uint16Array;
  constructor(data: BinaryBufferData) {
    this.buffer = data.buffer;
    this.type = data.type;
    if (typeof this.buffer !== "number") {
      if (this.type == BinaryBufferTypes.ShortArray) {
        this.bufferView = new Uint16Array(this.buffer);
      } else {
        this.bufferView = new Uint8Array(this.buffer);
      }
    }
  }
  getValue(index: number) {
    if (typeof this.buffer == "number") return this.buffer;
    return BinaryBuffer.ReadBufferAtIndex(this.bufferView, this.type!, index);
  }

  toJSON() {
    return {
      buffer: this.buffer,
      type: this.type,
    };
  }
}
