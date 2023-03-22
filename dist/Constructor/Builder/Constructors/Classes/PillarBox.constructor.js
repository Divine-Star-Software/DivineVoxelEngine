import { BoxVoxelShape } from "../../Shapes/default/Box/Box.voxel.shape.js";
import { VoxelConstructor } from "./VoxelConstructor.js";
export class PillarBoxVoxelConstructor extends VoxelConstructor {
    id;
    textureData;
    textures;
    constructor(id, textureData) {
        super();
        this.id = id;
        this.textureData = textureData;
    }
    process(tool) {
        const topCheck = tool.voxel.isSameVoxel(tool.voxel.x, tool.voxel.y + 1, tool.voxel.z);
        const bottomCheck = tool.voxel.isSameVoxel(tool.voxel.x, tool.voxel.y, tool.voxel.z);
        let side = -1;
        determineText: if (side) {
            if (topCheck && bottomCheck) {
                side = this.textures[2];
                break determineText;
            }
            if (topCheck && !bottomCheck) {
                side = this.textures[3];
                break determineText;
            }
            if (!topCheck && bottomCheck) {
                side = this.textures[4];
                break determineText;
            }
            if (!topCheck && !bottomCheck) {
                side = this.textures[5];
                break determineText;
            }
            side = 0;
        }
        if (tool.isFaceExposed("top")) {
            tool.setUV(this.textures[0]).setOverlayUV(0).calculateLight("top");
            BoxVoxelShape.add.top();
        }
        if (tool.isFaceExposed("bottom")) {
            tool.setUV(this.textures[1]).setOverlayUV(0).calculateLight("bottom");
            BoxVoxelShape.add.bottom();
        }
        if (tool.isFaceExposed("east")) {
            tool.setUV(side).setOverlayUV(0).calculateLight("east");
            BoxVoxelShape.add.east();
        }
        if (tool.isFaceExposed("west")) {
            tool.setUV(side).setOverlayUV(0).calculateLight("west");
            BoxVoxelShape.add.west();
        }
        if (tool.isFaceExposed("south")) {
            tool.setUV(side).setOverlayUV(0).calculateLight("south");
            BoxVoxelShape.add.south();
        }
        if (tool.isFaceExposed("north")) {
            tool.setUV(side).setOverlayUV(0).calculateLight("north");
            BoxVoxelShape.add.north();
        }
    }
    onTexturesRegistered(textureManager) {
        this.textures = [
            textureManager.getTextureUV(this.textureData.top),
            textureManager.getTextureUV(this.textureData.bottom),
            textureManager.getTextureUV(this.textureData.sideMiddle),
            textureManager.getTextureUV(this.textureData.sideBottom),
            textureManager.getTextureUV(this.textureData.sideTop),
            textureManager.getTextureUV(this.textureData.sideFloat),
        ];
        this.textureData = null;
    }
}
