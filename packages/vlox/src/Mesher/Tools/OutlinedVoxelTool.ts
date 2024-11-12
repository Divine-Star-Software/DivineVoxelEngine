import { VoxelMesherDataTool } from "./VoxelMesherDataTool.js";
import type { ConstructorTextureData } from "../../Textures/Constructor.types.js";
import { DVEMesher } from "../Mesher.js";
import { Vec3Array } from "@amodx/math";
import { VoxelFaceDirections, VoxelFaces } from "../../Math/index.js";
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
  [VoxelFaces.East]: eastAndWest,
  [VoxelFaces.West]: eastAndWest,
  [VoxelFaces.North]: northAndSouth,
  [VoxelFaces.South]: northAndSouth,
};

const generateCheck = (
  direction: keyof typeof uvsSets,
  tool: VoxelMesherDataTool,
  normal: Vec3Array,
  sets: Vec3Array[]
) => {
  const { x, y, z } = tool.voxel;

  let key = 0b0;

  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];
    const cx = x + set[0];
    const cy = y + set[1];
    const cz = z + set[2];

    tool.nVoxel.loadInAt(cx, cy, cz);
    const sameLevelCheck = tool.voxel.isSameVoxel(tool.nVoxel);
    let normalCheck = true;
    if (tool.nVoxel.loadInAt(cx + normal[0], cy + normal[1], cz + normal[2])) {
      if (tool.nVoxel.isRenderable() && tool.nVoxel.isOpaque()) {
        normalCheck = false;
      }
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
  return OutlinedVoxelTool._currentTexts[index];
};

export class OutlinedVoxelTool {
  static _currentTexts: number[] = [];

  static setCurrentTextures(textures: number[]) {
    this._currentTexts = textures;
  }

  static addTo = {
    top: (tool: VoxelMesherDataTool) => {
      const normal = VoxelFaceDirections[VoxelFaces.Up];
      const set = CheckSets[VoxelFaces.Up];
      tool
        .getOverlayTextures()
        .set(
          generateCheck("north", tool, normal, set.north),
          generateCheck("south", tool, normal, set.south),
          generateCheck("east", tool, normal, set.east),
          generateCheck("west", tool, normal, set.west)
        );
    },
    bottom: (tool: VoxelMesherDataTool) => {
      const normal = VoxelFaceDirections[VoxelFaces.Down];
      const set = CheckSets[VoxelFaces.Down];
      tool
        .getOverlayTextures()
        .set(
          generateCheck("north", tool, normal, set.north),
          generateCheck("south", tool, normal, set.south),
          generateCheck("east", tool, normal, set.east),
          generateCheck("west", tool, normal, set.west)
        );
    },
    north: (tool: VoxelMesherDataTool) => {
      const normal = VoxelFaceDirections[VoxelFaces.North];
      const set = CheckSets[VoxelFaces.North];
      tool
        .getOverlayTextures()
        .set(
          generateCheck("top", tool, normal, set.top),
          generateCheck("bottom", tool, normal, set.bottom),
          generateCheck("left", tool, normal, set.left),
          generateCheck("right", tool, normal, set.right)
        );
    },
    south: (tool: VoxelMesherDataTool) => {
      const normal = VoxelFaceDirections[VoxelFaces.South];
      const set = CheckSets[VoxelFaces.South];
      tool
        .getOverlayTextures()
        .set(
          generateCheck("top", tool, normal, set.top),
          generateCheck("bottom", tool, normal, set.bottom),
          generateCheck("left", tool, normal, set.left),
          generateCheck("right", tool, normal, set.right)
        );
    },
    east: (tool: VoxelMesherDataTool) => {
      const normal = VoxelFaceDirections[VoxelFaces.East];
      const set = CheckSets[VoxelFaces.East];
      tool
        .getOverlayTextures()
        .set(
          generateCheck("top", tool, normal, set.top),
          generateCheck("bottom", tool, normal, set.bottom),
          generateCheck("left", tool, normal, set.left),
          generateCheck("right", tool, normal, set.right)
        );
    },
    west: (tool: VoxelMesherDataTool) => {
      const normal = VoxelFaceDirections[VoxelFaces.West];
      const set = CheckSets[VoxelFaces.West];
      tool
        .getOverlayTextures()
        .set(
          generateCheck("top", tool, normal, set.top),
          generateCheck("bottom", tool, normal, set.bottom),
          generateCheck("left", tool, normal, set.left),
          generateCheck("right", tool, normal, set.right)
        );
    },
  };

  static getOutlineUVs(
    texture: ConstructorTextureData,
    onRegister: (uvs: number[]) => void
  ) {
    const overlayTextures: number[] = [];
    DVEMesher.observers.texturesRegistered.subscribeOnce(
      (textureManager) => {
        const type = texture[0];
        const id = texture[1];
        overlayTextures.push(
          textureManager.getTextureUV([type, id, "top"], true) /** */,
          textureManager.getTextureUV([type, id, "corner-top-right"], true),
          textureManager.getTextureUV([type, id, "corner-top-left"], true),
          textureManager.getTextureUV(
            [type, id, "corner-top-left-top-right"],
            true
          ),
          textureManager.getTextureUV([type, id, "bottom"], true),
          textureManager.getTextureUV([type, id, "corner-bottom-right"], true),
          textureManager.getTextureUV([type, id, "corner-bottom-left"], true),
          textureManager.getTextureUV(
            [type, id, "corner-bottom-left-bottom-right"],
            true
          ),
          textureManager.getTextureUV([type, id, "right"], true),
          textureManager.getTextureUV([type, id, "left"], true)
        );
        onRegister(overlayTextures);
      }
    );
  }
}
