import type { ConstructorTextureData } from "Types";
import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureManager } from "../../../../Textures/TextureManager.js";
import { LiquidVoxelShape } from "../../../../Shapes/default/Liquid/Liquid.voxel.shape.js";

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
  if (tool.isFaceExposed("top")) {
   tool.setTexture(this.textures[0]).calculateLight("top",true);
   LiquidVoxelShape.add.top();
  }
  if (tool.isFaceExposed("bottom")) {
   tool.setTexture(this.textures[0]).calculateLight("bottom",true);
   LiquidVoxelShape.add.bottom();
  }
  if (tool.isFaceExposed("east")) {
   tool.setTexture(this.textures[0]).calculateLight("east",true);
   LiquidVoxelShape.add.east();
  }
  if (tool.isFaceExposed("west")) {
   tool.setTexture(this.textures[0]).calculateLight("west",true);
   LiquidVoxelShape.add.west();
  }
  if (tool.isFaceExposed("south")) {
   tool.setTexture(this.textures[0]).calculateLight("south",true);
   LiquidVoxelShape.add.south();
  }
  if (tool.isFaceExposed("north")) {
   tool.setTexture(this.textures[0]).calculateLight("north",true);
   LiquidVoxelShape.add.north();
  }
 }

 onTexturesRegistered(textureManager: typeof TextureManager): void {
  for (const text of this.textureData) {
   this.textures.push(textureManager.getTextureUV(text));
  }
 }
}
