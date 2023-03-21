import type { LocationData } from "voxelspaces";
import { DataHandler, DataLoaderModes } from "./DataHandlerBaes.js";
import { RichDataTool } from "../../Tools/Data/RichDataTool.js";
export declare const DataHanlderWrapper: {
    mode: DataLoaderModes;
    handler: DataHandler;
    richData: RichDataTool;
    $INIT(handler: DataHandler): void;
    loadRegionHeader(location: LocationData): Promise<boolean>;
    saveColumn(location: LocationData): Promise<boolean | undefined>;
    loadColumn(location: LocationData): Promise<boolean>;
    unLoadColumn(location: LocationData): Promise<true | undefined>;
    setPath(id: string): Promise<boolean>;
    columnExists(location: LocationData): Promise<boolean>;
    columnTimestamp(location: LocationData): Promise<number>;
};
