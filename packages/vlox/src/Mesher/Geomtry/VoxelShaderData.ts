enum WindAffectedAnimStates {
  Panel = 1,
  CrossPanel = 2,
  Box = 3,
}
export class VoxelShaderData {
  static AnimationStates = {
    WindAffected: WindAffectedAnimStates,
  };

  static LightMask = 0xffff;
  static AOMask = 0xf;
  static AnimationMask = 0xfff;
  static TextureIndexMax = 0xffff;

  static createTextureIndex(index1: number, index2: number) {
    let value = 0;
    value =
      (value & ~(this.TextureIndexMax << 0)) |
      ((index1 & this.TextureIndexMax) << 0);
    value =
      (value & ~(this.TextureIndexMax << 16)) |
      ((index2 & this.TextureIndexMax) << 16);
    return value;
  }

  static createAttribute(light: number, ao: number, animation: number) {
    let value = 0;
    value = (value & ~(this.LightMask << 0)) | ((light & this.LightMask) << 0);
    value = (value & ~(this.AOMask << 16)) | ((ao & this.AOMask) << 16);
    value =
      (value & ~(this.AnimationMask << 20)) |
      ((animation & this.AnimationMask) << 20);
    return value;
  }
}
