import {
  getBitArrayIndex,
  getHalfNibbleArrayIndex,
  getNibbleArrayIndex,
  setBitArrayIndex,
  setHalfNibbleArrayIndex,
  setNibbleArrayIndex,
} from "./BinaryArrays";

export type BinaryBufferTypes =
  /**If the buffer compressed to a single value the type will be a vlaue */
  "value" | "1-bit" | "2-bit" | "4-bit" | "8-bit" | "16-bit";
export interface BinaryBufferData {
  type?: BinaryBufferTypes;
  buffer: number | Uint8Array | Uint16Array;
}
const excludeStore: BinaryBufferTypes[] = ["16-bit", "8-bit", "value"];

export interface BinaryBuffer extends BinaryBufferData {}
export class BinaryBuffer {
  static BytePaletteMax = 256;
  static NibblePaletteMax = 16;
  static HalfNibblePaletteMax = 4;
  static BitPaletteMax = 2;

  static DetermineSubByteArray = (
    paletteSize: number
  ): BinaryBufferTypes | null => {
    if (paletteSize == BinaryBuffer.BitPaletteMax) return "1-bit";
    if (
      paletteSize > BinaryBuffer.BitPaletteMax &&
      paletteSize <= BinaryBuffer.HalfNibblePaletteMax
    )
      return "2-bit";
    if (
      paletteSize > BinaryBuffer.HalfNibblePaletteMax &&
      paletteSize <= BinaryBuffer.NibblePaletteMax
    )
      return "4-bit";
    if (
      paletteSize > BinaryBuffer.NibblePaletteMax &&
      paletteSize <= BinaryBuffer.BytePaletteMax
    )
      return "8-bit";
    return null;
  };
  static CreateBufferForType(type: BinaryBufferTypes, length: number) {
    if (type == "16-bit") return new Uint16Array(length);
    if (type == "8-bit") return new Uint8Array(length);
    if (type == "1-bit") return new Uint8Array(length);
    if (type == "2-bit") return new Uint8Array(length);
    if (type == "4-bit") return new Uint8Array(length);
    return new Uint8Array(length);
  }
  static GetConvertedBufferSize(
    source: Uint8Array | Uint16Array,
    type: BinaryBufferTypes
  ) {
    if (type == "16-bit" || type == "8-bit") return source.length;
    if (type == "1-bit") return source.length / 8;
    if (type == "4-bit") return source.length / 2;
    if (type == "2-bit") return source.length / 4;
    if (type == "value") return 1;
    return source.length;
  }
  static GetIndexLength(
    source: Uint8Array | Uint16Array,
    type: BinaryBufferTypes
  ) {
    if (type == "16-bit" || type == "8-bit") return source.length;
    if (type == "1-bit") return source.length * 8;
    if (type == "4-bit") return source.length * 2;
    if (type == "2-bit") return source.length * 4;
    if (type == "value") return 1;
    return source.length;
  }
  static ReadBufferAtIndex(
    source: Uint8Array | Uint16Array,
    type: BinaryBufferTypes,
    index: number
  ) {
    if (type == "16-bit" || type == "8-bit") return source[index];
    if (type == "1-bit") return getBitArrayIndex(source as any, index);
    if (type == "4-bit") return getNibbleArrayIndex(source as any, index);
    if (type == "2-bit") return getHalfNibbleArrayIndex(source as any, index);
    return source[index];
  }
  static SetBufferAtIndex(
    source: Uint8Array | Uint16Array,
    type: BinaryBufferTypes,
    index: number,
    value: number
  ) {
    if (type == "16-bit" || type == "8-bit") {
      return (source[index] = value);
    }
    if (type == "1-bit") return setBitArrayIndex(source as any, index, value);
    if (type == "4-bit")
      return setNibbleArrayIndex(source as any, index, value);
    if (type == "2-bit")
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
      (sourceType == "16-bit" && destinationType == "8-bit") ||
      (sourceType == "8-bit" && destinationType == "16-bit")
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
      ...data,
    };
  }
  constructor(data: BinaryBufferData) {
    this.buffer = data.buffer;
    if (data.type) {
      this.type = data.type;
    } else {
      if (typeof data.buffer === "number") this.type = "value";
      if (data.buffer instanceof Uint16Array) this.type = "16-bit";
      if (data.buffer instanceof Uint8Array) this.type = "8-bit";
    }
  }
  getValue(index: number) {
    if (typeof this.buffer == "number") return this.buffer;
    return BinaryBuffer.ReadBufferAtIndex(this.buffer, this.type!, index);
  }

  toJSON() {
    return {
      buffer: this.buffer,
      ...(excludeStore.includes(this.type!) ? {} : { type: this.type }),
    };
  }
}
