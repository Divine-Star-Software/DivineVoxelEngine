import { ChunkData } from "Meta/Data/WorldData.types.js";
export declare class ChunkDataTool {
    static _dtutil: ChunkDataTool;
    data: {
        dimension: string;
    };
    position: {
        x: number;
        y: number;
        z: number;
    };
    _c: ChunkData;
    setDimension(dimensionId: string | number): this;
    loadIn(x: number, y: number, z: number): boolean;
    setChunk(chunk: ChunkData): this;
    getPosition(): {
        x: number;
        y: number;
        z: number;
    };
    setPosition(x: number, y: number, z: number): {
        x: number;
        y: number;
        z: number;
    };
    getTagValue(id: string): number;
    setTagValue(id: string, value: number): boolean;
    getArrayTagValue(id: string, index: number): number;
    setArrayTagValue(id: string, index: number, value: number): number | void;
}
