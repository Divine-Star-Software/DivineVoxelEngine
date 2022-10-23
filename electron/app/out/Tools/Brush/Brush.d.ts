import type { AddVoxelData } from "Meta/Data/WorldData.types";
export declare class VoxelBrush {
    data: AddVoxelData;
    setId(id: string, state?: number, shapeState?: number): this;
    setDimension(dimensionId: string | number): this;
    setSecondaryId(id: string, state?: number): this;
    setState(state: number): this;
    setShapeState(state: number): this;
    setXYZ(x: number, y: number, z: number): this;
    getData(): AddVoxelData;
    paint(): this;
    start(): this;
    stop(): this;
}
