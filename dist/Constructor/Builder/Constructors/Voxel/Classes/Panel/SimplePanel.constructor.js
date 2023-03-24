import { VoxelConstructor } from "../VoxelConstructor.js";
import { PanelVoxelShape } from "../../../../Shapes/default/Panel/Panel.voxel.shape.js";
export class SimplePanelVoxelConstructor extends VoxelConstructor {
    id;
    textuerData;
    texture = 0;
    constructor(id, textuerData) {
        super();
        this.id = id;
        this.textuerData = textuerData;
    }
    process(tool) {
        tool.setTexture(this.texture);
        tool.getOverlayTextures().setAll(0);
        tool.getWorldAO().setAll(1);
        tool.getWorldLight().setAll(tool.voxel.getLight());
        PanelVoxelShape.build();
    }
    onTexturesRegistered(textureManager) {
        this.texture = textureManager.getTextureUV(this.textuerData);
        this.textuerData = null;
    }
}
