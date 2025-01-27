import { WorldSpaces } from "../../../../World/WorldSpaces";

export class ColumnVisistedMap {
  _map = new Set<string>();
  get size() {
    return this._map.size;
  }
  _getKey(x: number, y: number, z: number) {
    return WorldSpaces.column.getKeyXYZ(x, y, z);
  }
  has(x: number, y: number, z: number) {
    return this._map.has(this._getKey(x, y, z));
  }
  add(x: number, y: number, z: number) {
    this._map.add(this._getKey(x, y, z));
  }
  remove(x: number, y: number, z: number) {
    this._map.delete(this._getKey(x, y, z));
  }
  clear() {
    this._map.clear();
  }
}
