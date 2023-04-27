import type { WorldLockTasks } from "Meta/Tasks/Tasks.types.js";
import type { LocationData } from "voxelspaces";
import { DataLoaderTool } from "../../Tools/Loader/DataLoaderTool.js";
import { UtilMap } from "../../Global/Util/UtilMap.js";
export declare const WorldLock: {
    locks: UtilMap<string, WorldLockTasks>;
    dataLoader: DataLoaderTool;
    $INIT(dataLoaderTool: DataLoaderTool): void;
    _loadMap: UtilMap<string, boolean>;
    addLock(data: WorldLockTasks): Promise<unknown>;
    removeLock(data: WorldLockTasks): void;
    isLocked([sdim, x, y, z]: LocationData): boolean;
};
