declare type BinaryNums = 0 | 1;
declare type BinraryArray = BinaryNums[];
export declare class InfoByte {
    private byteValue;
    constructor(byteValue?: number);
    getNumberValue(): number;
    setNumberValue(newValue: number): void;
    getBit(index: number): BinaryNums;
    setBit(index: number, value: BinaryNums): void;
    toArray(): BinraryArray;
    toString(delimiter?: string): string;
}
export {};
