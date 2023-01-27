import type { EngineSettingsData } from "Meta/index";
export declare const WorldSpaces: {
    region: import("../../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
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
    column: import("../../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
    chunk: import("../../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
        _regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        getRegionPositonx(): {
            x: number;
            y: number;
            z: number;
            copy(): any;
            copyTo(vec3: {
                x: number;
                y: number;
                z: number;
            }): void;
            toString(): string;
            multiply(vec3: {
                x: number;
                y: number;
                z: number;
            }): any;
        };
        getRegionPositonxXYZ(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
            copy(): any;
            copyTo(vec3: {
                x: number;
                y: number;
                z: number;
            }): void;
            toString(): string;
            multiply(vec3: {
                x: number;
                y: number;
                z: number;
            }): any;
        };
        getRegionIndex(): number;
        getRegionIndexXYZ(x: number, y: number, z: number): number;
    };
    voxel: import("../../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
    setDimensions(data: {
        regions: {
            x: number;
            y: number;
            z: number;
        };
        columns: {
            x: number;
            y: number;
            z: number;
        };
        chunks: {
            x: number;
            y: number;
            z: number;
        };
    }): void;
} & {
    $INIT(settings: EngineSettingsData): void;
};
