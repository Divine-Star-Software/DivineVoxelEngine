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
  length: number;
  buffer: number | ArrayBuffer | SharedArrayBuffer;
}

export interface JSONBinaryBufferData {
  type: BinaryBufferTypes;
  buffer: string;
  length: number;
  compressed?: boolean;
}

export interface BinaryBuffer extends BinaryBufferData {}
export class BinaryBuffer {
  static ByteArrayMax = 256;
  static NibbleArrayMax = 16;
  static HalfNibbleArrayMax = 4;
  static BitArrayMax = 2;

  static async ToJSON(
    data: BinaryBufferData,
    compressed?: boolean
  ): Promise<JSONBinaryBufferData> {
    if (typeof data.buffer === "number") {
      return {
        type: data.type,
        length: data.length,
        buffer: data.buffer.toString(),
      };
    }

    const input = new Uint8Array(data.buffer);

    let bufferToEncode = input;

    if (compressed) {
      const cs = new CompressionStream("gzip");
      const writer = cs.writable.getWriter();
      writer.write(input);
      writer.close();
      const compressedBuffer = await new Response(cs.readable).arrayBuffer();
      bufferToEncode = new Uint8Array(compressedBuffer);
    }

    // Convert to base64
    const binary = String.fromCharCode(...bufferToEncode);
    const base64 = btoa(binary);
    bufferToEncode;

    return {
      type: data.type,
      length: data.length,
      buffer: base64,
      compressed,
    };
  }

  static async FromJSON(data: JSONBinaryBufferData): Promise<BinaryBufferData> {
    let binary = atob(data.buffer);
    let raw = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      raw[i] = binary.charCodeAt(i);
    }

    if (data.compressed) {
      const ds = new DecompressionStream("gzip");
      const writer = ds.writable.getWriter();
      writer.write(raw);
      writer.close();
      const decompressed = await new Response(ds.readable).arrayBuffer();
      raw = new Uint8Array(decompressed);
    }

    return {
      type: data.type,
      length: data.length,
      buffer: raw.buffer,
    };
  }

  static ToTypedArray(buffer: BinaryBufferData) {
    if (buffer.type == BinaryBufferTypes.ShortArray) {
      if (typeof buffer.buffer == "number") {
        const array = new Uint16Array(buffer.length);
        array.fill(buffer.buffer);
        return array;
      }
      return new Uint16Array(buffer.buffer);
    }
    
    if (buffer.type == BinaryBufferTypes.ByteArray) {
      if (typeof buffer.buffer == "number") {
        const array = new Uint8Array(buffer.length);
        array.fill(buffer.buffer);
        return array;
      }
      return new Uint8Array(buffer.buffer);
    }

    if (buffer.type == BinaryBufferTypes.NibbleArray) {
      if (typeof buffer.buffer == "number") {
        const array = new Uint8Array(buffer.length / 2);
        array.fill(buffer.buffer);
        return array;
      }
      return new Uint8Array(buffer.buffer);
    }

    if (buffer.type == BinaryBufferTypes.HalfNibbleArray) {
      if (typeof buffer.buffer == "number") {
        const array = new Uint8Array(buffer.length / 4);
        array.fill(buffer.buffer);
        return array;
      }
      return new Uint8Array(buffer.buffer);
    }


    if (buffer.type == BinaryBufferTypes.BitArray) {
      if (typeof buffer.buffer == "number") {
        const array = new Uint8Array(buffer.length / 8);
        array.fill(buffer.buffer);
        return array;
      }
      return new Uint8Array(buffer.buffer);
    }
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
      length: 0,
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
      length: this.length,
      type: this.type,
    };
  }
}
