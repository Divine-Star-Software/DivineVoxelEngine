import type { DimensionData, DimensionOptions } from "Meta/Data/DimensionData.types";
export declare const DimensionsRegister: {
    _count: number;
    dimensionRecord: Record<string, number>;
    dimensionMap: Record<number, string>;
    __defaultDimensionOptions: DimensionOptions;
    _dimensions: Record<string, DimensionData>;
    registerDimension(id: string, option: DimensionOptions): void;
    getDimension(id: string | number): DimensionData;
    getDimensionStringId(id: string | number): string;
    getDimensionNumericId(id: string | number): number;
};
