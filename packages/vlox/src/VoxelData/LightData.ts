type AllLight = [s: number, r: number, g: number, b: number];

/**# Light Data
 * ---
 * Used to decode light color info.
 */
export const LightData = {
  SRS: 2,
  _lightValues: <AllLight>(new Uint16Array([0, 0, 0, 0]) as any),

  sumRGB(value: number) {
    return this.getR(value) + this.getG(value) + this.getB(value);
  },

  getS(value: number) {
    return value & 0xf;
  },
  getR(value: number) {
    return (value & (0xf << 4)) >> 4;
  },

  getG(value: number) {
    return (value & (0xf << 8)) >> 8;
  },

  getB(value: number) {
    return (value & (0xf << 12)) >> 12;
  },

  setS(value: number, sl: number) {
    return (sl & ~0xf) | value;
  },

  setR(value: number, sl: number) {
    return (sl & ~(0xf << 4)) | (value << 4);
  },

  setG(value: number, sl: number) {
    return (sl & ~(0xf << 8)) | (value << 8);
  },

  setB(value: number, sl: number) {
    return (sl & ~(0xf << 12)) | (value << 12);
  },

  removeS(sl: number) {
    return this.setS(0, sl);
  },

  hasRGBLight(sl: number) {
    if (sl <= 0) return false;
    if (this.getR(sl) > 0) return true;
    if (this.getG(sl) > 0) return true;
    if (this.getB(sl) > 0) return true;
    return false;
  },

  hasSunLight(sl: number) {
    if (sl <= 0) return false;
    if (this.getS(sl) > 0) return true;
    return false;
  },

  mixLight(l1: number, l2: number) {
    const s1 = this.getS(l1);
    const s2 = this.getS(l2);
    const s = s1 < s2 ? s2 : s1;
    const r1 = this.getR(l1);
    const r2 = this.getR(l2);
    const r = r1 < r2 ? r2 : r1;
    const g1 = this.getG(l1);
    const g2 = this.getG(l2);
    const g = g1 < g2 ? g2 : g1;
    const b1 = this.getB(l1);
    const b2 = this.getB(l2);
    const b = b1 < b2 ? b2 : b1;

    let nl = this.setS(s, 0);
    nl = this.setR(r, nl);
    nl = this.setG(g, nl);
    nl = this.setB(b, nl);
    return nl;
  },

  getRGB(sl: number) {
    if (sl < 0) return 0;
    return (sl & 0xfff0) >> 4;
  },

  setRGB(value: number, sl: number) {
    if (sl < 0) return 0;
    return (sl & ~0xfff0) | (value << 4);
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
  setLightValues(values: ArrayLike<number>) {
    let value = this.setS(values[0], 0);
    value = this.setR(values[1], value);
    value = this.setG(values[2], value);
    return this.setB(values[3], value);
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
    this._lightValues[0] = this.getS(value);
    this._lightValues[1] = this.getR(value);
    this._lightValues[2] = this.getG(value);
    this._lightValues[3] = this.getB(value);
    return this._lightValues;
  },
  getLightValuesToRef(value: number, values: AllLight) {
    values[0] = this.getS(value);
    values[1] = this.getR(value);
    values[2] = this.getG(value);
    values[3] = this.getB(value);
    return values;
  },
  /**# Is Less Than For RGB Remove
   * ---
   * Compares values for the RGB encoded light values.
   * Used for RGB light remove.
   * @param n1
   * @param n2
   */
  isLessThanForRGBRemove(n1: number, n2: number) {
    let r1 = this.getR(n1);
    let g1 = this.getG(n1);
    let b1 = this.getB(n1);
    let r2 = this.getR(n2);
    let g2 = this.getG(n2);
    let b2 = this.getB(n2);
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
    let r1 = this.getR(n1) + 2;
    let g1 = this.getG(n1) + 2;
    let b1 = this.getB(n1) + 2;
    let r2 = this.getR(n2);
    let g2 = this.getG(n2);
    let b2 = this.getB(n2);
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
    let r1 = this.getR(n1);
    let g1 = this.getG(n1);
    let b1 = this.getB(n1);
    let r2 = this.getR(n2);
    let g2 = this.getG(n2);
    let b2 = this.getB(n2);
    return r1 >= r2 || g1 >= g2 || b1 >= b2;
  },

  /**# Get Minus One For RGB
   * ---
   * Returns the RGB light values minus one.
   * @param sl - source light value
   */
  getMinusOneForRGB(sl: number, nl: number) {
    let s = this.getS(nl);

    let r = this.getR(sl) - 1;
    if (r < 0) r = 0;
    let rn = this.getR(nl);
    if (r < rn) {
      r = rn;
    }

    let g = this.getG(sl) - 1;
    if (g < 0) g = 0;
    let gn = this.getG(nl);
    if (g < gn) {
      g = gn;
    }

    let b = this.getB(sl) - 1;
    if (b < 0) b = 0;
    let bn = this.getB(nl);
    if (b < bn) {
      b = bn;
    }

    let bv = 0;
    bv = this.setS(s, bv);
    bv = this.setR(r, bv);
    bv = this.setG(g, bv);
    bv = this.setB(b, bv);
    return bv;
  },

  /**# Remove RGB Light
   * ---
   * Removes all RGB light from an encoded light value.
   * @param sl - source light value
   */
  removeRGBLight(sl: number) {
    let s = this.getS(sl);
    let bv = 0;
    bv = this.setR(0, bv);
    bv = this.setG(0, bv);
    bv = this.setB(0, bv);
    bv = this.setS(s, bv);
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
    let sl1 = this.getS(n1);
    let sl2 = this.getS(n2);

    return sl1 + this.SRS < sl2;
  },
  /**# Is Less Than For Sun AddDown
   *
   * Used to calculate sun light addition.
   * Used to check only the down neighbor.
   * @param n1
   * @param n2
   */
  isLessThanForSunAddDown(n1: number, n2: number) {
    let sl1 = this.getS(n1);
    let sl2 = this.getS(n2);
    if (sl2 == 0xf) {
      return sl1 < sl2;
    }
    return sl1 + this.SRS < sl2;
  },
  isLessThanForSunAddUp(n1: number, n2: number) {
    let sl1 = this.getS(n1);
    let sl2 = this.getS(n2);
    if (sl1 == sl2) return false;
    if (sl2 == 0xf || sl1 == 0xf) return false;
    return sl1 + this.SRS < sl2;
  },
  /**# Get Sun Light For Under Voxel
   * ---
   * Gets the sun light value for sun light addition when setting the
   * down neighbor.
   * @param currentVoxel
   */
  getSunLightForUnderVoxel(sl: number, nl: number) {
    let s = this.getS(sl);
    let sn = this.getS(nl);
    if (s == 15) {
      sn = s;
    }
    if (s < 15) {
      sn = s - this.SRS;
    }
    let r = this.getR(nl);
    let g = this.getG(nl);
    let b = this.getB(nl);
    let bv = 0;
    bv = this.setS(sn, bv);
    bv = this.setR(r, bv);
    bv = this.setG(g, bv);
    bv = this.setB(b, bv);
    return bv;
  },
  /**# Get Minus One For Sun
   * ---
   * Returns the sun light level passed to it minus one.
   * Used for sun light addition on all neighbors expect the down one.
   * @param sl - source light value
   */
  getMinusOneForSun(sl: number, nl: number) {
    let s = this.getS(sl) - this.SRS;
    if (s < 0) s = 0;
    let sn = this.getS(nl);
    if (s < sn) {
      s = sn;
    }
    let r = this.getR(nl);
    let g = this.getG(nl);
    let b = this.getB(nl);
    let bv = 0;
    bv = this.setS(s, bv);
    bv = this.setR(r, bv);
    bv = this.setG(g, bv);
    bv = this.setB(b, bv);
    return bv;
  },
  /**# Is Less Than For Sun Remove
   * ---
   * Compares two encoded light values sun light values.
   * Used for sun light removal.
   * @param n1
   * @param sl - source light value
   */
  isLessThanForSunRemove(n1: number, sl: number) {
    let s1 = this.getS(n1);
    let s2 = this.getS(sl);
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
    let s1 = this.getS(n1);
    let s2 = this.getS(sl);
    return s1 >= s2;
  },
  /**# Sun Light Compare ForDown Sun Remove
   * ---
   * Compares two encoded light values sun light values.
   * Used for sun light removal in the downward direction only.
   * @param n1
   * @param sl - source light value
   */
  sunLightCompareForDownSunRemove(n1: number, sl: number) {
    let s2 = this.getS(sl);
    if (s2 == 0xf) return true;
    let s1 = this.getS(n1);
    return s1 < s2;
  },
  /**# Remove Sun Light
   * ---
   * Removes the sun light from a light encoded value.
   * @param sl - source light value
   */
  removeSunLight(sl: number) {
    return this.removeS(sl);
  },

  minusOneForAll(sl: number) {
    let s = this.getS(sl) - this.SRS;
    let r = this.getR(sl) - 1;
    let g = this.getG(sl) - 1;
    let b = this.getB(sl) - 1;
    if (s < 0) s = 0;
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    if (b < 0) b = 0;
    let nl = this.setS(s, 0);
    nl = this.setR(r, nl);
    nl = this.setG(g, nl);
    nl = this.setB(b, nl);
    return nl;
  },

  addLightValues(sl: number, sl2: number) {
    this._lightValues[0] = this.getS(sl) + this.getS(sl2);

    this._lightValues[1] = this.getR(sl) + this.getR(sl2);
    this._lightValues[2] = this.getG(sl) + this.getG(sl2);
    this._lightValues[3] = this.getB(sl) + this.getB(sl2);
    if (this._lightValues[0] > 15) this._lightValues[0] = 15;
    if (this._lightValues[1] > 15) this._lightValues[1] = 15;
    if (this._lightValues[2] > 15) this._lightValues[2] = 15;
    if (this._lightValues[3] > 15) this._lightValues[3] = 15;
    return this.setLightValues(this._lightValues);
  },
  divideLightValue(sl: number, divisor: number) {
    this._lightValues[0] = Math.ceil(this.getS(sl) / divisor);
    this._lightValues[1] = Math.ceil(this.getR(sl) / divisor);
    this._lightValues[2] = Math.ceil(this.getG(sl) / divisor);
    this._lightValues[3] = Math.ceil(this.getB(sl) / divisor);
    return this.setLightValues(this._lightValues);
  },
};
