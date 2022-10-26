import type { DataHandler } from "Meta/Interfaces/DataLoader/DataHandler.type";
export declare const DataManager: {
    dataHanlder: DataHandler | null;
    setDataHandler(handler: DataHandler): void;
    saveChunk(x: number, y: number, z: number): void;
    loadChunk(x: number, y: number, z: number): void;
    _pos: {
        x: number;
        y: number;
        z: number;
        newIndex: number;
    };
    _sab: {
        sab: SharedArrayBuffer;
        newIndex: number;
    };
    loadRegion(x: number, y: number, z: number): Promise<void>;
    _getSAB(regionArray: Uint32Array, currentIndex: number, arrayLength: number): {
        sab: SharedArrayBuffer;
        newIndex: number;
    };
    _getPos(regionArray: Uint32Array, currentIndex: number): {
        x: number;
        y: number;
        z: number;
        newIndex: number;
    };
    saveRegion(x: number, y: number, z: number): void;
    _addPositionToBuffer(x: number, y: number, z: number, regionArray: Uint32Array, currentIndex: number): number;
    _addArrayToBuffer(regionArray: Uint32Array, currentIndex: number, array: Uint32Array): number;
    _getRegionBufferSize(totalChunks: number): number;
};
