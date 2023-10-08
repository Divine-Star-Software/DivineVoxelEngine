import { BoxVoxelShape, VoxelConstructor } from "@divinevoxel/core/Constructor";

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
      if (tool.isFaceExposed("top")) {
        tool.setTexture(uv).calculateLight("top");
        BoxVoxelShape.add.top();
      }
      if (tool.isFaceExposed("bottom")) {
        tool.setTexture(uv).calculateLight("bottom");
        BoxVoxelShape.add.bottom();
      }
      if (tool.isFaceExposed("east")) {
        tool.setTexture(uv).calculateLight("east");
        BoxVoxelShape.add.east();
      }
      if (tool.isFaceExposed("west")) {
        tool.setTexture(uv).calculateLight("west");
        BoxVoxelShape.add.west();
      }
      if (tool.isFaceExposed("south")) {
        tool.setTexture(uv).calculateLight("south");
        BoxVoxelShape.add.south();
      }
      if (tool.isFaceExposed("north")) {
        tool.setTexture(uv).calculateLight("north");
        BoxVoxelShape.add.north();
      }
    },
  };
}
