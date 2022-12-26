export declare const WorldDataGenerator: {
    convertToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
    chunk: {
        create(buffer?: ArrayBuffer | false): SharedArrayBuffer;
    };
    column: {
        create(buffer?: ArrayBuffer | false): SharedArrayBuffer;
    };
    region: {
        create(buffer?: ArrayBuffer | false): SharedArrayBuffer;
    };
};
