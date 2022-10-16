export const DimensionRegister = {
    _dimensions: {},
    addDimension(data) {
        this._dimensions[data.id] = data;
    },
    getDimension(id) {
        return this._dimensions[id];
    }
};
