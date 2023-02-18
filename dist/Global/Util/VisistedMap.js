export class VisitedMap {
    _map = new Map();
    get size() {
        return this._map.size;
    }
    _getKey(x, y, z) {
        return `${x}_${y}_${z}`;
    }
    inMap(x, y, z) {
        return this._map.has(this._getKey(x, y, z));
    }
    add(x, y, z) {
        this._map.set(this._getKey(x, y, z), true);
    }
    remove(x, y, z) {
        this._map.delete(this._getKey(x, y, z));
    }
    removeDiffernce(map) {
        for (const [key] of map._map) {
            if (this._map.has(key)) {
                this._map.delete(key);
            }
        }
        return map;
    }
    clear() {
        this._map.clear();
    }
}
