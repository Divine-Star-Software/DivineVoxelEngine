export const VoxelPaletteReader = {
    _palette: ["dve_air", "dve_barrier"],
    _map: new Map(),
    setVoxelPalette(voxelPalette, voxelPaletteMap) {
        this._palette = voxelPalette;
        this._map = new Map(Object.entries(voxelPaletteMap));
    },
    id: {
        stringFromNumber(id) {
            return VoxelPaletteReader._palette[id];
        },
        numberFromString(id) {
            return VoxelPaletteReader._map.get(id);
        },
        getPaletteId(voxelId, voxelState) {
            const numericID = VoxelPaletteReader._map.get(voxelId);
            if (numericID == undefined)
                return -1;
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
            const vid = this.numberFromString(this.stringFromNumber(id));
            if (!vid)
                return -1;
            return vid;
        },
    },
};
