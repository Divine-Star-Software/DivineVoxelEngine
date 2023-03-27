import type { RawVoxelData } from "Meta/Data/Voxels/Voxel.types.js";
import type { LocationData } from "voxelspaces";
export declare const WorldGenRegister: {
    MAX_ATTEMPTS: number;
    _requests: Map<string, {
        attempts: number;
        dimension: string;
        chunks: Map<string, [x: number, y: number, z: number]>;
        voxels: [x: number, y: number, z: number, data: RawVoxelData][];
    }>;
    registerRequest(location: LocationData): string;
    addToRequest(registerId: string, location: LocationData, rawData: RawVoxelData): void;
    attemptRequestFullFill(registerId: string): boolean;
};
