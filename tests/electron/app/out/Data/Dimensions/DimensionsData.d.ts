import type { DimensionData, DimensionOptions } from "Meta/Data/DimensionData.types";
export declare const DimensionsData: {
    dimensionRecord: Record<string, number>;
    dimensionMap: Record<number, string>;
    __defaultDimensionOptions: DimensionOptions;
    _dimensions: Record<string, DimensionData>;
    addDimension(id: string, option: DimensionOptions): void;
    getDimension(id: string): DimensionData;
    getDimensionStringId(id: string | number): string;
    getDimensionNumericId(id: string | number): number;
};
