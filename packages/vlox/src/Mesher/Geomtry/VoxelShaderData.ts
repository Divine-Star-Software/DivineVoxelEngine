import { Vector4Like } from "@amodx/math";

enum WindAffectedAnimStates {
  Panel = 1,
  CrossPanel = 2,
  Box = 3,
}
export class VoxelShaderData {
  static AnimationStates = {
    WindAffected: WindAffectedAnimStates,
  };
  static v = 0xffff + 0xf + 0xf;
  static LightMask = 0xffff;
  static AOMask = 0b11;
  static VertexMask = 0b11;
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



  static create(
    light1: number,
    light2: number,
    light3: number,
    light4: number,
    ao1: number,
    ao2: number,
    ao3: number,
    ao4: number,
    animation: number,
    vertexIndex: number,
    ref = Vector4Like.Create()
  ) {
    let x = 0;
    x |= (light1 & this.LightMask) << 0;
    x |= (ao1 & this.AOMask) << 16;
    x |= (ao2 & this.AOMask) << 18;
    x |= (ao3 & this.AOMask) << 20;
    x |= (ao4 & this.AOMask) << 22;
    ref.x = x;
    let y = 0;
    y |= (light2 & this.LightMask) << 0;
    y |= (animation & this.AnimationMask) << 16;
    ref.y = y;
    let z = 0;
    z |= (light3 & this.LightMask) << 0;
    z |= (vertexIndex & this.VertexMask) << 16;
    ref.z = z;
    let w = 0;
    w |= (light4 & this.LightMask) << 0;
    ref.w = w;
 
    return ref;
  }
}

