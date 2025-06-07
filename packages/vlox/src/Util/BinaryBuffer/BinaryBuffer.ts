import {
  BinaryBufferConstants,
  BinaryBufferData,
  BinaryBufferFormat,
} from "./BinaryBuffer.types";
import {
  ConvertBinaryBuffer,
  DetermineSubByteArrayForBinaryBuffer,
  GetBinaryBufferIndexLength,
  GetConvertedBinaryBufferSize,
} from "./Functions/BinaryBufferConvert";
import {
  BinaryBufferFromJSON,
  BinaryBufferToJSON,
} from "./Functions/BinaryBufferJSON";
import {
  ReadBufferAtIndex,
  SetBufferAtIndex,
} from "./Functions/BinaryBufferRead";
import BinaryBufferToTypedArray from "./Functions/BinaryBufferToTypedArray";

export interface BinaryBuffer extends BinaryBufferData {}
export class BinaryBuffer {
  static Constants = BinaryBufferConstants;

  static Compare(buffer1: BinaryBufferData, buffer2: BinaryBufferData) {
    if (buffer1.format != buffer2.format) return false;
    if (buffer1.byteLength != buffer2.byteLength) return false;
    if (typeof buffer1.buffer == "number" && buffer1.buffer == buffer2.buffer)
      return true;
    if (typeof buffer1.buffer == "number" || typeof buffer2.buffer == "number")
      return false;
    if (buffer1.buffer.byteLength != buffer2.buffer.byteLength) return false;
    const view1 = new Uint8Array(buffer1.buffer);
    const view2 = new Uint8Array(buffer2.buffer);
    let i = view1.length;
    while (i--) {
      if (view1[i] != view2[i]) return false;
    }
    return true;
  }
  static ToJSON = BinaryBufferToJSON;
  static FromJSON = BinaryBufferFromJSON;
  static ToTypedArray = BinaryBufferToTypedArray;
  static ReadBufferAtIndex = ReadBufferAtIndex;
  static SetBufferAtIndex = SetBufferAtIndex;

  static DetermineSubByteArray = DetermineSubByteArrayForBinaryBuffer;

  static GetConvertedBufferSize = GetConvertedBinaryBufferSize;
  static GetIndexLength = GetBinaryBufferIndexLength;
  static Convert = ConvertBinaryBuffer;

  static Create(data: Partial<BinaryBufferData>): BinaryBufferData {
    const bufferData: BinaryBufferData = {
      buffer: 0,
      byteLength: 0,
      format: BinaryBufferFormat.Uint8,
      ...data,
    };
    if (!bufferData.byteLength && typeof bufferData.buffer !== "number") {
      bufferData.byteLength = bufferData.buffer.byteLength;
    }
    return bufferData;
  }
  bufferView: Uint8Array | Uint16Array;
  constructor(data: BinaryBufferData) {
    this.buffer = data.buffer;
    this.format = data.format;
    if (typeof this.buffer !== "number") {
      if (this.format == BinaryBufferFormat.Uint16) {
        this.bufferView = new Uint16Array(this.buffer);
      } else {
        this.bufferView = new Uint8Array(this.buffer);
      }
    } else {
      this.isValue = true;
    }
  }

  isValue = false;

  getValue(index: number) {
    if (this.isValue) return this.buffer as number;
    return ReadBufferAtIndex(this.bufferView, this.format!, index);
  }

  toJSON() {
    return {
      buffer: this.buffer,
      length: this.byteLength,
      type: this.format,
    };
  }
}
