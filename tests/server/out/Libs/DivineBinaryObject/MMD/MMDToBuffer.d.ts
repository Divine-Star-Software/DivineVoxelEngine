import { TypedNode } from "../Classes/TypedNode.js";
declare type MMDToken = [number, number] | [number, -1, string] | [number, -2, number[]] | [number, -3, string[]];
export declare const MMDToBuffer: {
    _tokens: MMDToken[];
    metaValues: Record<import("../Types/MMD.types.js").MMDMarks, number>;
    metaMapValues: Record<number, import("../Types/MMD.types.js").MMDMarks>;
    _tokenizeString(string: string): void;
    _traverseObj(data: TypedNode<any>, size: number): number;
    _traverseArray(data: TypedNode<any>, size: number): number;
    _tokenizePrimiives(node: TypedNode<any>, size: number): number;
    _tokenize(data: TypedNode<any>): number;
    toTokens(data: TypedNode<any>): [MMDToken[], number];
    toeknsToBuffer(tokens: MMDToken[], size: number, buffer: ArrayBuffer, byteOffSet?: number): void;
    _ToBuffer(tokens: MMDToken[], size: number, byteOffSet?: number, pb?: any): any;
    toBuffer(data: TypedNode<any>, byteOffSet?: number): ArrayBuffer;
    _addMarker(value: number): void;
    _addToken(dataType: number, value: number): void;
};
export {};
