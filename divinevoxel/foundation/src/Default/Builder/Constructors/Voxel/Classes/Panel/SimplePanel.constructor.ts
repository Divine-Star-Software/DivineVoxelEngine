import type { ConstructorTextureData } from "../../../../../../Textures/Constructor.types";

import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../../Textures/TextureRegister.js";
import { PanelVoxelShape } from "../../../../Shapes/default/Panel/Panel.voxel.shape.js";

export class SimplePanelVoxelConstructor extends VoxelConstructor {
 texture = 0;
 constructor(public id: string, public textuerData: ConstructorTextureData) {
  super();
 }
 process(tool: VoxelMesherDataTool) {
  tool.setTexture(this.texture);
  tool.getOverlayTextures().setAll(0);
  tool.getWorldAO().setAll(1);
  tool.getWorldLight().setAll(tool.voxel.getLight());
  PanelVoxelShape.build();
 }

 onTexturesRegistered(textureManager: typeof TextureRegister): void {
  this.texture = textureManager.getTextureUV(this.textuerData);
  (this as any).textuerData = null;
 }
}
