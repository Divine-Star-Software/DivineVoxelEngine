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
    return {
      buffer: 0,
      length: 0,
      format: BinaryBufferFormat.Uint8,
      ...data,
    };
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
      length: this.length,
      type: this.format,
    };
  }
}
