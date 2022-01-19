import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import type { Util } from "Global/Util.helper";
import { InfoByte } from "Global/Util/InfoByte";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export declare class ShapeHelper implements ShapeHelperInterface {
    util: Util;
    infoByte: InfoByte;
    constructor(util: Util);
    toLinearSpace(r: number, g: number, b: number, a: number): number[];
    lightMap: Record<number, number>;
    calculateFullColor(fullColors: number[], fullTemplate: Float32Array, startIndex: number): void;
    calculateAOColor(colors: number[], chunkAmbientOcculusion: Float32Array, startIndex: number): void;
}
