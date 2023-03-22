import { VoxelConstructor } from "./VoxelConstructor.js";
import { LiquidVoxelShape } from "../..//Shapes/default/Liquid/Liquid.voxel.shape.js";
export class SimpleLiquidConstructor extends VoxelConstructor {
    id;
    textureData;
    textures = [];
    constructor(id, textureData) {
        super();
        this.id = id;
        this.textureData = textureData;
    }
    process(tool) {
        LiquidVoxelShape.start();
        if (tool.isFaceExposed("top")) {
            tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("top");
            LiquidVoxelShape.add.top();
        }
        if (tool.isFaceExposed("bottom")) {
            tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("bottom");
            LiquidVoxelShape.add.bottom();
        }
        if (tool.isFaceExposed("east")) {
            tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("east");
            LiquidVoxelShape.add.east();
        }
        if (tool.isFaceExposed("west")) {
            tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("west");
            LiquidVoxelShape.add.west();
        }
        if (tool.isFaceExposed("south")) {
            tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("south");
            LiquidVoxelShape.add.south();
        }
        if (tool.isFaceExposed("north")) {
            tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("north");
            LiquidVoxelShape.add.north();
        }
    }
    onTexturesRegistered(textureManager) {
        for (const text of this.textureData) {
            this.textures.push(textureManager.getTextureUV(text));
        }
    }
}
