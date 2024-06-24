import type { ConstructorTextureData } from "../../../../../../Textures/Constructor.types";

import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../../Textures/TextureRegister.js";
import { LiquidVoxelShape } from "../../../../Shapes/default/Liquid/Liquid.voxel.shape.js";
import { VoxelFaces } from "@divinevoxel/core/Math";


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
  if (tool.isFaceExposed(VoxelFaces.Top)) {
   tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.Top,true);
   LiquidVoxelShape.add.top();
  }
  if (tool.isFaceExposed(VoxelFaces.Bottom)) {
   tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.Bottom,true);
   LiquidVoxelShape.add.bottom();
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
