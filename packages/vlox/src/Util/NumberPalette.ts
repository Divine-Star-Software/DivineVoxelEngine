export class NumberPalette {
  private _count = 0;
  //map id to value
  _palette: number[] = [];
  //map value to id
  _map: Record<number, number> = {};

  get size() {
    return this._count;
  }

  constructor(inital?: ArrayLike<number>) {
    if (inital) {
      let length = inital.length;
      for (let i = 0; i < length; i++) {
        this.register(inital[i]);
      }
    }
  }

  register(value: number) {
    const id = this._count;
    this._palette[id] = value;
    this._map[value] = id;
    this._count++;
    return id;
  }

  get() {
    return this._palette;
  }
  getMap() {
    return this._map;
  }

  isRegistered(id: number) {
    return this._map[id] !== undefined;
  }

  getId(value: number) {
    return this._map[value];
  }
  getValue(id: number) {
    return this._palette[id];
  }
}
