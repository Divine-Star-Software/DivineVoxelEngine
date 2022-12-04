import type { ChunkData, Column } from "Meta/Data/WorldData.types";
import type { VoxelTemplateSubstanceType } from "Meta/index";
import { ChunkDataTool } from "./ChunkDataTool.js";
export declare class HeightMapTool {
    static _chunkTool: ChunkDataTool;
    _data: {
        dimension: string;
    };
    constructor();
    setDimension(dimensionId: string): void;
    chunk: {
        _p: {
            x: number;
            z: number;
        };
        _c: ChunkData;
        _s: HeightMapTool;
        loadIn(x: number, y: number, z: number): false | undefined;
        setChunk(chunk: ChunkData): void;
        setXZ(x: number, z: number): any;
        getMin(substance?: VoxelTemplateSubstanceType | "all"): number;
        getMax(substance?: VoxelTemplateSubstanceType | "all"): number;
        update(mode: "remove" | "add", substance: VoxelTemplateSubstanceType | "all" | undefined, x: number, y: number, z: number): void;
    };
    column: {
        _c: Column;
        _p: {
            x: number;
            z: number;
        };
        _s: HeightMapTool;
        loadIn(x: number, z: number, y?: number): false | undefined;
        setXZ(x: number, z: number): any;
        getMin(): void;
        getMax(): void;
    };
}
