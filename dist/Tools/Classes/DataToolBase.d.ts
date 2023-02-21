import type { RemoteTagManager } from "divine-binary-tags";
import type { LocationData } from "voxelspaces";
import { LocationBoundTool } from "./LocationBoundTool.js";
export declare abstract class DataToolBase extends LocationBoundTool {
    tags: RemoteTagManager;
    _c: ArrayBuffer | SharedArrayBuffer | DataView;
    constructor();
    getTagValue(id: string): any;
    setTagValue(id: string, value: number): any;
    getArrayTagValue(id: string, index: number): any;
    setArrayTagValue(id: string, index: number, value: number): any;
    setBuffer(buffer: ArrayBuffer | DataView | SharedArrayBuffer): void;
    getBuffer(): ArrayBuffer;
    getAsArrayBuffer(): ArrayBuffer;
    getBufferSize(): any;
    abstract loadIn(): boolean;
    loadInAt(x: number, y: number, z: number): boolean;
    loadInAtLocation(location: LocationData): boolean;
}
export declare abstract class EncodedPositionDataTool extends DataToolBase {
    position: {
        x: number;
        y: number;
        z: number;
    };
    constructor();
    getPositionData(): {
        x: number;
        y: number;
        z: number;
    };
    setPositionData(x: number, y: number, z: number): {
        x: number;
        y: number;
        z: number;
    };
    setDimensionId(dimensionId: string): void;
    getDimensionId(): string;
    getLocationData(): LocationData;
}
