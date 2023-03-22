import { VoxelConstructor } from "./VoxelConstructor.js";
import { PanelVoxelShape } from "../../Shapes/default/Panel/Panel.voxel.shape.js";
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
        tool
            .setAO(1)
            .setLight(tool.voxel.getLight())
            .setUV(this.texture)
            .setOverlayUV(0);
        PanelVoxelShape.build();
    }
    onTexturesRegistered(textureManager) {
        this.texture = textureManager.getTextureUV(this.textuerData);
        this.textuerData = null;
    }
}
