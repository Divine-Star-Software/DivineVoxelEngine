export class StringPalette {
  private _count = 0;
  _palette: string[] = [];
  _map: Record<string, number> = {};

  constructor(inital?: ArrayLike<string>) {
    if (inital) {
      const length = inital.length;
      for (let i = 0; i < length; i++) {
        this.register(inital[i]);
      }
    }
  }
  get size() {
    return this._count;
  }

  register(string: string) {
    const id = this._count;
    this._count++;
    this._palette[id] = string;
    this._map[string] = id;
    return id;
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
