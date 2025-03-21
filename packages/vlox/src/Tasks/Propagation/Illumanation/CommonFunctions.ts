function getS(value: number) {
  return value & 0xf;
}
function getR(value: number) {
  return (value & (0xf << 4)) >> 4;
}

function getG(value: number) {
  return (value & (0xf << 8)) >> 8;
}

function getB(value: number) {
  return (value & (0xf << 12)) >> 12;
}

function setS(value: number, sl: number) {
  return (sl & ~0xf) | value;
}

function setR(value: number, sl: number) {
  return (sl & ~(0xf << 4)) | (value << 4);
}

function setG(value: number, sl: number) {
  return (sl & ~(0xf << 8)) | (value << 8);
}

function setB(value: number, sl: number) {
  return (sl & ~(0xf << 12)) | (value << 12);
}
/**# Is Less Than For RGB Remove
 * ---
 * Compares values for the RGB encoded light values.
 * Used for RGB light remove.
 * @param n1
 * @param n2
 */
export function isLessThanForRGBRemove(n1: number, n2: number) {
  let r1 = getR(n1);
  let g1 = getG(n1);
  let b1 = getB(n1);
  let r2 = getR(n2);
  let g2 = getG(n2);
  let b2 = getB(n2);
  return r1 < r2 || g1 < g2 || b1 < b2;
}
/**# Is Less Than For RGB Add
 * ---
 * Compares values for the RGB encoded light values.
 * Used for RGB light add.
 * @param n1
 * @param n2
 */
export function isLessThanForRGBAdd(n1: number, n2: number) {
  let r1 = getR(n1) + 2;
  let g1 = getG(n1) + 2;
  let b1 = getB(n1) + 2;
  let r2 = getR(n2);
  let g2 = getG(n2);
  let b2 = getB(n2);
  return r1 <= r2 || g1 <= g2 || b1 <= b2;
}
/**# Is Greater Or Equal Than For RGB Remove
 * ---
 * Compares values for the RGB encoded light values.
 * Used for RGB light remove.
 * @param n1
 * @param n2
 */
export function isGreaterOrEqualThanForRGBRemove(n1: number, n2: number) {
  let r1 = getR(n1);
  let g1 = getG(n1);
  let b1 = getB(n1);
  let r2 = getR(n2);
  let g2 = getG(n2);
  let b2 = getB(n2);
  return r1 >= r2 || g1 >= g2 || b1 >= b2;
}

/**# Get Minus One For RGB
 * ---
 * Returns the RGB light values minus one.
 * @param sl - source light value
 */
export function getMinusOneForRGB(sl: number, nl: number) {
  let s = getS(nl);

  let r = getR(sl) - 1;
  if (r < 0) r = 0;
  let rn = getR(nl);
  if (r < rn) {
    r = rn;
  }

  let g = getG(sl) - 1;
  if (g < 0) g = 0;
  let gn = getG(nl);
  if (g < gn) {
    g = gn;
  }

  let b = getB(sl) - 1;
  if (b < 0) b = 0;
  let bn = getB(nl);
  if (b < bn) {
    b = bn;
  }

  let bv = 0;
  bv = setS(s, bv);
  bv = setR(r, bv);
  bv = setG(g, bv);
  bv = setB(b, bv);
  return bv;
}

/**# Remove RGB Light
 * ---
 * Removes all RGB light from an encoded light value.
 * @param sl - source light value
 */
export function removeRGBLight(sl: number) {
  let s = getS(sl);
  let bv = 0;
  bv = setR(0, bv);
  bv = setG(0, bv);
  bv = setB(0, bv);
  bv = setS(s, bv);
  return bv;
}

/**# Get Full Sun Light
 * --
 * Alters the encoded light number passed to it to give it full sun light.
 * @param sl - source light value
 */
export function getFullSunLight(sl: number) {
  return sl | 0b1111;
}

/**# Is Less Than For Sun Add
 * ---
 * Used to calculate sun light addition.
 * Used to check all neighbors expect down.
 * @param n1
 * @param n2
 */
export function isLessThanForSunAdd(n1: number, n2: number, SRS: number) {
  let sl1 = getS(n1);
  let sl2 = getS(n2);

  return sl1 + SRS < sl2;
}
/**# Is Less Than For Sun AddDown
 *
 * Used to calculate sun light addition.
 * Used to check only the down neighbor.
 * @param n1
 * @param n2
 */
export function isLessThanForSunAddDown(n1: number, n2: number, SRS: number) {
  let sl1 = getS(n1);
  let sl2 = getS(n2);
  if (sl2 == 0xf) {
    return sl1 < sl2;
  }
  return sl1 + SRS < sl2;
}

export function isLessThanForSunAddUp(n1: number, n2: number, SRS: number) {
  let sl1 = getS(n1);
  let sl2 = getS(n2);
  if (sl1 == sl2) return false;
  if (sl2 == 0xf || sl1 == 0xf) return false;
  return sl1 + SRS < sl2;
}
/**# Get Sun Light For Under Voxel
 * ---
 * Gets the sun light value for sun light addition when setting the
 * down neighbor.
 * @param currentVoxel
 */
export function getSunLightForUnderVoxel(sl: number, nl: number, SRS: number) {
  let s = getS(sl);
  let sn = getS(nl);
  if (s == 15) {
    sn = s;
  }
  if (s < 15) {
    sn = s - SRS;
  }
  let r = getR(nl);
  let g = getG(nl);
  let b = getB(nl);
  let bv = 0;
  bv = setS(sn, bv);
  bv = setR(r, bv);
  bv = setG(g, bv);
  bv = setB(b, bv);
  return bv;
}
/**# Get Minus One For Sun
 * ---
 * Returns the sun light level passed to it minus one.
 * Used for sun light addition on all neighbors expect the down one.
 * @param sl - source light value
 */
export function getMinusOneForSun(sl: number, nl: number, SRS: number) {
  let s = getS(sl) - SRS;
  if (s < 0) s = 0;
  let sn = getS(nl);
  if (s < sn) {
    s = sn;
  }
  let r = getR(nl);
  let g = getG(nl);
  let b = getB(nl);
  let bv = 0;
  bv = setS(s, bv);
  bv = setR(r, bv);
  bv = setG(g, bv);
  bv = setB(b, bv);
  return bv;
}
/**# Is Less Than For Sun Remove
 * ---
 * Compares two encoded light values sun light values.
 * Used for sun light removal.
 * @param n1
 * @param sl - source light value
 */
export function isLessThanForSunRemove(n1: number, sl: number) {
  let s1 = getS(n1);
  let s2 = getS(sl);
  return s1 < s2;
}
/**# Is Greater Or Equal Than For Sun Remove
 * ---
 * Compares two encoded light values sun light values.
 * Used for sun light removal.
 * @param n1
 * @param sl - source light value
 */
export function isGreaterOrEqualThanForSunRemove(n1: number, sl: number) {
  let s1 = getS(n1);
  let s2 = getS(sl);
  return s1 >= s2;
}
/**# Sun Light Compare ForDown Sun Remove
 * ---
 * Compares two encoded light values sun light values.
 * Used for sun light removal in the downward direction only.
 * @param n1
 * @param sl - source light value
 */
export function sunLightCompareForDownSunRemove(n1: number, sl: number) {
  let s2 = getS(sl);
  if (s2 == 0xf) return true;
  let s1 = getS(n1);
  return s1 < s2;
}
/**# Remove Sun Light
 * ---
 * Removes the sun light from a light encoded value.
 * @param sl - source light value
 */
export function removeSunLight(sl: number) {
  return setS(0, sl);
}

export function minusOneForAll(sl: number, SRS: number) {
  let s = getS(sl) - SRS;
  let r = getR(sl) - 1;
  let g = getG(sl) - 1;
  let b = getB(sl) - 1;
  if (s < 0) s = 0;
  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;
  let nl = setS(s, 0);
  nl = setR(r, nl);
  nl = setG(g, nl);
  nl = setB(b, nl);
  return nl;
}
