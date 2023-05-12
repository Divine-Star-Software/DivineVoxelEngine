import { LocationData } from "voxelspaces";
export type DataLoaderModes = "server" | "indexdb" | "both";
export type DataLoaderSegments = "world-data" | "rich-data" | "dbo" | "entities";
export declare abstract class DataHandler {
    mode: "server" | "indexdb" | "both";
    constructor();
    setMode(mode: "server" | "indexdb" | "both"): void;
    dataType: DataLoaderSegments;
    setDataType(type: DataLoaderSegments): void;
    abstract getRegionHeader(location: LocationData): Promise<ArrayBuffer>;
    abstract setPath(id: string): Promise<boolean>;
    abstract getColumn(location: LocationData): Promise<ArrayBuffer | SharedArrayBuffer>;
    abstract saveColumn(location: LocationData, columnBuffer: ArrayBuffer | SharedArrayBuffer): Promise<boolean>;
    abstract columnExists(location: LocationData): Promise<boolean>;
    abstract columnTimestamp(location: LocationData): Promise<number>;
}
