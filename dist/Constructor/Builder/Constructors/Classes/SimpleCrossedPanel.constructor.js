import { VoxelConstructor } from "./VoxelConstructor.js";
import { CrossedPanels } from "../../Shapes/default/Panel/CrossedPanels.voxel.shape.js";
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
        tool
            .setAO(1)
            .setLight(tool.voxel.getLight())
            .setUV(this.texture)
            .setOverlayUV(0);
        CrossedPanels.build();
    }
    onTexturesRegistered(textureManager) {
        this.texture = textureManager.getTextureUV(this.textuerData);
        this.textuerData = null;
    }
}
