import type { Column } from "Meta/Data/WorldData.types.js";
export declare class ColumnDataTool {
    data: {
        dimension: string;
    };
    position: {
        x: number;
        y: number;
        z: number;
    };
    _c: Column;
    setDimension(dimensionId: string | number): this;
    loadIn(x: number, y: number, z: number): boolean;
    setChunk(column: Column): this;
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
    getTagValue(id: string): number;
    setTagValue(id: string, value: number): boolean;
    getArrayTagValue(id: string, index: number): number;
    setArrayTagValue(id: string, index: number, value: number): number | void;
}
