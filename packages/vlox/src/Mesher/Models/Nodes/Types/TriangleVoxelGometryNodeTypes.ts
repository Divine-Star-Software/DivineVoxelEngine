import { Vec2Array, Vec3Array, Vec4Array } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";
export type TriangleVoxelGometryArgs = [
  //upp
  enabled: boolean,
  texture: number,
  rotation: number,
  doubleSided: boolean,
  uvs: [v1: Vec2Array, v2: Vec2Array, v3: Vec2Array],
];

enum ArgIndexes {
  Enabled,
  Texture,
  Rotation,
  DoubleSided,
  UVs,
}
export type CompiledTriangleVoxelGeomtryNode = {
  type: "triangle";
  positions: [Vec3Array, Vec3Array, Vec3Array];
  weights: [Vec4Array, Vec4Array, Vec4Array];
  closestFace: VoxelFaces;
  trueFaceIndex?: number;
};

export class TriangleVoxelGometryInputs {
  static ArgIndexes = ArgIndexes;
  static CreateArgs(): TriangleVoxelGometryArgs {
    const args = [] as any as TriangleVoxelGometryArgs;
    args[ArgIndexes.Enabled] = true;
    args[ArgIndexes.Texture] = 0;
    args[ArgIndexes.Rotation] = 0;
    args[ArgIndexes.DoubleSided] = false;
    args[ArgIndexes.UVs] = [
      [1, 1],
      [0, 1],
      [0, 0],
    ];
    return args;
  }
}
