import { StringPalette } from "../../Interfaces/Data/StringPalette";

export class VoxelPalette {
  static _nameToIdMap = new Map<string, string>();
  static _idToNameMap = new Map<string, string>();
  static ids = new StringPalette();
  static setVoxelIdPalette(
    voxelPalette: string[],
    voxelPaletteMap: Record<string, number>
  ) {
    this.ids._map = voxelPaletteMap;
    this.ids._palette = voxelPalette;
  }
  static setVoxelNamePalette(
    nameToIdMap: Record<string, string>,
    idToNameMap: Record<string, string>
  ) {
    this._nameToIdMap = new Map<string, string>(Object.entries(nameToIdMap));
    this._idToNameMap = new Map<string, string>(Object.entries(idToNameMap));
  }
  static name = {
    getId: (name: string) => {
      return this._nameToIdMap.get(name)!;
    },
    getName: (id: string) => {
      return this._idToNameMap.get(id)!;
    },
  };
}
