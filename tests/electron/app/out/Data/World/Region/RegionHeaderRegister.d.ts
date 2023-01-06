import type { LocationData } from "Meta/Data/CommonTypes";
declare type RegionHeaderData = Map<string, Map<string, {
    data: DataView;
    buffer: SharedArrayBuffer;
}>>;
export declare const RegionHeaderRegister: {
    _headers: RegionHeaderData;
    remove(location: LocationData): boolean;
    add(location: LocationData, buffer: SharedArrayBuffer): void;
    get(location: LocationData): false | {
        data: DataView;
        buffer: SharedArrayBuffer;
    } | undefined;
    /**# isStored
     * @param location
     * @returns
     *
     * Returns 1 if stored
     *
     * Returns 0 if not stored
     *
     * Returns -1 if region header is not loaded
     *
     */
    isStored(location: LocationData): 0 | 1 | -1;
};
export {};
