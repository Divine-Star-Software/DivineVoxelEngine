import { LocationData } from "voxelspaces";
interface AnyData {
    [key: string]: any;
}
export interface DataHandler extends AnyData {
    getRegionHeader(location: LocationData): Promise<ArrayBuffer>;
    setPath(id: string): Promise<boolean>;
    getColumn(location: LocationData): Promise<ArrayBuffer | SharedArrayBuffer>;
    saveColumn(location: LocationData, columnBuffer: ArrayBuffer | SharedArrayBuffer): Promise<boolean>;
    columnExists(location: LocationData): Promise<boolean>;
    columnTimestamp(location: LocationData): Promise<number>;
}
export {};
