import { NumberTypes } from "Meta/DBTSchema.tyeps";
export declare const NumberTypeRecord: Record<NumberTypes, number>;
export declare const DBTUtil: {
    setTypedNumber(data: DataView, index: number, byteSize: number, value: number): void;
    getTypedNumber(data: DataView, index: number, byteSize: number): number;
    calculateBitsNeeded(min: number, max: number): number;
    getNumberTypesize(type: NumberTypes): number;
    getValue(data: number, index: number, bitSize: number): number;
    setValue(data: number, index: number, value: number, bitSize: number): number;
};
