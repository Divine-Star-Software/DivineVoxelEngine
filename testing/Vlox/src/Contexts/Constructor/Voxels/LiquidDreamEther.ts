import { VoxelFaces } from "@divinevoxel/vlox/Math";

import { VoxelConstructor } from "@divinevoxel/vlox/Mesher/Constructors/Voxel/Classes/VoxelConstructor";
import { LiquidVoxelShape } from "@divinevoxel/vlox/Mesher/Shapes/default/Liquid/Liquid.voxel.shape";
import { OutlinedVoxelTool } from "@divinevoxel/vlox/Mesher/Tools/OutlinedVoxelTool";
export function GetDreamEther(): VoxelConstructor {
  let uv = 0;

  let overlayTextures: number[] = [];
  return {
    id: "dve_liquid_dream_ether",
    onTexturesRegistered(textureMangager) {
      uv = textureMangager.getTextureUV([
        "#dve_voxel",
        "dve_liquid_dream_ether",
        "still-1",
      ]);
      OutlinedVoxelTool.getOutlineUVs(
        ["#dve_voxel", "foam", "up"],
        (textures) => {
          overlayTextures = textures;
        }
      );
    },
    process(tool) {
      OutlinedVoxelTool.setCurrentTextures(overlayTextures);
      LiquidVoxelShape.start();
      tool.getOverlayTextures().setAll(0);
      const x = tool.position.x;
      const y = tool.position.y;
      const z = tool.position.z;
      let n = tool.nVoxel.getDataSection(x, y + 1, z)?.loadIn(x, y + 1, z);
      if (n && !tool.voxel.isSameVoxel(n)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Up);
        if (tool.voxel.getLevel() == 15 && tool.voxel.getLevelState() != 1) {
          OutlinedVoxelTool.addTo.bottom(tool);
        }
        LiquidVoxelShape.add.up();
      }
      tool.getOverlayTextures().setAll(0);
      n = tool.nVoxel.getDataSection(x, y - 1, z)?.loadIn(x, y - 1, z);
      if (n && !tool.voxel.isSameVoxel(n)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Down);
        LiquidVoxelShape.add.down();
      }
      n = tool.nVoxel.getDataSection(x + 1, y, z)?.loadIn(x + 1, y, z);
      if (n && !tool.voxel.isSameVoxel(n)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.East);
        LiquidVoxelShape.add.east();
      }
      n = tool.nVoxel.getDataSection(x - 1, y, z)?.loadIn(x - 1, y, z);
      if (n && !tool.voxel.isSameVoxel(n)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.West);
        LiquidVoxelShape.add.west();
      }
      n = tool.nVoxel.getDataSection(x, y, z + 1)?.loadIn(x, y, z + 1);
      if (n && !tool.voxel.isSameVoxel(n)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.South);
        LiquidVoxelShape.add.south();
      }
      n = tool.nVoxel.getDataSection(x, y, z - 1)?.loadIn(x, y, z - 1);
      if (n && !tool.voxel.isSameVoxel(n)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.North);
        LiquidVoxelShape.add.north();
      }
    },
  };
}
