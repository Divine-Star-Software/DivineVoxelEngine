import type { ConstructorTextureData } from "../../../../../Textures/Constructor.types";

import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../Textures/TextureRegister.js";
import { LiquidVoxelShape } from "../../../../Shapes/default/Liquid/Liquid.voxel.shape.js";
import { VoxelFaces } from "../../../../../Math";


export class SimpleLiquidConstructor extends VoxelConstructor {
 textures: number[] = [];
 constructor(
  public id: string,
  public textureData: [ConstructorTextureData, ConstructorTextureData]
 ) {
  super();
 }
 process(tool: VoxelMesherDataTool) {
  LiquidVoxelShape.start();
  tool.getOverlayTextures().setAll(0);
  if (tool.isFaceExposed(VoxelFaces.Up)) {
   tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.Up,true);
   LiquidVoxelShape.add.up();
  }
  if (tool.isFaceExposed(VoxelFaces.Down)) {
   tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.Down,true);
   LiquidVoxelShape.add.down();
  }
  if (tool.isFaceExposed(VoxelFaces.East)) {
   tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.East,true);
   LiquidVoxelShape.add.east();
  }
  if (tool.isFaceExposed(VoxelFaces.West)) {
   tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.West,true);
   LiquidVoxelShape.add.west();
  }
  if (tool.isFaceExposed(VoxelFaces.South)) {
   tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.South,true);
   LiquidVoxelShape.add.south();
  }
  if (tool.isFaceExposed(VoxelFaces.North)) {
   tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.North,true);
   LiquidVoxelShape.add.north();
  }
 }

 onTexturesRegistered(textureManager: typeof TextureRegister): void {
  for (const text of this.textureData) {
   this.textures.push(textureManager.getTextureUV(text));
  }
 }
}
