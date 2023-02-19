import { TypedNode } from "../Classes/TypedNode.js";
export declare const MMDP: {
    toBuffer(data: TypedNode<any>): ArrayBuffer;
    toObject<T>(buffer: ArrayBuffer, byteOffSet?: number): T;
    toMMD<T_1>(buffer: ArrayBuffer, byteOffSet?: number, byteOffSetEnd?: number): TypedNode<T_1>;
};
