/**# Light Byte
 * ---
 * Used to decode light color info.
 */
export declare const LightByte: {
    getS(value: number): number;
    getR(value: number): number;
    getG(value: number): number;
    getB(value: number): number;
    decodeLightFromVoxelData(voxelData: number): number;
    encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    /**# Set Light Values
     * ---
     * Give an array of light values it will return an encoded light number.
     * @param values
     * @returns
     */
    setLightValues(values: number[]): number;
    /**# Get Light Values
     * ---
     * Given an encoded light number it will return an array of its values.
     * - 0: Sun Light
     * - 1: Red Light
     * - 2: Green Light
     * - 3: Blue Light
     * @param value
     * @returns
     */
    getLightValues(value: number): number[];
    /**# Is Less Than For RGB Remove
     * ---
     * Compares values for the RGB encoded light values.
     * Used for RGB light remove.
     * @param n1
     * @param n2
     * @returns
     */
    isLessThanForRGBRemove(n1: number, n2: number): boolean;
    /**# Is Less Than For RGB Add
     * ---
     * Compares values for the RGB encoded light values.
     * Used for RGB light add.
     * @param n1
     * @param n2
     * @returns
     */
    isLessThanForRGBAdd(n1: number, n2: number): boolean;
    /**# Is Greater Or Equal Than For RGB Remove
     * ---
     * Compares values for the RGB encoded light values.
     * Used for RGB light remove.
     * @param n1
     * @param n2
     * @returns
     */
    isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
    /**# Get Minus One For RGB
     * ---
     * Returns the RGB light values minus one.
     * @param sl
     * @returns
     */
    getMinusOneForRGB(sl: number): number;
    /**# Remove RGB Light
     * ---
     * Removes all RGB light from an encoded light value.
     * @param sl
     */
    removeRGBLight(sl: number): number;
    /**# Get Full Sun Light
     * --
     * Alters the encoded light number passed to it to give it full sun light.
     * @param sl
     * @returns
     */
    getFullSunLight(sl: number): number;
    /**# Is Less Than For Sun Add
     * ---
     * Used to calculate sun light addition.
     * Used to check all neighbors expect down.
     * @param n1
     * @param n2
     * @returns
     */
    isLessThanForSunAdd(n1: number, n2: number): boolean;
    /**# Is Less Than For Sun Add Down
     *
     * Used to calculate sun light addition.
     * Used to check only the down neighbor.
     * @param n1
     * @param n2
     * @returns
     */
    isLessThanForSunAddDown(n1: number, n2: number): boolean;
    /**# Get Sun Light For Under Voxel
     * ---
     * Gets the sun light value for sun light addition when setting the
     * down neighbor.
     * @param currentVoxel
     * @returns
     */
    getSunLightForUnderVoxel(currentVoxel: number): number;
    /**# Get Minus One For Sun
     * ---
     * Returns the sun light level passed to it minus one.
     * Used for sun light addition on all neighbors expect the down one.
     * @param sl
     * @returns
     */
    getMinusOneForSun(sl: number): number;
    /**# Is Less Than For Sun Remove
     * ---
     * Compares two encoded light values sun light values.
     * Used for sun light removal.
     * @param n1
     * @param sl
     * @returns
     */
    isLessThanForSunRemove(n1: number, sl: number): boolean;
    /**# Is Greater Or Equal Than For Sun Remove
     * ---
     * Compares two encoded light values sun light values.
     * Used for sun light removal.
     * @param n1
     * @param sl
     * @returns
     */
    isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
    /**# Sun Light Compare For Down Sun Remove
     * ---
     * Compares two encoded light values sun light values.
     * Used for sun light removal in the downward direction only.
     * @param n1
     * @param sl
     * @returns
     */
    sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
    /**# Remove Sun Light
     * ---
     * Removes the sun light from a light encoded value.
     * @param sl
     * @returns
     */
    removeSunLight(sl: number): number;
};
