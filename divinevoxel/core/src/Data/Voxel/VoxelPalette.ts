export class VoxelPaletteReader {
  static _palette: string[] = ["dve_air", "dve_barrier"];
  static _map = new Map<string, number>();
  static _nameToIdMap = new Map<string, string>();
  static _idToNameMap = new Map<string, string>();

  static setVoxelIdPalette(
    voxelPalette: string[],
    voxelPaletteMap: Record<string, number>
  ) {
    this._palette = voxelPalette;
    this._map = new Map<string, number>(Object.entries(voxelPaletteMap));
  }
  static setVoxelNamePalette(
    nameToIdMap: Record<string, string>,
    idToNameMap: Record<string, string>
  ) {
    this._nameToIdMap = new Map<string, string>(Object.entries(nameToIdMap));
    this._idToNameMap = new Map<string, string>(Object.entries(idToNameMap));
  }
  static id = {
    stringFromNumber(id: number) {
      return VoxelPaletteReader._palette[id];
    },
    numberFromString(id: string) {
      return VoxelPaletteReader._map.get(id);
    },
    getPaletteId(voxelId: string) {
      const numericID = VoxelPaletteReader._map.get(voxelId);
      if (numericID == undefined) return -1;
      return numericID;
    },
    baseNumeric(id: number) {
      if (id < 2) return id;
      const vid = this.numberFromString(this.stringFromNumber(id));
      if (!vid) return -1;
      return vid;
    },
  };
  static name = {
    getId: (name: string) => {
      return this._nameToIdMap.get(name)!;
    },
    getName: (id: string) => {
      return this._idToNameMap.get(id)!;
    },
  };
}
