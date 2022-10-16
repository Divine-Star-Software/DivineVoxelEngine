export const WorldData = {
    _currentionDimension: "main",
    voxelPalette: {},
    voxelPaletteMap: {},
    setCurrentDimension(id) { },
    setVoxelPalette(voxelPalette, voxelPaletteMap) {
        this.voxelPalette = voxelPalette;
        this.voxelPaletteMap = voxelPaletteMap;
    },
    rawData: {
        get(dimensionId, x, y, z, secondary = false) { },
        set(dimensionId, x, y, z, value, secondary = false) { },
    },
    voxel: {
        getData(dimensionId, x, y, z) { },
        getState(dimensionId, x, y, z) { },
        getShapeState(dimensionId, x, y, z) { },
        getLevel(dimensionId, x, y, z) { },
        setState(dimensionId, x, y, z, state) { },
        setShapeState(dimensionId, x, y, z, shapeState) { },
        setLevel(dimensionId, x, y, z, level) { },
        getStringId(dimensionId, x, y, z) { },
        getNumrticId(dimensionId, x, y, z) { },
    },
    paint: {
        voxel(data) { },
    },
    light: {
        get(dimesnionId, x, y, z) { },
        set(dimesnionId, x, y, z, value) { },
        getRed(dimesnionId, x, y, z) { },
        getBlue(dimesnionId, x, y, z) { },
        getGreen(dimesnionId, x, y, z) { },
        getSun(dimesnionId, x, y, z) { },
        setRed(dimesnionId, x, y, z, value) { },
        setGreen(dimesnionId, x, y, z, value) { },
        setBlue(dimesnionId, x, y, z, value) { },
        setSun(dimesnionId, x, y, z, value) { },
    },
};
WorldData.paint.voxel({ id: "dve:dreamstine", position: [0, 0, 1] });
