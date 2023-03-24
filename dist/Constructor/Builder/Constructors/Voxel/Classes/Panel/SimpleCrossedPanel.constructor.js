import { VoxelConstructor } from "../VoxelConstructor.js";
import { CrossedPanels } from "../../../../Shapes/default/Panel/CrossedPanels.voxel.shape.js";
export class SimpleCrossedPanelVoxelConstructor extends VoxelConstructor {
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
        CrossedPanels.build();
    }
    onTexturesRegistered(textureManager) {
        this.texture = textureManager.getTextureUV(this.textuerData);
        this.textuerData = null;
    }
}
