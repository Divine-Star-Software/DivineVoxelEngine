import type { ChunkData, Column } from "Meta/Data/WorldData.types";
import type { VoxelTemplateSubstanceType } from "Meta/index";
export declare class HeightMapTool {
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
        setXZ(x: number, z: number): any;
        getMin(substance?: VoxelTemplateSubstanceType | "all"): number;
        getMax(substance?: VoxelTemplateSubstanceType | "all"): number;
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
