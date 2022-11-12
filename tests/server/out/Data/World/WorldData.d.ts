import type { AddVoxelData, ChunkData } from "../../Meta/Data/WorldData.types";
import type { VoxelSubstanceType } from "Meta/index.js";
import { DataTool } from "../../Tools/Data/DataTool.js";
declare type ID = string | number;
export declare const WorldPainter: {
    _currentionDimension: string;
    util: {
        isSameVoxel(dimensionId: ID, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
    };
    heightMap: {
        update: {
            add(dimensionId: ID, substance: VoxelSubstanceType, x: number, y: number, z: number): void;
            remove(dimensionId: ID, substance: VoxelSubstanceType, x: number, y: number, z: number): void;
        };
    };
    paint: {
        _dt: DataTool;
        voxel(data: AddVoxelData, update?: boolean): void;
        voxelAsync(data: AddVoxelData): Promise<void>;
        __paint(dimension: ID, data: AddVoxelData, chunk: ChunkData, update?: boolean): false | undefined;
        erease(dimensionId: ID, x: number, y: number, z: number): void;
    };
};
export {};
