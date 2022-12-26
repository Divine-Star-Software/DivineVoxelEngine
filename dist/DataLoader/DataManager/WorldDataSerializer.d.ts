import type { DataHandler } from "Meta/Interfaces/DataLoader/DataHandler.type";
import type { LocationData } from "Meta/Data/CommonTypes.js";
import { RegionDataTool } from "../../Tools/Data/WorldData/RegionDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
export declare const WorldDataSerializer: {
    dataHanlder: DataHandler | null;
    regions: RegionDataTool;
    columns: ColumnDataTool;
    chunks: ChunkDataTool;
    $INIT(handler: DataHandler): void;
    loadRegion(location: LocationData, regionBuffer?: ArrayBuffer | SharedArrayBuffer): Promise<void>;
    saveRegion(location: LocationData): Promise<false | undefined>;
    _readDataIntoBuffer(offset: number, target: Uint8Array, source: ArrayBuffer | SharedArrayBuffer, sourceOffset?: number, sourceLength?: number): void;
};
