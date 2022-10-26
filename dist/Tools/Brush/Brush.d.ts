import type { AddVoxelData } from "Meta/Data/WorldData.types";
import { DataTool } from "../../Tools/Data/DataTool.js";
export declare class VoxelBrush {
    data: AddVoxelData;
    _dt: DataTool;
    _raw: number[];
    setId(id: string, state?: number, shapeState?: number): this;
    setDimension(dimensionId: string | number): this;
    setSecondaryId(id: string, state?: number): this;
    setState(state: number): this;
    setShapeState(state: number): this;
    setRaw(data: number[]): this;
    setXYZ(x: number, y: number, z: number): this;
    getData(): AddVoxelData;
    paint(): this;
    start(): this;
    stop(): this;
}
