/**# Light Byte
 * ---
 * Used to decode light color info.
 */
export const LightByte = {
 _lightValues: <number[]>[],
 getS(value: number) {
  return (value & (0x0f << 0)) >> 0;
 },

 getR(value: number) {
  return (value & (0x0f << 4)) >> 4;
 },

 getG(value: number) {
  return (value & (0x0f << 8)) >> 8;
 },

 getB(value: number) {
  return (value & (0x0f << 12)) >> 12;
 },

 decodeLightFromVoxelData(voxelData: number) {
  return (voxelData & (0xffff << 0)) >> 0;
 },
 encodeLightIntoVoxelData(voxelData: number, encodedLight: number) {
  return (voxelData & ~(0xffff << 0)) | (encodedLight << 0);
 },
 /**# Set Light Values
  * ---
  * Give an array of light values it will return an encoded light number.
  * @param values
  */
 setLightValues(values: number[]) {
  let value = (0 & ~(0xf << 0)) | (values[0] << 0);
  value = (value & ~(0xf << 4)) | (values[1] << 4);
  value = (value & ~(0xf << 8)) | (values[2] << 8);
  value = (value & ~(0xf << 12)) | (values[3] << 12);
  return value;
 },
 /**# Get Light Values
  * ---
  * Given an encoded light number it will return an array of its values.
  * - 0: Sun Light
  * - 1: Red Light
  * - 2: Green Light
  * - 3: Blue Light
  * @param value
  */
 getLightValues(value: number) {
  this._lightValues[0] = (value & (0x0f << 0)) >> 0;
  this._lightValues[1] = (value & (0x0f << 4)) >> 4;
  this._lightValues[2] = (value & (0x0f << 8)) >> 8;
  this._lightValues[3] = (value & (0x0f << 12)) >> 12;
  return this._lightValues;
 },
 /**# Is Less Than For RGB Remove
  * ---
  * Compares values for the RGB encoded light values.
  * Used for RGB light remove.
  * @param n1
  * @param n2
  */
 isLessThanForRGBRemove(n1: number, n2: number) {
  let r1 = (n1 & (0x0f << 4)) >> 4;
  let g1 = (n1 & (0x0f << 8)) >> 8;
  let b1 = (n1 & (0x0f << 12)) >> 12;
  let r2 = (n2 & (0x0f << 4)) >> 4;
  let g2 = (n2 & (0x0f << 8)) >> 8;
  let b2 = (n2 & (0x0f << 12)) >> 12;
  return r1 < r2 || g1 < g2 || b1 < b2;
 },
 /**# Is Less Than For RGB Add
  * ---
  * Compares values for the RGB encoded light values.
  * Used for RGB light add.
  * @param n1
  * @param n2
  */
 isLessThanForRGBAdd(n1: number, n2: number) {
  let r1 = ((n1 & (0x0f << 4)) >> 4) + 2;
  let g1 = ((n1 & (0x0f << 8)) >> 8) + 2;
  let b1 = ((n1 & (0x0f << 12)) >> 12) + 2;
  let r2 = (n2 & (0x0f << 4)) >> 4;
  let g2 = (n2 & (0x0f << 8)) >> 8;
  let b2 = (n2 & (0x0f << 12)) >> 12;
  return r1 <= r2 || g1 <= g2 || b1 <= b2;
 },
 /**# Is Greater Or Equal Than For RGB Remove
  * ---
  * Compares values for the RGB encoded light values.
  * Used for RGB light remove.
  * @param n1
  * @param n2
  */
 isGreaterOrEqualThanForRGBRemove(n1: number, n2: number) {
  let r1 = (n1 & (0x0f << 4)) >> 4;
  let g1 = (n1 & (0x0f << 8)) >> 8;
  let b1 = (n1 & (0x0f << 12)) >> 12;
  let r2 = (n2 & (0x0f << 4)) >> 4;
  let g2 = (n2 & (0x0f << 8)) >> 8;
  let b2 = (n2 & (0x0f << 12)) >> 12;
  return r1 >= r2 || g1 >= g2 || b1 >= b2;
 },

 /**# Get Minus One For RGB
  * ---
  * Returns the RGB light values minus one.
  * @param sl - source light value
  */
 getMinusOneForRGB(sl: number) {
  let r = ((sl & (0x0f << 4)) >> 4) - 1;
  if (r < 0) r = 0;
  let g = ((sl & (0x0f << 8)) >> 8) - 1;
  if (g < 0) g = 0;
  let b = ((sl & (0x0f << 12)) >> 12) - 1;
  if (b < 0) b = 0;

  let bv = 0;
  bv = (bv & ~(0xf << 4)) | (r << 4);
  bv = (bv & ~(0xf << 8)) | (g << 8);
  bv = (bv & ~(0xf << 12)) | (b << 12);
  return bv;
 },

 /**# Remove RGB Light
  * ---
  * Removes all RGB light from an encoded light value.
  * @param sl - source light value
  */
 removeRGBLight(sl: number) {
  let bv = sl;
  bv = (bv & ~(0xf << 4)) | (0 << 4);
  bv = (bv & ~(0xf << 8)) | (0 << 8);
  bv = (bv & ~(0xf << 12)) | (0 << 12);
  return bv;
 },

 /**# Get Full Sun Light
  * --
  * Alters the encoded light number passed to it to give it full sun light.
  * @param sl - source light value
  */
 getFullSunLight(sl: number) {
  return sl | 0b1111;
 },

 /**# Is Less Than For Sun Add
  * ---
  * Used to calculate sun light addition.
  * Used to check all neighbors expect down.
  * @param n1
  * @param n2
  */
 isLessThanForSunAdd(n1: number, n2: number) {
  let sl1 = ((n1 & (0x0f << 0)) >> 0) + 2;
  let sl2 = (n2 & (0x0f << 0)) >> 0;
  return sl1 <= sl2;
 },
 /**# Is Less Than For Sun Add Down
  *
  * Used to calculate sun light addition.
  * Used to check only the down neighbor.
  * @param n1
  * @param n2
  */
 isLessThanForSunAddDown(n1: number, n2: number) {
  let sl1 = n1 & 0xf;
  let sl2 = n2 & 0xf;
  if (sl2 == 0xf) {
   return sl1 < sl2;
  }
  return sl1 + 2 < sl2;
 },
 isLessThanForSunAddUp(n1: number, n2: number) {
  let sl1 = n1 & 0xf;
  let sl2 = n2 & 0xf;
  if (sl1 == sl2) return false;
  if (sl2 == 0xf || sl1 == 0xf) return false;
  return sl1 + 2 < sl2;
 },
 /**# Get Sun Light For Under Voxel
  * ---
  * Gets the sun light value for sun light addition when setting the
  * down neighbor.
  * @param currentVoxel
  */
 getSunLightForUnderVoxel(currentVoxel: number) {
  let sl1 = currentVoxel & 0xf;
  if (sl1 == 0xf) {
   return (currentVoxel & 0x0) | 0xf;
  } else {
   return (currentVoxel & 0x0) | (sl1 - 1);
  }
 },
 /**# Get Minus One For Sun
  * ---
  * Returns the sun light level passed to it minus one.
  * Used for sun light addition on all neighbors expect the down one.
  * @param sl - source light value
  */
 getMinusOneForSun(sl: number) {
  let sun = ((sl & (0x0f << 0)) >> 0) - 2;
  if (sun < 0) sun = 0;
  return (sun & ~(0xf << 0)) | (sun << 0);
 },
 /**# Is Less Than For Sun Remove
  * ---
  * Compares two encoded light values sun light values.
  * Used for sun light removal.
  * @param n1
  * @param sl - source light value
  */
 isLessThanForSunRemove(n1: number, sl: number) {
  let s1 = (n1 & (0x0f << 0)) >> 0;
  let s2 = (sl & (0x0f << 0)) >> 0;
  return s1 < s2;
 },
 /**# Is Greater Or Equal Than For Sun Remove
  * ---
  * Compares two encoded light values sun light values.
  * Used for sun light removal.
  * @param n1
  * @param sl - source light value
  */
 isGreaterOrEqualThanForSunRemove(n1: number, sl: number) {
  let s1 = (n1 & (0x0f << 0)) >> 0;
  let s2 = (sl & (0x0f << 0)) >> 0;
  return s1 >= s2;
 },
 /**# Sun Light Compare For Down Sun Remove
  * ---
  * Compares two encoded light values sun light values.
  * Used for sun light removal in the downward direction only.
  * @param n1
  * @param sl - source light value
  */
 sunLightCompareForDownSunRemove(n1: number, sl: number) {
  let s2 = (sl & (0x0f << 0)) >> 0;
  if (s2 == 0b1111) return true;
  let s1 = (n1 & (0x0f << 0)) >> 0;
  return s1 < s2;
 },
 /**# Remove Sun Light
  * ---
  * Removes the sun light from a light encoded value.
  * @param sl - source light value
  */
 removeSunLight(sl: number) {
  return (sl & ~(0xf << 0)) | (0 << 0);
 },
};
