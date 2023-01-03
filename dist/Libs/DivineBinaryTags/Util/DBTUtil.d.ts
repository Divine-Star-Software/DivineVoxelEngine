import { NumberTypes } from "../Types/DBTSchema.tyeps";
export declare const TagNodeTypes: {
    boolean: number;
    number: number;
    typedNumber: number;
    typedNumberArray: number;
};
export declare const NumberTypeRecord: Record<NumberTypes, number>;
export declare const NumberTypeMap: Record<number, NumberTypes>;
export declare const DBTUtil: {
    setTypedNumber(data: DataView, index: number, numberType: number, value: number): void;
    getTypedNumber(data: DataView, index: number, numberType: number): number;
    calculateBitsNeeded(min: number, max: number): number;
    getTypedSize(type: NumberTypes): number;
    getTypedSizeFromNumber(t: number): number;
    getBitValue(data: number, index: number, bitSize: number): number;
    setBitValue(data: number, index: number, value: number, bitSize: number): number;
};
