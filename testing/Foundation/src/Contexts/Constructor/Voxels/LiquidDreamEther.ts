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
      if (tool.isFaceExposed(VoxelFaces.Up)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Up);
        if (tool.voxel.getLevel() == 15 && tool.voxel.getLevelState() != 1) {
          OutlinedVoxelTool.addTo.bottom(tool);
        }
        LiquidVoxelShape.add.up();
      }
      tool.getOverlayTextures().setAll(0);
      if (tool.isFaceExposed(VoxelFaces.Down)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Down);
        LiquidVoxelShape.add.down();
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
