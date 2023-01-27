import { TypedNode } from "../Classes/TypedNode.js";
export declare const MMDP: {
    toBuffer(data: TypedNode<any>): ArrayBuffer;
    toObject<T>(buffer: ArrayBuffer, byteOffSet?: number): T;
    toMMD<T_1>(buffer: ArrayBuffer, byteOffSet?: number, byteOffSetEnd?: number): TypedNode<T_1>;
    toToekns(data: TypedNode<any>): [([number, number] | [number, -1, string] | [number, -2, number[]] | [number, -3, string[]])[], number];
    toeknsToBuffer(data: any, size: number, buffer: ArrayBuffer, byteOffSet?: number): void;
};
