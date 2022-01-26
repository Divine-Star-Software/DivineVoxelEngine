/**# Light Byte
 * ---
 * Used to decode light color info.
 */
export declare class LightByte {
    setLightValues(values: number[]): number;
    getLightValues(value: number): number[];
    calculateRGBSetLight(n1: number, n2: number, n3: number, n4: number, n5: number, n6: number): number;
    calculateRGBUpdateLight(l1: number, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number): number;
    calculateVertexLight(block: number, air: number, n1: number, n2: number, n3: number): void;
    isLessThanForRGBRemove(n1: number, n2: number): boolean;
    isLessThanForRGBAdd(n1: number, n2: number): boolean;
    isGreaterOrEqualThan(n1: number, n2: number): boolean;
    getMinusOneForRGB(sl: number): number;
    getFullSunLight(sl: number): number;
    isLessThanForSunAdd(n1: number, n2: number): boolean;
    getSunLightForUnderVoxel(currentVoxel: number): number;
    getMinusOneForSun(sl: number): number;
}
