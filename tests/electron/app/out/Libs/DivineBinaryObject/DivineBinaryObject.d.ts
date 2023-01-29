export declare const DBO: {
    metaMarkedParser: {
        toBuffer(data: import("./Classes/TypedNode.js").TypedNode<any>): ArrayBuffer;
        toObject<T>(buffer: ArrayBuffer, byteOffSet?: number): T;
        toMMD<T_1>(buffer: ArrayBuffer, byteOffSet?: number, byteOffSetEnd?: number): import("./Classes/TypedNode.js").TypedNode<T_1>;
        toToekns(data: import("./Classes/TypedNode.js").TypedNode<any>): [([number, number] | [number, -1, string] | [number, -2, number[]] | [number, -3, string[]])[], number];
        toeknsToBuffer(data: any, size: number, buffer: ArrayBuffer, byteOffSet?: number): void;
    };
    parser: {
        mmdTokens: any[];
        jsonStrings: string[];
        schemas: Record<string, {
            length: number;
            schema: {
                [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
            };
        }>;
        advancedElementSetFunctions: Record<import("./index.js").DBOARich, (dv: DataView, byteCount: number, element: import("./Classes/TypedNode.js").TypedNode<any>) => number>;
        advancedElementGetFunctions: Record<import("./index.js").DBOARich, (dv: DataView, byteCount: number, element: import("./Classes/TypedNode.js").TypedNode<any>, targetObject: any, name: string) => number>;
        getBuffer(length: number, SAB: boolean): ArrayBuffer;
        syncSABWtihBuffer(sab: SharedArrayBuffer, buffer: ArrayBuffer): void;
        sharedBufferToBuffer(sab: SharedArrayBuffer): ArrayBufferLike;
        registerSchema(id: string, schema: {
            [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
        }): void;
        _calculateSchemaLength(schema: {
            [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
        }): number;
        _calculateVariableSizeBuffer(schema: {
            [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
        }): number;
        getSchema(id: string): {
            length: number;
            schema: {
                [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
            };
        };
        createObject<T_2>(schemaId: string, buffer: SharedArrayBuffer | DataView | ArrayBuffer): T_2;
        createBuffer(schemaId: string, updatedValues?: any): ArrayBuffer;
    };
    nodeMaker: {
        json<T_3>(data: T_3): import("./Classes/TypedNode.js").TypedNode<T_3>;
        mmd<T_4>(data: import("./Classes/TypedNode.js").TypedNode<T_4>): import("./Classes/TypedNode.js").TypedNode<import("./Classes/TypedNode.js").TypedNode<T_4>>;
        object<T_5>(data: T_5): import("./Classes/TypedNode.js").TypedNode<T_5>;
        array<T_6>(data: T_6): import("./Classes/TypedNode.js").TypedNode<T_6>;
        _8i(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        _8ui(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        _16i(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        _16ui(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        _32ui(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        _32i(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        _32f(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        _64f(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        bigi(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        bigui(value: number): import("./Classes/TypedNode.js").TypedNode<number>;
        typedArray(type: import("./index.js").DBOPrimitive, value: number[]): import("./Classes/TypedNode.js").TypedNode<number[]>;
        stringArray(value: string[]): import("./Classes/TypedNode.js").TypedNode<string[]>;
        string(value: string): import("./Classes/TypedNode.js").TypedNode<string>;
        fixedString(value: string, length: number): import("./Classes/TypedNode.js").TypedNode<string>;
        fixedTypedArray(type: import("./index.js").DBOPrimitive, value: number[], length: number): import("./Classes/TypedNode.js").TypedNode<number[]>;
        toJSONString(json: any): string;
    };
};
