export class VisitedMap {
 _map: Map<string, boolean> = new Map();
 get size() {
  return this._map.size;
 }
 _getKey(x: number, y: number, z: number) {
  return `${x}_${y}_${z}`;
 }
 inMap(x: number, y: number, z: number) {
  return this._map.has(this._getKey(x, y, z));
 }
 add(x: number, y: number, z: number) {
  this._map.set(this._getKey(x, y, z), true);
 }
 remove(x: number, y: number, z: number) {
  this._map.delete(this._getKey(x, y, z));
 }
 clear() {
  this._map.clear();
 }
}
