import type { DBOARich } from "../Types/DBO.types";
import { TypedNode } from "../Classes/TypedNode.js";
declare type TypedNodeSchema = Record<string, TypedNode<any>>;
export declare const DBOP: {
    mmdTokens: any[];
    jsonStrings: string[];
    schemas: Record<string, {
        length: number;
        schema: TypedNodeSchema;
    }>;
    advancedElementSetFunctions: Record<DBOARich, (dv: DataView, byteCount: number, element: TypedNode<any>) => number>;
    advancedElementGetFunctions: Record<DBOARich, (dv: DataView, byteCount: number, element: TypedNode<any>, targetObject: any, name: string) => number>;
    getBuffer(length: number, SAB: boolean): ArrayBuffer;
    syncSABWtihBuffer(sab: SharedArrayBuffer, buffer: ArrayBuffer): void;
    sharedBufferToBuffer(sab: SharedArrayBuffer): ArrayBufferLike;
    registerSchema(id: string, schema: TypedNodeSchema): void;
    _calculateSchemaLength(schema: TypedNodeSchema): number;
    _calculateVariableSizeBuffer(schema: TypedNodeSchema): number;
    getSchema(id: string): {
        length: number;
        schema: TypedNodeSchema;
    };
    createObject<T>(schemaId: string, buffer: ArrayBuffer | SharedArrayBuffer | DataView): T;
    createBuffer(schemaId: string, updatedValues?: any): ArrayBuffer;
};
export {};
