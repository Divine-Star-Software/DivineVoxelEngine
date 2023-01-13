/**# Light Byte
 * ---
 * Used to decode light color info.
 */
export declare const LightData: {
    SRS: number;
    _lightValues: [s: number, r: number, g: number, b: number];
    getS(value: number): number;
    getR(value: number): number;
    getG(value: number): number;
    getB(value: number): number;
    setS(value: number, sl: number): number;
    setR(value: number, sl: number): number;
    setG(value: number, sl: number): number;
    setB(value: number, sl: number): number;
    removeS(sl: number): number;
    hasRGBLight(sl: number): boolean;
    hasSunLight(sl: number): boolean;
    mixLight(l1: number, l2: number): number;
    getRGB(sl: number): number;
    setRGB(value: number, sl: number): number;
    decodeLightFromVoxelData(voxelData: number): number;
    encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    /**# Set Light Values
     * ---
     * Give an array of light values it will return an encoded light number.
     * @param values
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
     */
    getLightValues(value: number): [s: number, r: number, g: number, b: number];
    /**# Is Less Than For RGB Remove
     * ---
     * Compares values for the RGB encoded light values.
     * Used for RGB light remove.
     * @param n1
     * @param n2
     */
    isLessThanForRGBRemove(n1: number, n2: number): boolean;
    /**# Is Less Than For RGB Add
     * ---
     * Compares values for the RGB encoded light values.
     * Used for RGB light add.
     * @param n1
     * @param n2
     */
    isLessThanForRGBAdd(n1: number, n2: number): boolean;
    /**# Is Greater Or Equal Than For RGB Remove
     * ---
     * Compares values for the RGB encoded light values.
     * Used for RGB light remove.
     * @param n1
     * @param n2
     */
    isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
    /**# Get Minus One For RGB
     * ---
     * Returns the RGB light values minus one.
     * @param sl - source light value
     */
    getMinusOneForRGB(sl: number, nl: number): number;
    /**# Remove RGB Light
     * ---
     * Removes all RGB light from an encoded light value.
     * @param sl - source light value
     */
    removeRGBLight(sl: number): number;
    /**# Get Full Sun Light
     * --
     * Alters the encoded light number passed to it to give it full sun light.
     * @param sl - source light value
     */
    getFullSunLight(sl: number): number;
    /**# Is Less Than For Sun Add
     * ---
     * Used to calculate sun light addition.
     * Used to check all neighbors expect down.
     * @param n1
     * @param n2
     */
    isLessThanForSunAdd(n1: number, n2: number): boolean;
    /**# Is Less Than For Sun Add Down
     *
     * Used to calculate sun light addition.
     * Used to check only the down neighbor.
     * @param n1
     * @param n2
     */
    isLessThanForSunAddDown(n1: number, n2: number): boolean;
    isLessThanForSunAddUp(n1: number, n2: number): boolean;
    /**# Get Sun Light For Under Voxel
     * ---
     * Gets the sun light value for sun light addition when setting the
     * down neighbor.
     * @param currentVoxel
     */
    getSunLightForUnderVoxel(sl: number, nl: number): number;
    /**# Get Minus One For Sun
     * ---
     * Returns the sun light level passed to it minus one.
     * Used for sun light addition on all neighbors expect the down one.
     * @param sl - source light value
     */
    getMinusOneForSun(sl: number, nl: number): number;
    /**# Is Less Than For Sun Remove
     * ---
     * Compares two encoded light values sun light values.
     * Used for sun light removal.
     * @param n1
     * @param sl - source light value
     */
    isLessThanForSunRemove(n1: number, sl: number): boolean;
    /**# Is Greater Or Equal Than For Sun Remove
     * ---
     * Compares two encoded light values sun light values.
     * Used for sun light removal.
     * @param n1
     * @param sl - source light value
     */
    isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
    /**# Sun Light Compare For Down Sun Remove
     * ---
     * Compares two encoded light values sun light values.
     * Used for sun light removal in the downward direction only.
     * @param n1
     * @param sl - source light value
     */
    sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
    /**# Remove Sun Light
     * ---
     * Removes the sun light from a light encoded value.
     * @param sl - source light value
     */
    removeSunLight(sl: number): number;
    minusOneForAll(sl: number): number;
};
