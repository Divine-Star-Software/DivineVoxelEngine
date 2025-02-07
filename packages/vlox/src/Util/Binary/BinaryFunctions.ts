export function getBitValue(data: number, bitIndex: number, bitSize: number) {
    const mask = (1 << bitSize) - 1;
    return (data >>> bitIndex) & mask;
  }
  
  export function setBitValue(
    data: number,
    bitIndex: number,
    value: number,
    bitSize: number
  ) {
    const mask = (1 << bitSize) - 1;
    return (data & ~(mask << bitIndex)) | ((value & mask) << bitIndex);
  }

  export function forceMultipleOf2(n: number): number {
    return n % 2 === 0 ? n : n + 1;
  }