import type { ConstructorTextureData } from "../../../../../../Textures/Constructor.types";

import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { BoxVoxelShape } from "../../../../Shapes/default/Box/Box.voxel.shape.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../../Textures/TextureRegister.js";
import { VoxelFaces } from "@divinevoxel/core/Math";

export type PillarBoxVoxelConstructorData = {
  top: ConstructorTextureData;
  bottom: ConstructorTextureData;
  sideMiddle: ConstructorTextureData;
  sideBottom: ConstructorTextureData;
  sideTop: ConstructorTextureData;
  sideFloat: ConstructorTextureData;
};
export class PillarBoxVoxelConstructor extends VoxelConstructor {
  textures: [
    top: number,
    bottom: number,
    sideMiddle: number,
    sideBottom: number,
    sideTop: number,
    sideFloat: number
  ];
  constructor(
    public id: string,
    public textureData: PillarBoxVoxelConstructorData
  ) {
    super();
  }
  process(tool: VoxelMesherDataTool) {
    const topCheck =
      tool.nVoxel.loadInAt(tool.voxel.x, tool.voxel.y + 1, tool.voxel.z) &&
      tool.voxel.isSameVoxel(tool.nVoxel);

    const bottomCheck =
      tool.nVoxel.loadInAt(tool.voxel.x, tool.voxel.y - 1, tool.voxel.z) &&
      tool.voxel.isSameVoxel(tool.nVoxel);

    let side = -1;
    determineText: if (side) {
      if (topCheck && bottomCheck) {
        side = this.textures[2];
        break determineText;
      }
      if (topCheck && !bottomCheck) {
        side = this.textures[3];
        break determineText;
      }
      if (!topCheck && bottomCheck) {
        side = this.textures[4];
        break determineText;
      }
      if (!topCheck && !bottomCheck) {
        side = this.textures[5];
        break determineText;
      }
      side = 0;
    }
    tool.getOverlayTextures().setAll(0);
    if (tool.isFaceExposed(VoxelFaces.Top)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.Top);
      BoxVoxelShape.add.top();
    }
    if (tool.isFaceExposed(VoxelFaces.Bottom)) {
      tool.setTexture(this.textures[1]).calculateLight(VoxelFaces.Bottom);
      BoxVoxelShape.add.bottom();
    }
    if (tool.isFaceExposed(VoxelFaces.East)) {
      tool.setTexture(side).calculateLight(VoxelFaces.East);
      BoxVoxelShape.add.east();
    }
    if (tool.isFaceExposed(VoxelFaces.West)) {
      tool.setTexture(side).calculateLight(VoxelFaces.West);
      BoxVoxelShape.add.west();
    }
    if (tool.isFaceExposed(VoxelFaces.South)) {
      tool.setTexture(side).calculateLight(VoxelFaces.South);
      BoxVoxelShape.add.south();
    }
    if (tool.isFaceExposed(VoxelFaces.North)) {
      tool.setTexture(side).calculateLight(VoxelFaces.North);
      BoxVoxelShape.add.north();
    }
  }
  onTexturesRegistered(textureManager: typeof TextureRegister): void {
    this.textures = [
      textureManager.getTextureUV(this.textureData.top),
      textureManager.getTextureUV(this.textureData.bottom),
      textureManager.getTextureUV(this.textureData.sideMiddle),
      textureManager.getTextureUV(this.textureData.sideBottom),
      textureManager.getTextureUV(this.textureData.sideTop),
      textureManager.getTextureUV(this.textureData.sideFloat),
    ];
    (this as any).textureData = null;
  }
}
