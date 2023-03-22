import type { ConstructorTextureData,  } from "Meta";
import { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "./VoxelConstructor.js";
import { TextureManager } from "../../Textures/TextureManager.js";
import { PanelVoxelShape } from "../../Shapes/default/Panel/Panel.voxel.shape.js";

export class SimplePanelVoxelConstructor extends VoxelConstructor {
 texture = 0;
 constructor(public id: string, public textuerData: ConstructorTextureData) {
  super();
 }
 process(tool: VoxelMesherDataTool) {
  tool
   .setAO(1)
   .setLight(tool.voxel.getLight())
   .setUV(this.texture)
   .setOverlayUV(0);
  PanelVoxelShape.build();
 }

 onTexturesRegistered(textureManager: typeof TextureManager): void {
  this.texture = textureManager.getTextureUV(this.textuerData);
  (this as any).textuerData = null;
 }
}
