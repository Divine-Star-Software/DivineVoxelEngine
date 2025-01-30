import { QuadUVData } from "../../Mesher/Geomtry/Geometry.types"
export type QuadVoxelGometryArgs = [
  //upp
  enabled: boolean,
  fliped: boolean,
  texture: number,
  rotation: number,
  transparent: boolean,
  doubleSided: boolean,
  uvs: QuadUVData
];

enum ArgIndexes {
  Enabled,
  Fliped,
  Texture,
  Rotation,
  Transparent,
  DoubleSided,
  UVs,
}

export class QuadVoxelGometryInputs {
  static ArgIndexes = ArgIndexes;
  static CreateArgs(): QuadVoxelGometryArgs {
    const args = [] as any as QuadVoxelGometryArgs;
    args[ArgIndexes.Enabled] = true;
    args[ArgIndexes.Fliped] = false;
    args[ArgIndexes.Texture] = 0;
    args[ArgIndexes.Rotation] = 0;
    args[ArgIndexes.Transparent] = false;
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
