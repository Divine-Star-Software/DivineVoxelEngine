export class ObjectMap<K extends string, V extends any> {
  private _values: Record<string, any> = {};

  size = 0;

  constructor(values?: Record<K, V>) {
    if (values) {
      this._values = values;
      this.size = Object.keys(values).length;
    }
  }

  set(key: K, value: V) {
    if (!this._values[key]) {
      this.size++;
    }
    this._values[key] = value;

    return this;
  }

  delete(key: K) {
    if (this._values[key]) {
      this.size--;
    }
    delete this._values[key];

    return this;
  }

  get(key: K): V | undefined {
    const value = this._values[key];
    if (!value) return undefined;
    return value;
  }

  has(key: K) {
    return this._values[key] !== undefined;
  }

  map<T>(run: (value: V) => T): T[] {
    const nodes: T[] = [];
    for (const key in this._values) {
      const value = this._values[key];
      nodes.push(run(value));
    }
    return nodes;
  }

  forEach(run: (value: V) => void) {
    for (const key in this._values) {
      const value = this._values[key];
      run(value);
    }
    return this;
  }

  filterInPlace(run: (value: V) => boolean) {
    for (const key in this._values) {
      const value = this._values[key];
      if (!run(value)) {
        this.delete(key as K);
      }
    }
    return this;
  }

  push(...data: (V & { id: K })[]) {
    data.forEach((_) => this.set(_.id, _));
  }

  clone(deep = false) {
    const newMap = new ObjectMap();
    if (deep) {
      newMap._values = this.toJSON();
    }
    if (!deep) {
      newMap._values = this._values;
    }
    newMap.size = this.size;
    return newMap;
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this._values));
  }

  getAsArray() {
    const items: V[] = [];
    this.forEach((v) => items.push(v));
    return items;
  }

  clear() {
    this._values = {};
    this.size = 0;
    return this;
  }
}
