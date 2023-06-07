import { CompassDirectionNames } from "Math/Types/Math.types";
/**# Compass Directions
 * ---
 * Converts a 2D noramlized vector into a compass direction.
 */
export declare const CompassDirections: {
    _map: CompassDirectionNames[];
    getDirection(x: number, z: number): CompassDirectionNames;
};
