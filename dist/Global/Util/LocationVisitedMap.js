export class LocationVisitedMap {
    _map = new Map();
    get size() {
        return this._map.size;
    }
    has(location) {
        return this._map.has(location.toString());
    }
    add(location) {
        this._map.set(location.toString(), true);
    }
    remove(location) {
        this._map.delete(location.toString());
    }
    clear() {
        this._map.clear();
    }
}
