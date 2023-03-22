import type { ConstructorTextureData } from "Meta";
import { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "./VoxelConstructor.js";
import { TextureManager } from "../../Textures/TextureManager.js";
import { CrossedPanels } from "../../Shapes/default/Panel/CrossedPanels.voxel.shape.js";

export class SimpleCrossedPanelVoxelConstructor extends VoxelConstructor {
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
  CrossedPanels.build();
 }

 onTexturesRegistered(textureManager: typeof TextureManager): void {
  this.texture = textureManager.getTextureUV(this.textuerData);
  (this as any).textuerData = null;
 }
}
