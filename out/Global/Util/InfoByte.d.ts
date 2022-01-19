declare type BinaryNums = 0 | 1;
declare type BinaryArray = BinaryNums[];
export declare class InfoByte {
    byteValue: number;
    maxBit: number;
    minBit: number;
    maxDec: number;
    minDec: number;
    constructor(byteValue?: number);
    getNumberValue(): number;
    setNumberValue(newValue: number): void;
    getBit(index: number): BinaryNums;
    getBitsArray(bitIndex: number, byteLength: number): BinaryArray;
    getHalfByteDec(bitIndex: number): number;
    setHalfByteBits(index: number, value: number): void;
    setBit(index: number, value: BinaryNums): void;
    toArray(): BinaryArray;
    toString(delimiter?: string): string;
}
export {};
