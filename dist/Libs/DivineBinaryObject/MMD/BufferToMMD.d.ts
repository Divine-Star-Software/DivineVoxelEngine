import { TypedNode } from "../Classes/TypedNode.js";
export declare const BToMMD: {
    _mode: "object" | "json" | "mmd";
    _cobj: any;
    _parents: any[];
    _objArray: never[];
    _name: string;
    _length: number;
    _objCount: number;
    _inOject: boolean;
    _newMMDNode(type: MMDMarks, value: any, listType?: string): TypedNode<any>;
    _assign(value: any): void;
    markFunctions: Record<MMDMarks, (dv: DataView, index: number) => number>;
    toObject<T>(buffer: ArrayBuffer, byteOffSet?: number): T;
    toJSON<T_1>(buffer: ArrayBuffer, byteOffSet?: number): T_1;
    toMMD<T_2>(buffer: ArrayBuffer, byteOffSet?: number, byteOffSetEnd?: number): T_2;
};
