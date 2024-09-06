import { VoxelConstructor } from "@divinevoxel/foundation/Builder/Constructors/Voxel/Classes/VoxelConstructor";
import { LiquidVoxelShape } from "@divinevoxel/foundation/Builder/Shapes/default/Liquid/Liquid.voxel.shape";

import { OutlinedVoxelTool } from "@divinevoxel/foundation/Builder/Tools/OutlinedVoxelTool";
export function GetDreamEther(): VoxelConstructor {
  let uv = 0;

  let overlayTextures: number[] = [];
  return {
    id: "dve_liquid_dream_ether",
    onTexturesRegistered(textureMangager) {
      uv = textureMangager.getTextureUV([
        "#dve_liquid",
        "dve_liquid_dream_ether",
        "still-1",
      ]);
      OutlinedVoxelTool.getOutlineUVs(
        ["#dve_liquid", "foam", "up"],
        (textures) => {
          overlayTextures = textures;
        }
      );
    },
    process(tool) {
      OutlinedVoxelTool.setCurrentTextures(overlayTextures);
      LiquidVoxelShape.start();
      tool.getOverlayTextures().setAll(0);
      if (tool.isFaceExposed("up")) {
        tool.setTexture(uv).calculateLight("up");
        if (tool.voxel.getLevel() == 15 && tool.voxel.getLevelState() != 1) {
          OutlinedVoxelTool.addTo.up(tool);
        }
        LiquidVoxelShape.add.up();
      }
      tool.getOverlayTextures().setAll(0);
      if (tool.isFaceExposed("down")) {
        tool.setTexture(uv).calculateLight("down");
        LiquidVoxelShape.add.down();
      }
      if (tool.isFaceExposed("east")) {
        tool.setTexture(uv).calculateLight("east");
        LiquidVoxelShape.add.east();
      }
      if (tool.isFaceExposed("west")) {
        tool.setTexture(uv).calculateLight("west");
        LiquidVoxelShape.add.west();
      }
      if (tool.isFaceExposed("south")) {
        tool.setTexture(uv).calculateLight("south");
        LiquidVoxelShape.add.south();
      }
      if (tool.isFaceExposed("north")) {
        tool.setTexture(uv).calculateLight("north");
        LiquidVoxelShape.add.north();
      }
    },
  };
}
