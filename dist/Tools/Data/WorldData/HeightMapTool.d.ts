import type { ChunkData } from "Meta/Data/WorldData.types";
import type { LocationData } from "voxelspaces";
import { LocationBoundTool } from "../../../Tools/Classes/LocationBoundTool.js";
import { ChunkDataTool } from "./ChunkDataTool.js";
export declare class HeightMapTool extends LocationBoundTool {
    static _chunkTool: ChunkDataTool;
    chunk: {
        _c: DataView;
        _y: number;
        loadInAt: (x: number, y: number, z: number) => false | undefined;
        loadInAtLocation(location: LocationData): false | undefined;
        setChunk(chunk: ChunkData): void;
        setY(y: number): any;
        getMinMax(): number[];
        hasVoxels(): boolean;
        isDirty(): boolean;
        setHasVoxels(hasVoxels: boolean): number | void;
        setDirty(isDirty: boolean): number | void;
    };
    column: {
        getRelative(location: LocationData): number;
        getAbsolute: (location: LocationData) => number;
    };
}
