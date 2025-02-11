import { VoxelFaces } from "../../../Math";
import { QuadUVData } from "../../../Mesher/Geomtry/Geometry.types"
export type BoxFaceArags = [
  //upp
  enabled: boolean,
  Fliped: boolean,
  texture: number,
  rotation: number,
  transparent: boolean,
  uvs: QuadUVData,
  index: number,
];

enum ArgIndexes {
  Enabled,
  Fliped,
  Texture,
  Rotation,
  Transparent,
  UVs,
  Index,
}

const getArgs = (face: VoxelFaces): BoxFaceArags => {
  const args: BoxFaceArags = [] as any;
  args[ArgIndexes.Enabled] = true;
  args[ArgIndexes.Fliped] = false;
  args[ArgIndexes.Texture] = 0;
  args[ArgIndexes.Rotation] = 0;
  args[ArgIndexes.Transparent] = false;
  args[ArgIndexes.UVs] = [
    [1, 1],
    [0, 1],
    [0, 0],
    [1, 0],
  ];
  args[ArgIndexes.Index] = face;
  return args;
};

export type BoxVoxelGometryArgs = BoxFaceArags[];

export class BoxVoxelGometryInputs {
  static ArgIndexes = ArgIndexes;
  static CreateArgs(): BoxVoxelGometryArgs {
    const base: BoxVoxelGometryArgs = [] as any;
    for (let face = 0 as VoxelFaces; face < 6; face++) {
      base[face] = getArgs(face);
    }
    return base;
  }
}
