import type { DataHandler } from "Meta/Data/DataHandler.type";
export declare const DataManager: {
    dataHanlder: DataHandler | null;
    setDataHandler(handler: DataHandler): void;
    loadRegion(x: number, y: number, z: number): Promise<void>;
    _convertArrayToSAB(array: number[], type: "UInt32" | "UInt8"): SharedArrayBuffer;
    _convertSABtoArray(array: Uint32Array | Uint8Array | number[]): number[];
    saveRegion(x: number, y: number, z: number): void;
};
