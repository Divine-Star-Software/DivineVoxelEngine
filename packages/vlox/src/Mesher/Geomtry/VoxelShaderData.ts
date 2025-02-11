enum WindAffectedAnimStates {
  Panel = 1,
  CrossPanel = 2,
  Box = 3,
}
export class VoxelShaderData {
  static AnimationStates = {
    WindAffected: WindAffectedAnimStates,
  };
  static v = 0xffff + 0xf + 0xf
  static LightMask = 0xffff;
  static AOMask = 0b11;
  static AnimationMask = 0b11;
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

  static createAttribute(
    light: number,
    ao: number,
    ao2: number,
    ao3: number,
    ao4: number,
    animation: number
  ) {
    let value = 0>>>0;
  

    value |= (light & this.LightMask) << 0;
    value |= (ao & this.AOMask) << 16;
    value |= (ao2 & this.AOMask) << 18;
    value |= (ao3 & this.AOMask) << 20;
    value |= (ao4 & this.AOMask) << 22;
  //  value |= (animation & this.AnimationMask) << 24;

    return value >>> 0;
  }
}

const t = VoxelShaderData.createAttribute(0xffff,2,2,2,2,2);
console.log("SHADER TEST",t, t & VoxelShaderData.LightMask)