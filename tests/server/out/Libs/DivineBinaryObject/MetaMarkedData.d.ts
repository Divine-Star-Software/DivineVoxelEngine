export declare const MMD: {
    parser: {
        toBuffer(data: import("./Classes/TypedNode.js").TypedNode<any>): ArrayBuffer;
        toObject<T>(buffer: ArrayBuffer, byteOffSet?: number): T;
        toMMD<T_1>(buffer: ArrayBuffer, byteOffSet?: number, byteOffSetEnd?: number): import("./Classes/TypedNode.js").TypedNode<T_1>;
        toToekns(data: import("./Classes/TypedNode.js").TypedNode<any>): [([number, number] | [number, -1, string] | [number, -2, number[]] | [number, -3, string[]])[], number];
        toeknsToBuffer(data: any, size: number, buffer: ArrayBuffer, byteOffSet?: number): void;
    };
};
