import type { ConstructorTextureData } from "../../../../../Textures/Constructor.types";

import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../Textures/TextureRegister.js";
import { StairVoxelShape } from "../../../../Shapes/default/Stairs/Stair.voxel.shape.js";
import { VoxelFaces } from "../../../../../Math";

export class SimpleStairVoxelConstructor extends VoxelConstructor {
  texture: number = 0;
  constructor(public id: string, public textureData: ConstructorTextureData) {
    super();
  }
  process(tool: VoxelMesherDataTool) {
    tool.setTexture(this.texture);
    tool.getOverlayTextures().setAll(0);
    if (tool.isFaceExposed(VoxelFaces.Up)) {
      tool.calculateLight(VoxelFaces.Up);
      StairVoxelShape.add.up();
    }
    if (tool.isFaceExposed(VoxelFaces.Down)) {
      tool.calculateLight(VoxelFaces.Down);
      StairVoxelShape.add.down();
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
