/*
UV packing 

0xffff 2x
[startX startY]

0xffff 2x
[LengthX lengthY]

0xffff 2x
[dominatorX dominatorY]
*/

export const EntityShaderTool = {
  _uvMask: 0xffff,
  _setValue(source: number, value: number, mask: number, index: number) {
    return (source & ~(mask << index)) | ((value & mask) << index);
  },
  setUV(u: number, v: number) {
    return this._setValue(
      this._setValue(0, u, this._uvMask, 0),
      v,
      this._uvMask,
      15
    );
  },
  getUV(source: number) {
    return [~(this._uvMask << 15) & source, (source >> 15) & this._uvMask];
  },
};
