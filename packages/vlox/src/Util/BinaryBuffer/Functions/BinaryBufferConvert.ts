import {
  BinaryBufferConstants,
  BinaryBufferFormat,
} from "../BinaryBuffer.types";
import { ReadBufferAtIndex, SetBufferAtIndex } from "./BinaryBufferRead";

export function DetermineSubByteArrayForBinaryBuffer(
  paletteSize: number
): BinaryBufferFormat | null {
  if (paletteSize == BinaryBufferConstants.BitArrayMax)
    return BinaryBufferFormat.BitArray;
  if (
    paletteSize > BinaryBufferConstants.BitArrayMax &&
    paletteSize <= BinaryBufferConstants.HalfNibbleArrayMax
  )
    return BinaryBufferFormat.HalfNibbleArray;
  if (
    paletteSize > BinaryBufferConstants.HalfNibbleArrayMax &&
    paletteSize <= BinaryBufferConstants.NibbleArrayMax
  )
    return BinaryBufferFormat.NibbleArray;
  if (
    paletteSize > BinaryBufferConstants.NibbleArrayMax &&
    paletteSize <= BinaryBufferConstants.ByteArrayMax
  )
    return BinaryBufferFormat.Uint8;
  return null;
}
function CreateBufferForType(type: BinaryBufferFormat, length: number) {
  if (type == BinaryBufferFormat.Uint16) return new Uint16Array(length);
  return new Uint8Array(length);
}
export function GetConvertedBinaryBufferSize(
  source: Uint8Array | Uint16Array,
  format: BinaryBufferFormat
) {
  if (format == BinaryBufferFormat.Uint16 || format == BinaryBufferFormat.Uint8)
    return source.length;
  if (format == BinaryBufferFormat.BitArray) return source.length / 8;
  if (format == BinaryBufferFormat.HalfNibbleArray) return source.length / 4;
  if (format == BinaryBufferFormat.NibbleArray) return source.length / 2;
  return source.length;
}
export function GetBinaryBufferIndexLength(
  source: Uint8Array | Uint16Array,
  format: BinaryBufferFormat
) {
  if (format == BinaryBufferFormat.Uint16 || format == BinaryBufferFormat.Uint8)
    return source.length;
  if (format == BinaryBufferFormat.BitArray) return source.length * 8;
  if (format == BinaryBufferFormat.HalfNibbleArray) return source.length * 4;
  if (format == BinaryBufferFormat.NibbleArray) return source.length * 2;
  return source.length;
}

export function ConvertBinaryBuffer(
  source: Uint8Array | Uint16Array,
  sourceType: BinaryBufferFormat,
  destinationType: BinaryBufferFormat
) {
  if (
    sourceType == destinationType ||
    (sourceType == BinaryBufferFormat.Uint16 &&
      destinationType == BinaryBufferFormat.Uint8) ||
    (sourceType == BinaryBufferFormat.Uint8 &&
      destinationType == BinaryBufferFormat.Uint16)
  ) {
    const destination = CreateBufferForType(
      destinationType,
      GetConvertedBinaryBufferSize(source, destinationType)
    );
    destination.set(source);
    return destination;
  }
  const length = GetBinaryBufferIndexLength(source, sourceType);
  const destination = CreateBufferForType(
    destinationType,
    GetConvertedBinaryBufferSize(source, destinationType)
  );
  for (let i = 0; i < length; i++) {
    SetBufferAtIndex(
      destination,
      destinationType,
      i,
      ReadBufferAtIndex(source, sourceType, i)
    );
  }
  return destination;
}
