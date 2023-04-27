export class VoxelShaderDataTool {
 _v = 0;
 _lightMask = 0xffff;
 _aoMask = 0b11;
 _animationMask = 0b1111_1111_1111_11;
 _setLight(index: number, value: number) {
  return (
   (this._v & ~(this._lightMask << index)) |
   ((value & this._lightMask) << index)
  );
 }
 _setAO(value: number) {
  const index = 16;
  return (
   (this._v & ~(this._aoMask << index)) | ((value & this._aoMask) << index)
  );
 }
 _setAnimation(value: number) {
  const index = 18;
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
}
