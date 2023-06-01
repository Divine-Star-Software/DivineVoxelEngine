import type { RegisterObjectMapSync, RegisterStringMapSync } from "Meta/Data/DataSync.types.js";
export declare const MappedDataRegister: {
    stringMaps: {
        segments: Map<string, Map<string, string[]>>;
        sync(data: RegisterStringMapSync): void;
        get(segment: string, id: string, index: number): string;
    };
    objectMaps: {
        segments: Map<string, Map<string, Record<number, any>>>;
        sync(data: RegisterObjectMapSync): void;
        get(segment: string, id: string, index: number): any;
    };
};
