import type { ConstructorTextureData } from "../../../../../../Textures/Constructor.types";

import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../../Textures/TextureRegister.js";
import { StairVoxelShape } from "../../../../Shapes/default/Stairs/Stair.voxel.shape.js";
import { VoxelFaces } from "@divinevoxel/core/Math";

export class SimpleStairVoxelConstructor extends VoxelConstructor {
  texture: number = 0;
  constructor(public id: string, public textureData: ConstructorTextureData) {
    super();
  }
  process(tool: VoxelMesherDataTool) {
    tool.setTexture(this.texture);
    tool.getOverlayTextures().setAll(0);
    if (tool.isFaceExposed(VoxelFaces.Top)) {
      tool.calculateLight(VoxelFaces.Top);
      StairVoxelShape.add.top();
    }
    if (tool.isFaceExposed(VoxelFaces.Bottom)) {
      tool.calculateLight(VoxelFaces.Bottom);
      StairVoxelShape.add.bottom();
    }
    if (tool.isFaceExposed(VoxelFaces.East)) {
      tool.calculateLight(VoxelFaces.East);
      StairVoxelShape.add.east();
    }
    if (tool.isFaceExposed(VoxelFaces.West)) {
      tool.calculateLight(VoxelFaces.West);
      StairVoxelShape.add.west();
    }
    if (tool.isFaceExposed(VoxelFaces.South)) {
      tool.calculateLight(VoxelFaces.South);
      StairVoxelShape.add.south();
    }
    if (tool.isFaceExposed(VoxelFaces.North)) {
      tool.calculateLight(VoxelFaces.North);
      StairVoxelShape.add.north();
    }
  }
  onTexturesRegistered(textureManager: typeof TextureRegister): void {
    this.texture = textureManager.getTextureUV(this.textureData);
    (this as any).textuerData = null;
  }
}
