import { VoxelConstructor } from "@divinevoxel/foundation/Builder/Constructors/Voxel/Classes/VoxelConstructor";
import { BoxVoxelShape } from "@divinevoxel/foundation/Builder/Shapes/default/Box/Box.voxel.shape";

import { DataTool } from "@divinevoxel/core/Tools/Data/DataTool";
const getData = (dataTool: DataTool, x: number, y: number, z: number) => {
  let data = 0;
  if (dataTool.loadInAt(x, y, z)) {
    data = dataTool.getLight();
  }
  return data;
};

export function GetLightDebugBox(): VoxelConstructor {
  const textures: number[] = [];
  return {
    id: "dve_light_debug",
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
      const [dimension, x, y, z] = tool.voxel.getLocation();
      const dt = tool.nVoxel;

      if (tool.isFaceExposed("up")) {
        tool
          .setTexture(textures[getData(dt, x, y + 1, z) || 0])
          .calculateLight("up");
        BoxVoxelShape.add.up();
      }
      if (tool.isFaceExposed("down")) {
        tool
          .setTexture(textures[getData(dt, x, y - 1, z) || 0])
          .calculateLight("down");
        BoxVoxelShape.add.down();
      }
      if (tool.isFaceExposed("east")) {
        tool
          .setTexture(textures[getData(dt, x + 1, y, z) || 0])
          .calculateLight("east");
        BoxVoxelShape.add.east();
      }
      if (tool.isFaceExposed("west")) {
        tool
          .setTexture(textures[getData(dt, x - 1, y, z) || 0])
          .calculateLight("west");
        BoxVoxelShape.add.west();
      }
      if (tool.isFaceExposed("south")) {
        tool
          .setTexture(textures[getData(dt, x, y, z - 1) || 0])
          .calculateLight("south");
        BoxVoxelShape.add.south();
      }
      if (tool.isFaceExposed("north")) {
        tool
          .setTexture(textures[getData(dt, x, y, z + 1) || 0])
          .calculateLight("north");
        BoxVoxelShape.add.north();
      }
    },
  };
}
