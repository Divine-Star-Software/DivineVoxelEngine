import { Vector4Like } from "@amodx/math";
import type { Quad } from "../../../Geomtry";
import { VoxelModelBuilder } from "Mesher/Models/VoxelModelBuilder";
import { TextureProcedure,BaseVoxelGeomtryTextureProcedureData } from "../TextureProcedure";

import { TextureId } from "Textures";

import { Vec3Array } from "@amodx/math";
import { VoxelFaces } from "../../../../Math/index.js";
interface OutlinedTextureProcedureData
  extends BaseVoxelGeomtryTextureProcedureData {
  type: "outlined";
  texture: TextureId | number;
  textureRecrod: {
    top: TextureId | number;
    "corner-top-right": TextureId | number;
    "corner-top-left": TextureId | number;
    "corner-top-left-top-right": TextureId | number;
    bottom: TextureId | number;
    "corner-bottom-right": TextureId | number;
    "corner-bottom-left": TextureId | number;
    "corner-bottom-left-bottom-right": TextureId | number;
    right: TextureId | number;
    left: TextureId | number;
  };
}

const textureMap: string[] = [
  "top",
  "corner-top-right",
  "corner-top-left",
  "corner-top-left-top-right",
  "bottom",
  "corner-bottom-right",
  "corner-bottom-left",
  "corner-bottom-left-bottom-right",
  "right",
  "left",
];

/*
0 -> normal direction
1 -> top right
2 -> top left 
*/
const uvsSets: Record<string, Record<number, number>> = {
  //top bottom faces
  north: {
    0b0: 0,
    0b101: 1,
    0b011: 2,
    0b001: 3,
  },
  south: {
    0b0: 4,
    0b101: 5,
    0b011: 6,
    0b001: 7,
  },
  east: {
    0b0: 8,
  },
  west: {
    0b0: 9,
  },
  //side faces
  top: {
    0b0: 0,
    0b101: 1,
    0b011: 2,
    0b001: 3,
  },
  bottom: {
    0b0: 4,
    0b101: 5,
    0b011: 6,
    0b001: 7,
  },
  right: {
    0b0: 8,
  },
  left: {
    0b0: 9,
  },
};

const topAndDown: Record<string, Vec3Array[]> = {
  north: [
    [0, 0, 1],
    [1, 0, 1],
    [-1, 0, 1],
  ],
  south: [
    [0, 0, -1],
    [1, 0, -1],
    [-1, 0, -1],
  ],
  east: [[1, 0, 0]],
  west: [[-1, 0, 0]],
};
const eastAndWest: Record<string, Vec3Array[]> = {
  top: [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, -1],
  ],
  bottom: [
    [0, -1, 0],
    [0, -1, 1],
    [0, -1, -1],
  ],
  right: [[0, 0, 1]],
  left: [[0, 0, -1]],
};
const northAndSouth: Record<string, Vec3Array[]> = {
  top: [
    [0, 1, 0],
    [1, 1, 0],
    [-1, 1, 0],
  ],
  bottom: [
    [0, -1, 0],
    [1, -1, 0],
    [-1, -1, 0],
  ],
  right: [[1, 0, 0]],
  left: [[-1, 0, 0]],
};
const CheckSets: Record<VoxelFaces, Record<string, Vec3Array[]>> = {
  [VoxelFaces.Up]: topAndDown,
  [VoxelFaces.Down]: topAndDown,
  [VoxelFaces.North]: northAndSouth,
  [VoxelFaces.South]: northAndSouth,
  [VoxelFaces.East]: eastAndWest,
  [VoxelFaces.West]: eastAndWest,
};

const generateCheck = (
  direction: keyof typeof uvsSets,
  tool: VoxelModelBuilder,
  normal: Vec3Array,
  sets: Vec3Array[]
) => {
  const { x, y, z } = tool.position;

  let key = 0b0;

  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];
    const cx = x + set[0];
    const cy = y + set[1];
    const cz = z + set[2];

    const sameLevelCheck = tool.nVoxel
      .getVoxel(cx, cy, cz)
      ?.isSameVoxel(tool.voxel);
    let normalCheck = true;

    const nVoxel = tool.nVoxel.getVoxel(
      cx + normal[0],
      cy + normal[1],
      cz + normal[2]
    );

    if (nVoxel && nVoxel.isRenderable() && nVoxel.isOpaque()) {
      normalCheck = false;
    }

    if (sameLevelCheck && normalCheck) {
      key |= 0b1 << i;
    } else {
      key |= 0b0 << i;
      if (i == 0) break;
    }
  }
  if (uvsSets[direction][key] == undefined) return 0;
  const index = uvsSets[direction][key];
  return textureMap[index];
};

const normal: Vec3Array = [0, 0, 0];
export class OutlinedTextureProcedure extends TextureProcedure<OutlinedTextureProcedureData> {
  getTexture(
    builder: VoxelModelBuilder,
    data: OutlinedTextureProcedureData,
    closestFace: VoxelFaces,
    primitive: Quad
  ): number {
    return data.texture! as number;
  }

  getOverlayTexture(
    builder: VoxelModelBuilder,
    data: OutlinedTextureProcedureData,
    closestFace: VoxelFaces,
    primitive: Quad,
    ref: Vector4Like
  ): Vector4Like {
    const set = CheckSets[closestFace];
    const x = generateCheck("north", builder, normal, set.north);
    if (x) ref.x = (data as any).textureRecrod[x];
    const y = generateCheck("south", builder, normal, set.south);
    if (y) ref.y = (data as any).textureRecrod[y];
    const z = generateCheck("east", builder, normal, set.east);
    if (z) ref.z = (data as any).textureRecrod[z];
    const w = generateCheck("west", builder, normal, set.west);
    if (w) ref.w = (data as any).textureRecrod[w];

    return ref;
  }

  transformUVs(
    builder: VoxelModelBuilder,
    data: OutlinedTextureProcedureData,
    closestFace: VoxelFaces,
    primitive: Quad
  ) {}
}
