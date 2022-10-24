import { Flat3DArray } from "../Util/Flat3DArray.js";
/**# HeightMapArray
 * ---
 * Used to read height map data.
 */
export const HeightMapArray = Object.create(Flat3DArray);
HeightMapArray.bounds = {
    x: 16,
    y: 2,
    z: 16,
};
