import type { LocationData } from "Meta/Data/CommonTypes";
import type { DataHandler } from "Meta/Interfaces/DataLoader/DataHandler.type";
export declare const DataHanlderWrapper: {
    handler: DataHandler;
    $INIT(handler: DataHandler): void;
    loadRegionHeader(location: LocationData): Promise<boolean>;
    saveColumn(location: LocationData): Promise<false | undefined>;
    loadColumn(location: LocationData): Promise<boolean>;
    setPath(id: string): Promise<boolean>;
    columnExists(location: LocationData): Promise<boolean>;
    columnTimestamp(location: LocationData): Promise<number>;
    saveRegion(location: LocationData): Promise<boolean>;
    loadRegion(location: LocationData): Promise<boolean>;
};
