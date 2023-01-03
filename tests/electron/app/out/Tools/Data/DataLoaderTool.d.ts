import { LocationData } from "Meta/Data/CommonTypes.js";
import { CommBase } from "../../Libs/ThreadComm/Comm/Comm.js";
import { DataToolWorldBound } from "./Classes/DataToolBase.js";
import { ColumnDataTool } from "./WorldData/ColumnDataTool.js";
export declare class DataLoaderTool extends DataToolWorldBound {
    static columnDataTool: ColumnDataTool;
    static isEnabled(): boolean;
    dataComm: CommBase;
    constructor();
    saveRegion(onDone?: Function): void;
    saveRegionAsync(): Promise<unknown>;
    loadRegion(onDone?: Function): void;
    loadRegionAsync(): Promise<unknown>;
    saveColumn(onDone?: Function): void;
    saveColumnIfNotStored(onDone?: (saved: boolean) => void): boolean;
    loadIfExists(onDone?: (loaded: boolean) => void): void;
    saveColumnAsync(): Promise<unknown>;
    loadColumn(onDone?: Function): void;
    loadColumnAsync(): Promise<unknown>;
    _runTask(id: string, location: LocationData, onDone?: Function): void;
    columnExists(onDone?: (exists: boolean) => void): void;
    loadRegionHeader(onDone: (success: boolean) => void): void;
    loadRegionHeaderAsync(): Promise<unknown>;
    columnExistsAsync(): Promise<boolean>;
    columnTimestamp(onDone?: (timestamp: number) => void): void;
    columnTimestampAsync(): Promise<number>;
}
