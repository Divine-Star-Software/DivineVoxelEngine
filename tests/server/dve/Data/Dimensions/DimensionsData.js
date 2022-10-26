import { DataHooks } from "Data/DataHooks";
export const DimensionsRegister = {
    dimensionRecord: {
        main: 0,
    },
    dimensionMap: {
        0: "main",
    },
    __defaultDimensionOptions: {
        fluidFlowSpeed: 0.1,
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
        dimensionData;
        DataHooks.dimension.onRegisterDimension.run(dimensionData);
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
