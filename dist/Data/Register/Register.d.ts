import type { RegisterStringMapSync } from "Meta/Data/DataSync.types.js";
export declare const Register: {
    stringMaps: {
        segments: Map<string, Map<string, string[]>>;
        syncStringMap(data: RegisterStringMapSync): void;
        getStringMapValue(segment: string, id: string, index: number): string;
    };
};
