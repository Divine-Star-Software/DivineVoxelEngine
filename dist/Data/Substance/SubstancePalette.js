export const SubstancePaletteReader = {
    _palette: [],
    _map: new Map(),
    setPalette(palette, map) {
        this._palette = palette;
        this._map = new Map(Object.entries(map));
    },
    id: {
        stringFromNumber(id) {
            return SubstancePaletteReader._palette[id];
        },
        numberFromString(id) {
            return SubstancePaletteReader._map.get(id);
        },
    },
};
