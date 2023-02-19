import { TypedNode } from "../Classes/TypedNode.js";
import { DBOPrimitive } from "../Types/DBO.types";
export declare const MMDToBuffer: {
    _proto: number[];
    _tokenizeString(string: string): void;
    _traverseObj(data: TypedNode<any>): void;
    _traverseArray(data: TypedNode<any>): void;
    _tokenizePrimiives(node: TypedNode<any>): void;
    _tokenize(node: TypedNode<any>): void;
    toBuffer(data: TypedNode<any>, byteOffSet?: number): ArrayBuffer;
    _addMarker(marker: MMDMarks): void;
    _addToken(type: DBOPrimitive, value: number): void;
};
