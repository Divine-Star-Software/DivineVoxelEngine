import type {
 ConstructorTextureData,
 DirectionNames,
} from "Meta";
import { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool.js";
import { BoxVoxelShape } from "../../Shapes/default/Box/Box.voxel.shape.js";
import { VoxelConstructor } from "./VoxelConstructor.js";
import { TextureManager } from "../../Textures/TextureManager.js";

export class SimpleBoxVoxelConstructor extends VoxelConstructor {
 textures: number[] = [];
 constructor(
  public id: string,
  public textureData:
   | ConstructorTextureData
   | Record<DirectionNames, ConstructorTextureData>
 ) {
  super();
 }
 process(tool: VoxelMesherDataTool) {
  tool.setOverlayUV(0);
  if (tool.isFaceExposed("top")) {
   tool.setUV(this.textures[0]).calculateLight("top");
   BoxVoxelShape.add.top();
  }
  if (tool.isFaceExposed("bottom")) {
   tool.setUV(this.textures[1]).calculateLight("bottom");
   BoxVoxelShape.add.bottom();
  }
  if (tool.isFaceExposed("east")) {
   tool.setUV(this.textures[2]).calculateLight("east");
   BoxVoxelShape.add.east();
  }
  if (tool.isFaceExposed("west")) {
   tool.setUV(this.textures[3]).calculateLight("west");
   BoxVoxelShape.add.west();
  }
  if (tool.isFaceExposed("south")) {
   tool.setUV(this.textures[4]).calculateLight("south");
   BoxVoxelShape.add.south();
  }
  if (tool.isFaceExposed("north")) {
   tool.setUV(this.textures[5]).calculateLight("north");
   BoxVoxelShape.add.north();
  }
 }

 onTexturesRegistered(textureManager: typeof TextureManager): void {
  const textures = this.textureData;
  if (Array.isArray(textures)) {
   let i = 6;
   while (i--) {
    this.textures.push(textureManager.getTextureUV(textures));
   }
   return;
  }
  this.textures.push(textureManager.getTextureUV(textures.top));
  this.textures.push(textureManager.getTextureUV(textures.bottom));
  this.textures.push(textureManager.getTextureUV(textures.east));
  this.textures.push(textureManager.getTextureUV(textures.west));
  this.textures.push(textureManager.getTextureUV(textures.south));
  this.textures.push(textureManager.getTextureUV(textures.north));
 }
}
