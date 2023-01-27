import type { LocationData } from "Meta/Data/CommonTypes.js";
import { RegionDataTool } from "../../Tools/Data/WorldData/RegionDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
export declare const WorldDataSerialize: {
    regions: RegionDataTool;
    columns: ColumnDataTool;
    chunks: ChunkDataTool;
    serializeRegion(location: LocationData): false | [location: LocationData, buffer: ArrayBuffer][];
    serializeColumn(location: LocationData): false | Uint8Array;
    deSerializeRegion(regionBuffers: ArrayBuffer[] | SharedArrayBuffer[]): void;
    deSerializeColumn(columnBuffer: ArrayBuffer | SharedArrayBuffer): {
        column: SharedArrayBuffer;
        chunks: SharedArrayBuffer[];
    };
    _readDataIntoBuffer(offset: number, target: Uint8Array, source: ArrayBuffer | SharedArrayBuffer, sourceOffset?: number, sourceLength?: number): number;
};
