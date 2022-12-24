import type { AddVoxelData } from "../../Meta/Data/WorldData.types";
import { DataTool } from "../../Tools/Data/DataTool.js";
declare type ID = string | number;
export declare const WorldPainter: {
    _currentionDimension: string;
    util: {
        isSameVoxel(dimensionId: ID, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
    };
    paint: {
        _dt: DataTool;
        voxel(data: AddVoxelData, update?: boolean): void;
        voxelAsync(data: AddVoxelData): Promise<void>;
        __paint(dimension: string, data: AddVoxelData, update?: boolean): false | undefined;
        erase(dimensionId: ID, x: number, y: number, z: number): void;
    };
};
export {};
