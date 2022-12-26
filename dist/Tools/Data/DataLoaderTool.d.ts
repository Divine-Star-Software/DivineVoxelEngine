import { CommBase } from "../../Libs/ThreadComm/Comm/Comm.js";
import { DataToolWorldBound } from "./Classes/DataToolBase.js";
export declare class DataLoaderTool extends DataToolWorldBound {
    dataComm: CommBase;
    constructor();
    saveRegion(onDone?: Function): void;
    saveRegionAsync(): Promise<unknown>;
    loadRegion(onDone?: Function): void;
    loadRegionAsync(): Promise<unknown>;
}
