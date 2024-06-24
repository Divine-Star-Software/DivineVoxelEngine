import { VoxelFaces } from "@divinevoxel/core/Math";

import { VoxelConstructor } from "@divinevoxel/foundation/Default/Builder/Constructors/Voxel/Classes/VoxelConstructor";
import { BoxVoxelShape } from "@divinevoxel/foundation/Default/Builder/Shapes/default/Box/Box.voxel.shape";

export function GetMarkerBox(): VoxelConstructor {
  const textures: number[] = [];

  return {
    id: "dve_marker_box",
    onTexturesRegistered(textureMangager) {
      for (let i = 0; i < 16; i++) {
        textures.push(
          textureMangager.getTextureUV([
            "#dve_solid",
            "dve_light_debug",
            `light-level-${i}`,
          ])
        );
      }
    },
    process(tool) {
      const uv = textures[tool.voxel.getState()];

      tool.getOverlayTextures().setAll(0);
      if (tool.isFaceExposed(VoxelFaces.Top)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Top);
        BoxVoxelShape.add.top();
      }
      if (tool.isFaceExposed(VoxelFaces.Bottom)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Bottom);
        BoxVoxelShape.add.bottom();
      }
      if (tool.isFaceExposed(VoxelFaces.East)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.East);
        BoxVoxelShape.add.east();
      }
      if (tool.isFaceExposed(VoxelFaces.West)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.West);
        BoxVoxelShape.add.west();
      }
      if (tool.isFaceExposed(VoxelFaces.South)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.South);
        BoxVoxelShape.add.south();
      }
      if (tool.isFaceExposed(VoxelFaces.North)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.North);
        BoxVoxelShape.add.north();
      }
    },
  };
}
