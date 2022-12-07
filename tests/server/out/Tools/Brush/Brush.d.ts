import type { AddVoxelData } from "Meta/Data/WorldData.types";
import { DataTool } from "../../Tools/Data/DataTool.js";
import { RawVoxelData } from "Meta/index.js";
export declare class BrushTool {
    data: AddVoxelData;
    _dt: DataTool;
    setId(id: string, state?: number, shapeState?: number): this;
    setDimension(dimensionId: string | number): this;
    setSecondaryId(id: string, state?: number): this;
    setState(state: number): this;
    setShapeState(state: number): this;
    clear(): void;
    setRaw(data: RawVoxelData): this;
    getRaw(): RawVoxelData;
    setXYZ(x: number, y: number, z: number): this;
    getData(): AddVoxelData;
    paint(): this;
    erease(): this;
    start(): this;
    stop(): this;
}
