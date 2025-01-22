import {
  DimensionData,
  DimensionOptions,
} from "../Types/DimensionData.types.js";
import { DataHooks } from "../Sync/DataHooks.js";

import { WorldRegister } from "./WorldRegister.js";

export class DimensionsRegister {
  static instance: DimensionsRegister;
  _count = 1;
  dimensionRecord = <Record<string, number>>{
    main: 0,
  };
  dimensionMap: Record<number, string> = {
    0: "main",
  };
  __defaultDimensionOptions: DimensionOptions = {
    liquidFlowSpeed: 0.1,
    magmaFlowSpeed: 0.1,
    sunLight: true,
  };
  _dimensions: Record<string, DimensionData> = {};
  constructor() {
    if (DimensionsRegister.instance) return DimensionsRegister.instance;
    DimensionsRegister.instance = this;
  }
  registerDimension(id: string, option: DimensionOptions) {
    if (!option) {
      option = this.__defaultDimensionOptions;
    }
    const dimensionData: DimensionData = {
      id: id,
      options: option,
    };
    this._dimensions[id] = dimensionData;
    this.dimensionRecord[id] = this._count;
    this.dimensionMap[this._count] = id;
    DataHooks.dimension.onRegisterDimension.pipe(dimensionData);
    WorldRegister.instance.dimensions.add(id);
  }
  getDimension(id: string | number) {
    id = this.getDimensionStringId(id);
    return this._dimensions[id];
  }
  getDimensionStringId(id: string | number) {
    if (typeof id == "number") {
      return this.dimensionMap[id];
    }
    return id;
  }
  getDimensionNumericId(id: string | number) {
    if (typeof id == "string") {
      return this.dimensionRecord[id];
    }
    return id;
  }
}
