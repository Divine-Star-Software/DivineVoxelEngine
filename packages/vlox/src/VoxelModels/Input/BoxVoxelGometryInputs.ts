import { VoxelFacesArray } from "../../Math";
import { QuadUVData } from "@amodx/meshing/Geometry.types";

export type BoxFaceArags = [
  //upp
  enabled: boolean,
  Fliped: boolean,
  texture: number,
  rotation: number,
  transparent: boolean,
  uvs: QuadUVData
];

enum ArgIndexes {
  Enabled,
  Fliped,
  Texture,
  Rotation,
  Transparent,
  UVs,
}

const getArgs = (): BoxFaceArags => {
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
  return args;
};

export type BoxVoxelGometryArgs = BoxFaceArags[];

export class BoxVoxelGometryInputs {
  static ArgIndexes = ArgIndexes;
  static CreateArgs(): BoxVoxelGometryArgs {
    const base: BoxVoxelGometryArgs = [] as any;
    VoxelFacesArray.forEach((_) => (base[_] = getArgs()));
    return base;
  }
}
