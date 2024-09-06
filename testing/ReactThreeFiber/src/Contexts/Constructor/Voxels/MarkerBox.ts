import { VoxelConstructor } from "@divinevoxel/foundation/Builder/Constructors/Voxel/Classes/VoxelConstructor";
import { BoxVoxelShape } from "@divinevoxel/foundation/Builder/Shapes/default/Box/Box.voxel.shape";

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
      if (tool.isFaceExposed("up")) {
        tool.setTexture(uv).calculateLight("up");
        BoxVoxelShape.add.up();
      }
      if (tool.isFaceExposed("down")) {
        tool.setTexture(uv).calculateLight("down");
        BoxVoxelShape.add.down();
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
