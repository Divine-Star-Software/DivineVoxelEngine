import type { DirectionNames } from "@divinevoxel/core/Types/";
import { VoxelMesherDataTool } from "./VoxelMesherDataTool.js";
import type { ConstructorTextureData } from "../../../Textures/Constructor.types.js";
import { DVEDefaultBuilder } from "../Builder.js";

const checkSets = {
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
  top: [
    [0, 1, 0],
    [-1, 1, -1],
    [1, 1, 1],
  ],
  bottom: [
    [0, -1, 0],
    [-1, -1, -1],
    [1, -1, 1],
  ],
  right: [[1, 0, 0]],
  left: [[-1, 0, 0]],
};

const DirectionNormals: Record<DirectionNames, number[]> = {
  top: [0, 1, 0],
  bottom: [0, -1, 0],
  east: [1, 0, 0],
  west: [-1, 0, 0],
  north: [0, 0, 1],
  south: [0, 0, -1],
};

const uvsSets: Record<string, Record<number, number>> = {
  north: {
    0b0: 4,
    0b101: 5,
    0b011: 6,
    0b001: 7,
  },
  south: {
    0b0: 0,
    0b101: 1,
    0b011: 2,
    0b001: 3,
  },
  east: {
    0b0: 8,
  },
  west: {
    0b0: 9,
  },
  top: {
    0b0: 4,
    0b101: 5,
    0b011: 6,
    0b001: 7,
  },
  bottom: {
    0b0: 0,
    0b101: 1,
    0b011: 2,
    0b001: 3,
  },
  right: {
    0b0: 8,
  },
  left: {
    0b0: 9,
  },
};

export class OutlinedVoxelTool {
  static _currentTexts: number[] = [];

  static setCurrentTextures(textures: number[]) {
    this._currentTexts = textures;
  }

  static addTo = {
    top: (tool: VoxelMesherDataTool) => {
      tool
        .getOverlayTextures()
        .set(
          this.getTexture("north", "top", tool),
          this.getTexture("south", "top", tool),
          this.getTexture("east", "top", tool),
          this.getTexture("west", "top", tool)
        );
    },
    bottom: (tool: VoxelMesherDataTool) => {
      tool
        .getOverlayTextures()
        .set(
          this.getTexture("north", "bottom", tool),
          this.getTexture("south", "bottom", tool),
          this.getTexture("east", "bottom", tool),
          this.getTexture("west", "bottom", tool)
        );
    },
    north: (tool: VoxelMesherDataTool) => {
      tool
        .getOverlayTextures()
        .set(
          this.getTexture("top", "north", tool),
          this.getTexture("bottom", "north", tool),
          this.getTexture("right", "north", tool),
          this.getTexture("left", "north", tool)
        );
    },
    south: (tool: VoxelMesherDataTool) => {
      tool
        .getOverlayTextures()
        .set(
          this.getTexture("top", "south", tool),
          this.getTexture("bottom", "south", tool),
          this.getTexture("right", "south", tool),
          this.getTexture("left", "south", tool)
        );
    },
    east: (tool: VoxelMesherDataTool) => {
      tool
        .getOverlayTextures()
        .set(
          this.getTexture("top", "east", tool),
          this.getTexture("bottom", "east", tool),
          this.getTexture("right", "east", tool),
          this.getTexture("left", "east", tool)
        );
    },
    west: (tool: VoxelMesherDataTool) => {
      tool
        .getOverlayTextures()
        .set(
          this.getTexture("top", "west", tool),
          this.getTexture("bottom", "west", tool),
          this.getTexture("right", "west", tool),
          this.getTexture("left", "west", tool)
        );
    },
  };

  static getOutlineUVs(
    texture: ConstructorTextureData,
    onRegister: (uvs: number[]) => void
  ) {
    const overlayTextures: number[] = [];
    DVEDefaultBuilder.observers.texturesRegistered.subscribeOnce(
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
        console.log(texture, overlayTextures);
        onRegister(overlayTextures);
      }
    );
  }

  static getTexture(
    direction: DirectionNames | "left" | "right",
    face: DirectionNames,
    tool: VoxelMesherDataTool
  ) {
    const { x, y, z } = tool.voxel;

    let key = 0b0;
    const sets = checkSets[direction];
    const sl = sets.length;
    for (let i = 0; i < sets.length; i++) {
      const set = sets[i];
      let cx = x;
      let cy = y;
      let cz = z;
      switch (face) {
        case "top":
          cx += set[0];
          cz += set[2];
          break;
        case "bottom":
          cx += set[0];
          cz += set[2] * -1;
          break;
        case "north":
          if (sl == 0) {
            cx += set[0];
          } else {
            cx += set[0];
            cy += set[1];
          }
          break;
        case "south":
          if (sl == 0) {
            cx += set[0] * -1;
          } else {
            cx += set[0] * -1;
            cy += set[1];
          }
          break;
        case "west":
          if (sl == 0) {
            cz += set[0];
          } else {
            cz += set[0];
            cy += set[1];
          }
          break;
        case "east":
          if (sl == 0) {
            cz += set[0] * -1;
          } else {
            cz += set[0] * -1;
            cy += set[1];
          }
          break;
      }
      const normal = DirectionNormals[face];

      tool.nVoxel.loadInAt(cx, cy, cz);
      const sameLevelCheck = tool.voxel.isSameVoxel(tool.nVoxel);
      let normalCheck = true;
      if (
        tool.nVoxel.loadInAt(cx + normal[0], cy + normal[1], cz + normal[2])
      ) {
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
    return this._currentTexts[index];
  }
}
