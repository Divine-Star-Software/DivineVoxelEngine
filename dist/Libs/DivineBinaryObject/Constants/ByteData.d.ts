import { DBOPrimitive, TypedArrayClasses, TypedArrays } from "../Types/DBO.types";
export declare const ByteCounts: Record<DBOPrimitive, number>;
export declare const ByteDataGet: Record<DBOPrimitive, (dv: DataView, index: number) => number>;
export declare const ByteDataSet: Record<DBOPrimitive, (dv: DataView, index: number, value: number) => void>;
export declare const TypedArrayCrete: Record<DBOPrimitive, (length: number) => TypedArrays>;
export declare const TypedArrayMap: Record<DBOPrimitive, TypedArrayClasses>;
export declare const ByteParser: {
    view: DataView;
    count: number;
    value: number;
    setValue(type: DBOPrimitive, value: number): any;
    addBytes(data: number[]): void;
};
