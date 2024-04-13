import { VoxelConstructor } from "@divinevoxel/foundation/Default/Builder/Constructors/Voxel/Classes/VoxelConstructor";
import { LiquidVoxelShape } from "@divinevoxel/foundation/Default/Builder/Shapes/default/Liquid/Liquid.voxel.shape";
import { OutlinedVoxelTool } from "@divinevoxel/foundation/Default/Builder/Tools/OutlinedVoxelTool";
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
        ["#dve_liquid", "foam", "top"],
        (textures) => {
          overlayTextures = textures;
        }
      );
    },
    process(tool) {
      OutlinedVoxelTool.setCurrentTextures(overlayTextures);
      LiquidVoxelShape.start();
      tool.getOverlayTextures().setAll(0);
      if (tool.isFaceExposed("top")) {
        tool.setTexture(uv).calculateLight("top");
        if (tool.voxel.getLevel() == 15 && tool.voxel.getLevelState() != 1) {
          OutlinedVoxelTool.addTo.top(tool);
        }
        LiquidVoxelShape.add.top();
      }
      tool.getOverlayTextures().setAll(0);
      if (tool.isFaceExposed("bottom")) {
        tool.setTexture(uv).calculateLight("bottom");
        LiquidVoxelShape.add.bottom();
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
