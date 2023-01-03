import type { WorldGenInterface } from "Meta/Interfaces/WorldGen/WorldGen.types";
import type { GenerateTasks } from "Meta/Tasks/Tasks.types.js";
export declare const WorldGeneration: {
    worldGen: WorldGenInterface | null;
    register: {
        _requests: Map<string, {
            dimension: string;
            chunks: Map<string, [x: number, y: number, z: number]>;
            voxels: [x: number, y: number, z: number, data: import("../../Meta/index.js").RawVoxelData][];
        }>;
        registerRequest(dimension: string, x: number, y: number, z: number): string;
        addToRequest(registerId: string, x: number, y: number, z: number, rawData: import("../../Meta/index.js").RawVoxelData): void;
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
export declare type DivineVoxelEngineWorldGeneration = typeof WorldGeneration;
