export declare class BitArray {
    private byteArray;
    constructor(byteArray: number[]);
    getSize(): number;
    getDec(index: number): number;
    getBit(index: number): number;
    setBit(index: number, value: 0 | 1): void;
    toString(delimiter: string): string;
}
