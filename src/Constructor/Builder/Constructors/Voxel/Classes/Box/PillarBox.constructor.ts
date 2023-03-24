import type { ConstructorTextureData } from "Meta";
import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { BoxVoxelShape } from "../../../../Shapes/default/Box/Box.voxel.shape.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureManager } from "../../../../Textures/TextureManager.js";

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
  const topCheck = tool.voxel.isSameVoxel(
   tool.voxel.x,
   tool.voxel.y + 1,
   tool.voxel.z
  );
  const bottomCheck = tool.voxel.isSameVoxel(
   tool.voxel.x,
   tool.voxel.y,
   tool.voxel.z
  );

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
  if (tool.isFaceExposed("top")) {
   tool.setTexture(this.textures[0]).calculateLight("top");
   BoxVoxelShape.add.top();
  }
  if (tool.isFaceExposed("bottom")) {
   tool.setTexture(this.textures[1]).calculateLight("bottom");
   BoxVoxelShape.add.bottom();
  }
  if (tool.isFaceExposed("east")) {
   tool.setTexture(side).calculateLight("east");
   BoxVoxelShape.add.east();
  }
  if (tool.isFaceExposed("west")) {
   tool.setTexture(side).calculateLight("west");
   BoxVoxelShape.add.west();
  }
  if (tool.isFaceExposed("south")) {
   tool.setTexture(side).calculateLight("south");
   BoxVoxelShape.add.south();
  }
  if (tool.isFaceExposed("north")) {
   tool.setTexture(side).calculateLight("north");
   BoxVoxelShape.add.north();
  }
 }
 onTexturesRegistered(textureManager: typeof TextureManager): void {
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
