export class VoxelShaderDataTool {
  _v = 0;
  _lightMask = 0xffff;
  _aoMask = 0xf;
  _animationMask = 0xfff;
  private _setLight(index: number, value: number) {
    return (
      (this._v & ~(this._lightMask << index)) |
      ((value & this._lightMask) << index)
    );
  }
  private _setAO(value: number) {
    const index = 16;
    return (
      (this._v & ~(this._aoMask << index)) | ((value & this._aoMask) << index)
    );
  }
  private _setAnimation(value: number) {
    const index = 20;
    return (
      (this._v & ~(this._animationMask << index)) |
      ((value & this._animationMask) << index)
    );
  }
  setLight(values: number) {
    this._v = 0;
    this._v = this._setLight(0, values);

    return this;
  }
  setAO(value: number) {
    this._v = this._setAO(value);
    return this;
  }
  setAnimation(value: number) {
    this._v = this._setAnimation(value);
    return this;
  }
  getValue() {
    return this._v;
  }
  createAttribute(light: number, ao: number, animation: number) {
    let value = 0;
    value =
      (value & ~(this._lightMask << 0)) | ((light & this._lightMask) << 0);
    value = (value & ~(this._aoMask << 16)) | ((ao & this._aoMask) << 16);
    value =
      (value & ~(this._animationMask << 20)) |
      ((animation & this._animationMask) << 20);
    return value;
  }
}
