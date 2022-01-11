import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import type { Util } from "Global/Util.helper";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export declare class ShapeHelper implements ShapeHelperInterface {
    util: Util;
    constructor(util: Util);
    toLinearSpace(r: number, g: number, b: number, a: number): number[];
    calculateAOColor(colors: number[], chunkAmbientOcculusion: Float32Array, startIndex: number): void;
}
