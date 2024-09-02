import { VoxelFaces } from "@divinevoxel/core/Math";

import { VoxelConstructor } from "@divinevoxel/foundation/Default/Mesher/Constructors/Voxel/Classes/VoxelConstructor";
import { LiquidVoxelShape } from "@divinevoxel/foundation/Default/Mesher/Shapes/default/Liquid/Liquid.voxel.shape";
import { OutlinedVoxelTool } from "@divinevoxel/foundation/Default/Mesher/Tools/OutlinedVoxelTool";
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
      if (tool.isFaceExposed(VoxelFaces.Top)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Top);
        if (tool.voxel.getLevel() == 15 && tool.voxel.getLevelState() != 1) {
          OutlinedVoxelTool.addTo.top(tool);
        }
        LiquidVoxelShape.add.top();
      }
      tool.getOverlayTextures().setAll(0);
      if (tool.isFaceExposed(VoxelFaces.Bottom)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Bottom);
        LiquidVoxelShape.add.bottom();
      }
      if (tool.isFaceExposed(VoxelFaces.East)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.East);
        LiquidVoxelShape.add.east();
      }
      if (tool.isFaceExposed(VoxelFaces.West)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.West);
        LiquidVoxelShape.add.west();
      }
      if (tool.isFaceExposed(VoxelFaces.South)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.South);
        LiquidVoxelShape.add.south();
      }
      if (tool.isFaceExposed(VoxelFaces.North)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.North);
        LiquidVoxelShape.add.north();
      }
    },
  };
}
