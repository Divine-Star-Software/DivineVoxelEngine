import { RawVoxelData } from "Meta/index.js";
export declare const WorldGenRegister: {
    _requests: Map<string, {
        dimension: string;
        chunks: Map<string, [x: number, y: number, z: number]>;
        voxels: [x: number, y: number, z: number, data: RawVoxelData][];
    }>;
    registerRequest(dimension: string, x: number, y: number, z: number): string;
    addToRequest(registerId: string, x: number, y: number, z: number, rawData: RawVoxelData): void;
    attemptRequestFullFill(registerId: string): boolean;
};
