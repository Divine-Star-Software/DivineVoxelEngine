export class StringPalette {
  _count = 0;
  _palette: string[] = [];
  _map: Record<string, number> = {};

  register(string: string) {
    this._palette[this._count] = string;
    this._map[string] = this._count;
    this._count++;
  }

  get() {
    return this._palette;
  }
  getMap() {
    return this._map;
  }

  isRegistered(id: string) {
    return this._map[id] !== undefined;
  }

  getNumberId(id: string) {
    return this._map[id];
  }
  getStringId(id: number) {
    return this._palette[id];
  }
}
