import { Flat3DArray } from "./Flat3DArray.js";

/**# EntityFlat3dArray
 * ---
 * Used to read an entity 'chunk". 
 */
export const EntityFlat3dArray = <typeof Flat3DArray>Object.create(Flat3DArray);
EntityFlat3dArray.bounds = {
 x: 16,
 y: 2,
 z: 16,
};
