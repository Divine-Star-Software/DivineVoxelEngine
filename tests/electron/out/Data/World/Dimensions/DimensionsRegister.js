import { DataHooks } from "../../DataHooks.js";
import { WorldRegister } from "../WorldRegister.js";
export const DimensionsRegister = {
    _count: 1,
    dimensionRecord: {
        main: 0,
    },
    dimensionMap: {
        0: "main",
    },
    __defaultDimensionOptions: {
        liquidFlowSpeed: 0.1,
        magmaFlowSpeed: 0.1,
        sunLight: true,
    },
    _dimensions: {},
    registerDimension(id, option) {
        if (!option) {
            option = this.__defaultDimensionOptions;
        }
        const dimensionData = {
            id: id,
            options: option,
        };
        this._dimensions[id] = dimensionData;
        this.dimensionRecord[id] = this._count;
        this.dimensionMap[this._count] = id;
        DataHooks.dimension.onRegisterDimension.run(dimensionData);
        WorldRegister.dimensions.add(id);
    },
    getDimension(id) {
        id = this.getDimensionStringId(id);
        return this._dimensions[id];
    },
    getDimensionStringId(id) {
        if (typeof id == "number") {
            return this.dimensionMap[id];
        }
        return id;
    },
    getDimensionNumericId(id) {
        if (typeof id == "string") {
            return this.dimensionRecord[id];
        }
        return id;
    },
};
