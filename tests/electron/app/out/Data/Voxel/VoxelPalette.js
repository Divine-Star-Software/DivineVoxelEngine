export const VoxelPaletteReader = {
    _palette: {
        0: "dve:air",
        1: "dve:barrier",
    },
    _map: {
        "dve:air": 0,
        "dve:barrier": 1,
    },
    setVoxelPalette(voxelPalette, voxelPaletteMap) {
        this._palette = voxelPalette;
        this._map = voxelPaletteMap;
    },
    id: {
        stringFromNumber(id) {
            return VoxelPaletteReader._palette[id];
        },
        numberFromString(id) {
            return VoxelPaletteReader._map[id];
        },
        getPaletteId(voxelId, voxelState) {
            const numericID = VoxelPaletteReader._map[voxelId];
            const stateId = voxelState + numericID;
            if (VoxelPaletteReader._palette[stateId] != voxelId) {
                throw new Error(`${voxelState} is not a valid state for voxel with id : ${voxelId}`);
            }
            if (stateId) {
                return stateId;
            }
            return -1;
        },
        baseNumeric(id) {
            if (id < 2)
                return id;
            const paletteId = VoxelPaletteReader._palette[id];
            return VoxelPaletteReader._map[paletteId];
        },
    },
};
