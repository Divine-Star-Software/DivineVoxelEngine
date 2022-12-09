import { RemoteTagManager } from "Libs/DivineBinaryTags/RemoteTagManager";
export declare class DataToolBase {
    tags: RemoteTagManager;
    _c: ArrayBuffer | SharedArrayBuffer | DataView;
    dimension: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    constructor();
    setDimension(dimensionId: string): this;
    getTagValue(id: string): number;
    setTagValue(id: string, value: number): boolean;
    getArrayTagValue(id: string, index: number): number;
    setArrayTagValue(id: string, index: number, value: number): number | void;
}
export declare class PositionBoundDataTool extends DataToolBase {
    getPosition(): {
        x: number;
        y: number;
        z: number;
    };
    setPosition(x: number, y: number, z: number): {
        x: number;
        y: number;
        z: number;
    };
}
