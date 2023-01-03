import { VoxelSpace } from "./Classes/VoxelSpace.js";
declare type Vector3 = {
    x: number;
    y: number;
    z: number;
};
export declare const VoxelSpaces: {
    zeroPointSpace: VoxelSpace;
    getVoxelSpaces(): {
        region: VoxelSpace & {
            chunkBounds: {
                x: number;
                y: number;
                z: number;
            };
            columnBounds: {
                x: number;
                y: number;
                z: number;
            };
            getChunkVolume(): number;
            getColumnVolume(): number;
        };
        column: VoxelSpace;
        chunk: VoxelSpace & {
            _regionPosition: {
                x: number;
                y: number;
                z: number;
            };
            getRegionPositonx(): {
                x: number;
                y: number;
                z: number;
            };
            getRegionPositonxXYZ(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getRegionIndex(): number;
            getRegionIndexXYZ(x: number, y: number, z: number): number;
        };
        voxel: VoxelSpace;
        setDimensions(data: {
            regions: Vector3;
            columns: Vector3;
            chunks: Vector3;
        }): void;
    };
    getZeroPointVoxelSpace(dimensions: Vector3): VoxelSpace;
};
export {};
