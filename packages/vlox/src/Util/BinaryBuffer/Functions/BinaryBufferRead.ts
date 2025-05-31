import { BinaryBufferFormat } from "../BinaryBuffer.types";
import {
  getBitArrayIndex,
  getHalfNibbleArrayIndex,
  getNibbleArrayIndex,
  setBitArrayIndex,
  setHalfNibbleArrayIndex,
  setNibbleArrayIndex,
} from "../../Binary/BinaryArrays";
export function ReadBufferAtIndex(
  source: Uint8Array | Uint16Array,
  format: BinaryBufferFormat,
  index: number
) {
  if (format == BinaryBufferFormat.Uint16 || format == BinaryBufferFormat.Uint8)
    return source[index];
  if (format == BinaryBufferFormat.BitArray)
    return getBitArrayIndex(source as any, index);
  if (format == BinaryBufferFormat.NibbleArray)
    return getNibbleArrayIndex(source as any, index);
  if (format == BinaryBufferFormat.HalfNibbleArray)
    return getHalfNibbleArrayIndex(source as any, index);
  return source[index];
}
export function SetBufferAtIndex(
  source: Uint8Array | Uint16Array,
  format: BinaryBufferFormat,
  index: number,
  value: number
) {
  if (
    format == BinaryBufferFormat.Uint16 ||
    format == BinaryBufferFormat.Uint8
  ) {
    return (source[index] = value);
  }
  if (format == BinaryBufferFormat.BitArray)
    return setBitArrayIndex(source as any, index, value);
  if (format == BinaryBufferFormat.NibbleArray)
    return setNibbleArrayIndex(source as any, index, value);
  if (format == BinaryBufferFormat.HalfNibbleArray)
    return setHalfNibbleArrayIndex(source as any, index, value);
  return source[index];
}
