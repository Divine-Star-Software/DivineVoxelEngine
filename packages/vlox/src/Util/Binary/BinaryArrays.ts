import { getBitValue, setBitValue } from "./BinaryFunctions";

export function getBitArrayIndex(data: Uint8Array, arrayIndex: number) {
  const arrayByteIndex = Math.floor(arrayIndex / 8);
  const bitPosition = arrayIndex % 8;
  return getBitValue(data[arrayByteIndex], bitPosition, 1);
}

export function setBitArrayIndex(
  data: Uint8Array,
  arrayIndex: number,
  value: number
) {
  const arrayByteIndex = Math.floor(arrayIndex / 8);
  const bitPosition = arrayIndex % 8;
  data[arrayByteIndex] = setBitValue(
    data[arrayByteIndex],
    bitPosition,
    value & 1,
    1
  );
}

export function getNibbleArrayIndex(data: Uint8Array, arrayIndex: number) {
  return getBitValue(
    data[(arrayIndex / 2) >> 0],
    arrayIndex % 2 === 0 ? 4 : 0,
    4
  );
}

export function setNibbleArrayIndex(
  data: Uint8Array,
  arrayIndex: number,
  value: number
) {
  const arrayByteIndex = (arrayIndex / 2) >> 0;
  data[arrayByteIndex] = setBitValue(
    data[arrayByteIndex],
    arrayIndex % 2 === 0 ? 4 : 0,
    value,
    4
  );
}

export function getHalfNibbleArrayIndex(data: Uint8Array, arrayIndex: number) {
  return getBitValue(data[(arrayIndex / 4) >> 0], (arrayIndex % 4) * 2, 2);
}

export function setHalfNibbleArrayIndex(
  data: Uint8Array,
  arrayIndex: number,
  value: number
) {
  const arrayByteIndex = (arrayIndex / 4) >> 0;
  data[arrayByteIndex] = setBitValue(
    data[arrayByteIndex],
    (arrayIndex % 4) * 2,
    value,
    2
  );
}
