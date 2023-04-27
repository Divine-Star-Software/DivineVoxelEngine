export class UtilMap<T, K> {
 _map = new Map<T, K>();
 constructor(data?: [id: T, value: K][]) {
  if (data) this.add(data);
 }
 set(id: T, value: K) {
  this._map.set(id, value);
 }
 get(id: T) {
  if (!this._map.has(id)) return undefined;
  return this._map.get(id)!;
 }
 add(data: [id: T, value: K][]) {
  data.forEach(([id, value]) => this._map.set(id, value));
 }

 has(id: T) {
  return this._map.has(id);
 }
 remove(id: T) {
  this._map.delete(id);
 }
}
