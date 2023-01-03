export type BufferTypes = ArrayBuffer | SharedArrayBuffer;


export type RemoteTagManagerInitData ={
    buffer :  BufferTypes,
    bufferSize : number,
    indexBuffer : BufferTypes,
    indexMap : Map<string,number>,
    totalIndexes : number,
    tagSize : number
}
