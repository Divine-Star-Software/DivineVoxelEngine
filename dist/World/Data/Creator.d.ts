export declare const DataCreator: {
    convertToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
    chunk: {
        getBuffer(buffer?: ArrayBuffer | false): SharedArrayBuffer;
    };
    column: {
        getBuffer(buffer?: ArrayBuffer | false): SharedArrayBuffer;
    };
    region: {
        getBuffer(buffer?: ArrayBuffer | false): SharedArrayBuffer;
    };
};
