import type { WorldGenInterface } from "Meta/Interfaces/WorldGen/WorldGen.types";
import type { GenerateTasks } from "Meta/Tasks/Tasks.types.js";
export declare const WorldGeneration: {
    worldGen: WorldGenInterface | null;
    register: {
        MAX_ATTEMPTS: number;
        _requests: Map<string, {
            attempts: number;
            dimension: string;
            chunks: Map<string, [x: number, y: number, z: number]>;
            voxels: [x: number, y: number, z: number, data: import("../../Meta/index.js").RawVoxelData][];
        }>;
        registerRequest(dimension: string, x: number, y: number, z: number): string;
        addToRequest(registerId: string, location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, rawData: import("../../Meta/index.js").RawVoxelData): void;
        attemptRequestFullFill(registerId: string): boolean;
    };
    worldBounds: {
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
        setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
    };
    _brushes: any[];
    setWorldGen(worldGen: WorldGenInterface): void;
    generate(data: GenerateTasks, onDone: Function): void;
    getBrush(): import("../../Tools/Brush/Brush.js").BrushTool & {
        requestsId: string;
        paint(this: import("../../Tools/Brush/Brush.js").BrushTool): import("../../Tools/Brush/Brush.js").BrushTool;
    };
};
