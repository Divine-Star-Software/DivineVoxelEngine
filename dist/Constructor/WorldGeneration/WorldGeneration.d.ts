import type { WorldGenInterface } from "Meta/Interfaces/WorldGen/WorldGen.types";
import type { GenerateTasks } from "Meta/Tasks/Tasks.types.js";
import { WorldGenBrush } from "../Tools/WorldGenBrush.js";
export declare const WorldGeneration: {
    worldGen: WorldGenInterface | null;
    register: {
        MAX_ATTEMPTS: number;
        _requests: Map<string, {
            attempts: number;
            dimension: string;
            chunks: Map<string, [x: number, y: number, z: number]>;
            voxels: [x: number, y: number, z: number, data: import("../../index.js").RawVoxelData][];
        }>;
        registerRequest(location: import("voxelspaces").LocationData): string;
        addToRequest(registerId: string, location: import("voxelspaces").LocationData, rawData: import("../../index.js").RawVoxelData): void;
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
    generate(data: GenerateTasks, mode: "generate" | "decorate", onDone: Function): Promise<void>;
    getBrush(): WorldGenBrush;
};
