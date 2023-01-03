import { LocationData } from "Meta/Data/CommonTypes";
interface AnyData {
    [key: string]: any;
}
export interface DataHandler extends AnyData {
    getRegionHeader(location: LocationData): Promise<ArrayBuffer>;
    getRegion(location: LocationData): Promise<ArrayBuffer[] | SharedArrayBuffer[]>;
    saveRegion(regionBuffer: [location: LocationData, buffer: ArrayBuffer][]): Promise<boolean>;
    getColumn(location: LocationData): Promise<ArrayBuffer | SharedArrayBuffer>;
    saveColumn(location: LocationData, columnBuffer: ArrayBuffer | SharedArrayBuffer): Promise<boolean>;
    setPath(id: string): Promise<boolean>;
    columnExists(location: LocationData): Promise<boolean>;
    columnTimestamp(location: LocationData): Promise<number>;
}
export {};
