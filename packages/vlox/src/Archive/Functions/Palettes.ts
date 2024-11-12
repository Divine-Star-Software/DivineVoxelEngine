import { BitArray } from "@amodx/binary/Arrays/BitArray";
import { HalfNibbleArray } from "@amodx/binary/Arrays/HalfNibbleArray";
import { NibbleArray } from "@amodx/binary/Arrays/NibbleArray";

export const convertToPaletteBuffer = (
  paletteSize: number,
  data: Uint16Array,
  sharedMemory = false
): Uint16Array | Uint8Array => {
  let buffer: Uint8Array | Uint16Array = data;

  if (paletteSize > 15 && paletteSize <= 255) {
    buffer = Uint8Array.from(data);
  } else if (paletteSize > 4 && paletteSize <= 15) {
    buffer = new Uint8Array(data.length / 2);
    const nibbleArray = new NibbleArray(buffer);
    for (let i = 0; i < data.length; i++) {
      nibbleArray[i] = data[i];
    }
  } else if (paletteSize > 2 && paletteSize <= 4) {
    buffer = new Uint8Array(data.length / 4);
    const halfNibbleArray = new HalfNibbleArray(buffer);
    for (let i = 0; i < data.length; i++) {
      halfNibbleArray[i] = data[i];
    }
  } else if (paletteSize == 2) {
    buffer = new Uint8Array(data.length / 8);
    const bitArray = new BitArray(buffer);
    for (let i = 0; i < data.length; i++) {
      bitArray[i] = data[i];
    }
  }

  if (sharedMemory && !(buffer.buffer instanceof SharedArrayBuffer)) {
    const sharedBuffer = new SharedArrayBuffer(buffer.byteLength);
    const sharedView = new Uint8Array(sharedBuffer);
    sharedView.set(buffer);
    return sharedView;
  }

  return buffer;
};

export const getPaletteArray = (size: number, buffer: ArrayBufferLike) => {
  if (size == 2) return new BitArray(buffer);
  if (size > 2 && size <= 4) return new HalfNibbleArray(buffer);
  if (size > 4 && size <= 15) return new NibbleArray(buffer);
  return buffer;
};
