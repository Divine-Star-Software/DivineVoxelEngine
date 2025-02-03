export function getBitValue(data: number, bitIndex: number, bitSize: number) {
  const mask = 2 ** bitSize - 1;
  return ((mask << bitIndex) & data) >>> bitIndex;
}
export function setBitValue(
  data: number,
  bitIndex: number,
  value: number,
  bitSize: number
) {
  const mask = 2 ** bitSize - 1;
  return (data & ~(mask << bitIndex)) | ((value & mask) << bitIndex);
}

export function getBitArrayIndex(data: Uint8Array, arrayIndex: number) {
  const arrayByteIndex = (arrayIndex / 8) >> 0;
  return getBitValue(data[arrayByteIndex], arrayIndex - arrayByteIndex * 8, 1);
}

export function setBitArrayIndex(
  data: Uint8Array,
  arrayIndex: number,
  value: number
) {
  const arrayByteIndex = (arrayIndex / 8) >> 0;
  data[arrayByteIndex] = setBitValue(
    data[arrayByteIndex],
    arrayIndex - arrayByteIndex * 8,
    value,
    1
  );
}
