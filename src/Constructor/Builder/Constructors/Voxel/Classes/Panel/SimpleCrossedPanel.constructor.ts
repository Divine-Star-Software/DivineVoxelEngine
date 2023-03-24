import type { ConstructorTextureData } from "Meta";
import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureManager } from "../../../../Textures/TextureManager.js";
import { CrossedPanels } from "../../../../Shapes/default/Panel/CrossedPanels.voxel.shape.js";

export class SimpleCrossedPanelVoxelConstructor extends VoxelConstructor {
 texture = 0;
 constructor(public id: string, public textuerData: ConstructorTextureData) {
  super();
 }
 process(tool: VoxelMesherDataTool) {
  tool.setTexture(this.texture);
  tool.getOverlayTextures().setAll(0);
  tool.getWorldAO().setAll(1);
  tool.getWorldLight().setAll(tool.voxel.getLight());
  CrossedPanels.build();
 }

 onTexturesRegistered(textureManager: typeof TextureManager): void {
  this.texture = textureManager.getTextureUV(this.textuerData);
  (this as any).textuerData = null;
 }
}
