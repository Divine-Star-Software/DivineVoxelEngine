import { BinaryBufferData, BinaryBufferFormat } from "../BinaryBuffer.types";

export default function BinaryBufferToTypedArray(buffer: BinaryBufferData) {
  if (buffer.format == BinaryBufferFormat.Uint16) {
    if (typeof buffer.buffer == "number") {
      const array = new Uint16Array(buffer.byteLength);
      array.fill(buffer.buffer);
      return array;
    }
    return new Uint16Array(buffer.buffer);
  }

  if (buffer.format == BinaryBufferFormat.Uint8) {
    if (typeof buffer.buffer == "number") {
      const array = new Uint8Array(buffer.byteLength);
      array.fill(buffer.buffer);
      return array;
    }
    return new Uint8Array(buffer.buffer);
  }

  if (buffer.format == BinaryBufferFormat.NibbleArray) {
    if (typeof buffer.buffer == "number") {
      const array = new Uint8Array(buffer.byteLength / 2);
      array.fill(buffer.buffer);
      return array;
    }
    return new Uint8Array(buffer.buffer);
  }

  if (buffer.format == BinaryBufferFormat.HalfNibbleArray) {
    if (typeof buffer.buffer == "number") {
      const array = new Uint8Array(buffer.byteLength / 4);
      array.fill(buffer.buffer);
      return array;
    }
    return new Uint8Array(buffer.buffer);
  }

  if (buffer.format == BinaryBufferFormat.BitArray) {
    if (typeof buffer.buffer == "number") {
      const array = new Uint8Array(buffer.byteLength / 8);
      array.fill(buffer.buffer);
      return array;
    }
    return new Uint8Array(buffer.buffer);
  }
}
