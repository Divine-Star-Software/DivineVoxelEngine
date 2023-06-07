/**# Compass Directions
 * ---
 * Converts a 2D noramlized vector into a compass direction.
 */
export const CompassDirections = {
    _map: [
        "east",
        "north-east",
        "north",
        "north-west",
        "west",
        "south-west",
        "south",
        "south-east",
    ],
    getDirection(x, z) {
        return this._map[Math.round(Math.atan2(z, x) / ((2 * Math.PI) / 7) + 8) % 8];
    },
};
