import type { AddVoxelData } from "Meta/Data/WorldData.types";
import { DataTool } from "../../Tools/Data/DataTool.js";
export declare class BrushTool {
    data: AddVoxelData;
    _dt: DataTool;
    _raw: number[];
    setId(id: string, state?: number, shapeState?: number): this;
    setDimension(dimensionId: string | number): this;
    setSecondaryId(id: string, state?: number): this;
    setState(state: number): this;
    setShapeState(state: number): this;
    clear(): void;
    setRaw(data: number[]): this;
    getRaw(): number[];
    setXYZ(x: number, y: number, z: number): this;
    getData(): AddVoxelData;
    paint(): this;
    erease(): this;
    start(): this;
    stop(): this;
}
