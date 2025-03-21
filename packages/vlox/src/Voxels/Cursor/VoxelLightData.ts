type AllLight = [s: number, r: number, g: number, b: number];

/**# Light Data
 * ---
 * Used to decode light color info.
 */
export class VoxelLightData {
  /**The rate at which sun light falls off. RGB light falls off at a default of 1 and sun has a default of 2. */
  static SunFallOffValue = 2;
  _lightValues: AllLight = [0, 0, 0, 0];

  sumRGB(value: number) {
    return this.getR(value) + this.getG(value) + this.getB(value);
  }

  getS(value: number) {
    return value & 0xf;
  }
  getR(value: number) {
    return (value & (0xf << 4)) >> 4;
  }

  getG(value: number) {
    return (value & (0xf << 8)) >> 8;
  }

  getB(value: number) {
    return (value & (0xf << 12)) >> 12;
  }

  setS(value: number, sl: number) {
    return (sl & ~0xf) | value;
  }

  setR(value: number, sl: number) {
    return (sl & ~(0xf << 4)) | (value << 4);
  }

  setG(value: number, sl: number) {
    return (sl & ~(0xf << 8)) | (value << 8);
  }

  setB(value: number, sl: number) {
    return (sl & ~(0xf << 12)) | (value << 12);
  }

  removeS(sl: number) {
    return this.setS(0, sl);
  }

  hasRGBLight(sl: number) {
    if (sl <= 0) return false;
    if (this.getR(sl) > 0) return true;
    if (this.getG(sl) > 0) return true;
    if (this.getB(sl) > 0) return true;
    return false;
  }

  hasSunLight(sl: number) {
    if (sl <= 0) return false;
    if (this.getS(sl) > 0) return true;
    return false;
  }

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
  }

  getRGB(sl: number) {
    if (sl < 0) return 0;
    return (sl & 0xfff0) >> 4;
  }

  setRGB(value: number, sl: number) {
    if (sl < 0) return 0;
    return (sl & ~0xfff0) | (value << 4);
  }
  createLightValue(s: number, r: number, g: number, b: number) {
    let v = 0;
    v = this.setS(s, v);
    v = this.setR(r, v);
    v = this.setG(r, v);
    return this.setB(r, v);
  }

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
  }
  /**# Get Light Values
   * ---
   * Given an encoded light number it will return an array of its values.
   * - 0: Sun Light
   * - 1: Red Light
   * - 2: Green Light
   * - 3: Blue Light
   * @param value
   */
  getLightValuesArray(value: number) {
    this._lightValues[0] = this.getS(value);
    this._lightValues[1] = this.getR(value);
    this._lightValues[2] = this.getG(value);
    this._lightValues[3] = this.getB(value);
    return this._lightValues;
  }
  getLightValuesArrayToRef(value: number, values: AllLight) {
    values[0] = this.getS(value);
    values[1] = this.getR(value);
    values[2] = this.getG(value);
    values[3] = this.getB(value);
    return values;
  }

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
  }
  divideLightValue(sl: number, divisor: number) {
    this._lightValues[0] = Math.ceil(this.getS(sl) / divisor);
    this._lightValues[1] = Math.ceil(this.getR(sl) / divisor);
    this._lightValues[2] = Math.ceil(this.getG(sl) / divisor);
    this._lightValues[3] = Math.ceil(this.getB(sl) / divisor);
    return this.setLightValues(this._lightValues);
  }
}
