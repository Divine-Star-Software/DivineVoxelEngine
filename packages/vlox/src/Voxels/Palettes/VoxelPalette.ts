import { StringPalette } from "../../Util/StringPalette";

export class VoxelPalette {
  static _nameToIdMap = new Map<string, string>();
  static _idToNameMap = new Map<string, string>();
  static ids: StringPalette;
  static loadIn(
    voxelPalette: string[],
    nameToIdMap: Record<string, string>,
    idToNameMap: Record<string, string>
  ) {
    this.ids = new StringPalette(voxelPalette);
    this._nameToIdMap = new Map<string, string>(Object.entries(nameToIdMap));
    this._idToNameMap = new Map<string, string>(Object.entries(idToNameMap));
  }
  static name = {
    getId: (name: string) => this._nameToIdMap.get(name)!,
    getName: (id: string) => this._idToNameMap.get(id)!,
  };
}
