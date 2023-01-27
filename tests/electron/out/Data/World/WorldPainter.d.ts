import type { AddVoxelData } from "../../Meta/Data/WorldData.types";
import { DataTool } from "../../Tools/Data/DataTool.js";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
export declare const WorldPainter: {
    _currentionDimension: string;
    paint: {
        _dt: DataTool;
        voxel(location: LocationData, data: AddVoxelData, update?: boolean): void;
        __paint(location: LocationData, data: AddVoxelData, update?: boolean): false | undefined;
        erase(location: LocationData): void;
    };
};
