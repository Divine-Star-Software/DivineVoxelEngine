import { LocationData } from "voxelspaces";

export class LocationVisitedMap {
 _map: Map<string, boolean> = new Map();
 get size() {
  return this._map.size;
 }

 has(location: LocationData) {
  return this._map.has(location.toString());
 }
 add(location: LocationData) {
  this._map.set(location.toString(), true);
 }
 remove(location: LocationData) {
  this._map.delete(location.toString());
 }

 clear() {
  this._map.clear();
 }
}
