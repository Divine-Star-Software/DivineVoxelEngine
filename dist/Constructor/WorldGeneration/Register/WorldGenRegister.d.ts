import { RawVoxelData } from "Meta/index.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
export declare const WorldGenRegister: {
    MAX_ATTEMPTS: number;
    _requests: Map<string, {
        attempts: number;
        dimension: string;
        chunks: Map<string, [x: number, y: number, z: number]>;
        voxels: [x: number, y: number, z: number, data: RawVoxelData][];
    }>;
    registerRequest(dimension: string, x: number, y: number, z: number): string;
    addToRequest(registerId: string, location: LocationData, rawData: RawVoxelData): void;
    attemptRequestFullFill(registerId: string): boolean;
};
