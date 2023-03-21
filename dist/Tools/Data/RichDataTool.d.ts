import { CommBase } from "threadcomm";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
export declare class RichDataTool extends LocationBoundTool {
    segment: string;
    comm: CommBase;
    _enabled: boolean;
    constructor();
    isEnabled(): boolean;
    setSegment(segment: string): this;
    columnHasData(check: (hasData: boolean) => void): void;
    columnHasDataAsync(): Promise<boolean>;
    getData<T = any>(onDone: (data: T | false) => void): void;
    getDataAsync<T = any>(): Promise<T | false>;
    setData<T = any>(data: T, onDone?: (data: boolean) => void): void;
    setDataAsync<T = any>(data: T): Promise<boolean>;
    removeData(onDone: (removed: boolean) => void): void;
    removeDataAsync<T = any>(): Promise<boolean>;
    removeColumn(onDone: (removed: boolean) => void): void;
    removeColumnAsync<T = any>(): Promise<boolean>;
    getColumn(onDone: (data: ArrayBuffer) => void): void;
    getColumnAsync(): Promise<ArrayBuffer>;
    setColumn(column: ArrayBuffer, onDone: (success: boolean) => void): void;
    setColumnAsync(column: ArrayBuffer): Promise<boolean>;
    releaeAllData(): void;
}
