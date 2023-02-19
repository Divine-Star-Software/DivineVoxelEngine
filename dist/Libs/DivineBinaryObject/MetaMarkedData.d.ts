export declare const MMD: {
    parser: {
        toBuffer(data: import("./Classes/TypedNode.js").TypedNode<any>): ArrayBuffer;
        toObject<T>(buffer: ArrayBuffer, byteOffSet?: number): T;
        toMMD<T_1>(buffer: ArrayBuffer, byteOffSet?: number, byteOffSetEnd?: number): import("./Classes/TypedNode.js").TypedNode<T_1>;
    };
};
