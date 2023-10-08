import { CompassDirectionNames } from "Math/Types/Math.types";

/**# Compass Directions
 * ---
 * Converts a 2D noramlized vector into a compass direction. 
 */
export const CompassDirections = {
 _map: <CompassDirectionNames[]>[
  "east",
  "north-east",
  "north",
  "north-west",
  "west",
  "south-west",
  "south",
  "south-east",
 ],

 getDirection(x: number, z: number) {
  return this._map[Math.round(Math.atan2(z, x) / ((2 * Math.PI) / 7) + 8) % 8];
 },
};
