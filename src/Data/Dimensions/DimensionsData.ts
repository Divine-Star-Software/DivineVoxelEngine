import type {
 DimensionData,
 DimensionOptions,
} from "Meta/Data/DimensionData.types";

export const DimensionsData = {
 dimensionRecord: <Record<string, number>>{
  main: 0,
 },
 dimensionMap: <Record<number, string>>{
  0: "main",
 },
 __defaultDimensionOptions: <DimensionOptions>{
  fluidFlowSpeed: 0.1,
  magmaFlowSpeed: 0.1,
  sunLight: true,
 },
 _dimensions: <Record<string, DimensionData>>{},
 addDimension(id: string, option: DimensionOptions) {
  if (!option) {
   option = this.__defaultDimensionOptions;
  }
  const dimension: DimensionData = {
   id: id,
   options: option,
  };
  this._dimensions[id] = dimension;
 },
 getDimension(id: string) {
  return this._dimensions[id];
 },

 getDimensionStringId(id: string | number) {
  if (typeof id == "number") {
   return this.dimensionMap[id];
  }
  return id;
 },
 getDimensionNumericId(id: string | number) {
  if (typeof id == "string") {
   return this.dimensionRecord[id];
  }
  return id;
 },
};
