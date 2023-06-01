export const SubstancePaletteReader = {
 _palette: <string[]>[],
 _map: <Map<string, number>>new Map(),

 setPalette(palette: string[], map: Record<string, number>) {
  this._palette = palette;
  this._map = new Map(Object.entries(map));
 },
 id: {
  stringFromNumber(id: number) {
   return SubstancePaletteReader._palette[id];
  },
  numberFromString(id: string) {
   return SubstancePaletteReader._map.get(id)!;
  },
 },
};
