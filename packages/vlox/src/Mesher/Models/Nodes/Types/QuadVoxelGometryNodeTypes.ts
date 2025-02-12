import { Vec2Array, Vec3Array, Vec4Array } from "@amodx/math";
import { QuadUVData } from "../../../Geomtry/Geometry.types";
import { VoxelFaces } from "../../../../Math";
export type QuadVoxelGometryArgs = [
  //upp
  enabled: boolean,
  texture: number,
  rotation: number,
  doubleSided: boolean,
  uvs: QuadUVData,
];

enum ArgIndexes {
  Enabled,
  Texture,
  Rotation,
  DoubleSided,
  UVs,
}

export type CompiledQuadVoxelGeomtryNode = {
  type: "quad";
  positions: [Vec3Array, Vec3Array, Vec3Array, Vec3Array];
  weights: [Vec4Array, Vec4Array, Vec4Array, Vec4Array];
  closestFace: VoxelFaces;
  trueFaceIndex?: number;
};

export class QuadVoxelGometryInputs {
  static ArgIndexes = ArgIndexes;
  static CreateArgs(): QuadVoxelGometryArgs {
    const args = [] as any as QuadVoxelGometryArgs;
    args[ArgIndexes.Enabled] = true;
    args[ArgIndexes.Texture] = 0;
    args[ArgIndexes.Rotation] = 0;
    args[ArgIndexes.DoubleSided] = false;
    args[ArgIndexes.UVs] = [
      [1, 1],
      [0, 1],
      [0, 0],
      [1, 0],
    ];
    return args;
  }
}
