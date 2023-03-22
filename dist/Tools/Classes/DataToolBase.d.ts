import type { RemoteTagManager } from "divine-binary-tags";
import type { LocationData } from "voxelspaces";
import { LocationBoundTool } from "./LocationBoundTool.js";
import { Position3Matrix, Vec3Array } from "Math/index.js";
export declare abstract class DataToolBase extends LocationBoundTool {
    tags: RemoteTagManager;
    _c: ArrayBuffer | SharedArrayBuffer | DataView;
    constructor();
    getTagValue(id: string): number;
    setTagValue(id: string, value: number): boolean;
    getArrayTagValue(id: string, index: number): number;
    setArrayTagValue(id: string, index: number, value: number): number | void;
    setBuffer(buffer: ArrayBuffer | DataView | SharedArrayBuffer): void;
    getBuffer(): ArrayBuffer;
    getAsArrayBuffer(): ArrayBuffer;
    getBufferSize(): number;
    abstract loadIn(): boolean;
    loadInAt(x: number, y: number, z: number): boolean;
    loadInVec3Array(vec3: Vec3Array): boolean;
    loadInVec3(vec3: Position3Matrix): boolean;
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
