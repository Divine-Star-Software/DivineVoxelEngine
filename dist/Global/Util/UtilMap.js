export class UtilMap {
    _map = new Map();
    constructor(data) {
        if (data)
            this.add(data);
    }
    set(id, value) {
        this._map.set(id, value);
    }
    get(id) {
        if (!this._map.has(id))
            return undefined;
        return this._map.get(id);
    }
    add(data) {
        data.forEach(([id, value]) => this._map.set(id, value));
    }
    has(id) {
        return this._map.has(id);
    }
    remove(id) {
        this._map.delete(id);
    }
}
