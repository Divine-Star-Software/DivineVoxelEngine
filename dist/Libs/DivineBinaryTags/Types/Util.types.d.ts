export declare type BufferTypes = ArrayBuffer | SharedArrayBuffer;
export declare type RemoteTagManagerInitData = {
    buffer: BufferTypes;
    bufferSize: number;
    indexBuffer: BufferTypes;
    indexMap: Map<string, number>;
    totalIndexes: number;
    tagSize: number;
};
