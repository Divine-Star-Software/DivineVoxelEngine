export const DimensionsData = {
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
    addDimension(id, option) {
        if (!option) {
            option = this.__defaultDimensionOptions;
        }
        const dimension = {
            id: id,
            options: option,
        };
        this._dimensions[id] = dimension;
    },
    getDimension(id) {
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
