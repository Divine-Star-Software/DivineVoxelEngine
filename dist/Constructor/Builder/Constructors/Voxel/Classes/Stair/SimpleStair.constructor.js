import { VoxelConstructor } from "../VoxelConstructor.js";
import { StairVoxelShape } from "../../../../Shapes/default/Stairs/Stair.voxel.shape.js";
export class SimpleStairVoxelConstructor extends VoxelConstructor {
    id;
    textureData;
    texture = 0;
    constructor(id, textureData) {
        super();
        this.id = id;
        this.textureData = textureData;
    }
    process(tool) {
        tool.setTexture(this.texture);
        tool.getOverlayTextures().setAll(0);
        if (tool.isFaceExposed("top")) {
            tool.calculateLight("top");
            StairVoxelShape.add.top();
        }
        if (tool.isFaceExposed("bottom")) {
            tool.calculateLight("bottom");
            StairVoxelShape.add.bottom();
        }
        if (tool.isFaceExposed("east")) {
            tool.calculateLight("east");
            StairVoxelShape.add.east();
        }
        if (tool.isFaceExposed("west")) {
            tool.calculateLight("west");
            StairVoxelShape.add.west();
        }
        if (tool.isFaceExposed("south")) {
            tool.calculateLight("south");
            StairVoxelShape.add.south();
        }
        if (tool.isFaceExposed("north")) {
            tool.calculateLight("north");
            StairVoxelShape.add.north();
        }
    }
    onTexturesRegistered(textureManager) {
        this.texture = textureManager.getTextureUV(this.textureData);
        this.textuerData = null;
    }
}
