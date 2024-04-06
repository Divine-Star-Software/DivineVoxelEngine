export class ArrayMap<T, K> {
  private _map = new Map<T, K>();
  private _keys: T[] = [];

  constructor(data?: [T, K][]) {
    if (data) {
      this.add(data);
    }
  }

  set(id: T, value: K) {
    if (!this._map.has(id)) {
      this._keys.push(id);
    }
    this._map.set(id, value);
  }

  get(id: T): K | undefined {
    return this._map.get(id);
  }

  add(data: [T, K][]) {
    data.forEach(([id, value]) => this.set(id, value));
  }

  has(id: T): boolean {
    return this._map.has(id);
  }

  delete(id: T) {
    if (this._map.delete(id)) {
      const index = this._keys.indexOf(id);
      if (index > -1) {
        this._keys.splice(index, 1);
      }
    }
  }

  at(index: number): [T, K] | undefined {
    const key = this._keys[index];
    if (key !== undefined) {
      return [key, this._map.get(key)!];
    }
    return undefined;
  }

  push(id: T, value: K) {
    this.set(id, value);
  }

  pop(): [T, K] | undefined {
    const key = this._keys.pop();
    if (key !== undefined) {
      const value = this._map.get(key)!;
      this._map.delete(key);
      return [key, value];
    }
    return undefined;
  }

  shift(): [T, K] | undefined {
    const key = this._keys.shift();
    if (key !== undefined) {
      const value = this._map.get(key)!;
      this._map.delete(key);
      return [key, value];
    }
    return undefined;
  }

  unshift(id: T, value: K): number {
    if (!this._map.has(id)) {
      this._keys.unshift(id);
      this._map.set(id, value);
      return this._keys.length;
    }
    return -1;
  }

  indexOf(id: T): number {
    return this._keys.indexOf(id);
  }

  get length(): number {
    return this._map.size;
  }

  forEach(callback: (value: K, key: T, map: Map<T, K>) => void) {
    this._keys.forEach((key) => {
      callback(this._map.get(key)!, key, this._map);
    });
  }

  map<U>(callback: (value: K, key: T, map: Map<T, K>) => U): U[] {
    return this._keys.map((key) =>
      callback(this._map.get(key)!, key, this._map)
    );
  }

  filter(
    predicate: (value: K, key: T, map: Map<T, K>) => boolean
  ): ArrayMap<T, K> {
    const filteredMap = new ArrayMap<T, K>();
    this._keys.forEach((key) => {
      const value = this._map.get(key)!;
      if (predicate(value, key, this._map)) {
        filteredMap.set(key, value);
      }
    });
    return filteredMap;
  }

  reduce<U>(
    callback: (accumulator: U, value: K, key: T, map: Map<T, K>) => U,
    initialValue: U
  ): U {
    return this._keys.reduce(
      (acc, key) => callback(acc, this._map.get(key)!, key, this._map),
      initialValue
    );
  }

  sort(compareFunction?: (a: [T, K], b: [T, K]) => number): ArrayMap<T, K> {
    this._keys.sort((a, b) => {
      const aValue = this._map.get(a)!;
      const bValue = this._map.get(b)!;
      return compareFunction ? compareFunction([a, aValue], [b, bValue]) : 0;
    });
    return this;
  }
}
