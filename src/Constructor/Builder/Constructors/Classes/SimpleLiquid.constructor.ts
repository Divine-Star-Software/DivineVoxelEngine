import type { ConstructorTextureData, } from "Meta";
import { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "./VoxelConstructor.js";
import { TextureManager } from "../../Textures/TextureManager.js";
import { LiquidVoxelShape } from "../..//Shapes/default/Liquid/Liquid.voxel.shape.js";

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
  if (tool.isFaceExposed("top")) {
   tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("top");
   LiquidVoxelShape.add.top();
  }
  if (tool.isFaceExposed("bottom")) {
   tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("bottom");
   LiquidVoxelShape.add.bottom();
  }
  if (tool.isFaceExposed("east")) {
   tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("east");
   LiquidVoxelShape.add.east();
  }
  if (tool.isFaceExposed("west")) {
   tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("west");
   LiquidVoxelShape.add.west();
  }
  if (tool.isFaceExposed("south")) {
   tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("south");
   LiquidVoxelShape.add.south();
  }
  if (tool.isFaceExposed("north")) {
   tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("north");
   LiquidVoxelShape.add.north();
  }
 }

 onTexturesRegistered(textureManager: typeof TextureManager): void {
  for (const text of this.textureData) {
   this.textures.push(textureManager.getTextureUV(text));
  }
 }
}
