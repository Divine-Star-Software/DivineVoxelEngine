import type { DimensionData } from "Meta/Data/DimensionData.types";
export declare const DimensionRegister: {
    _dimensions: Record<string, DimensionData>;
    addDimension(data: DimensionData): void;
    getDimension(id: string): DimensionData;
};
