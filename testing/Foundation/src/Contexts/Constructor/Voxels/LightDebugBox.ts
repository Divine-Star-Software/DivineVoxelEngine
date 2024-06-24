import { VoxelFaces } from "@divinevoxel/core/Math";

import { VoxelConstructor } from "@divinevoxel/foundation/Default/Builder/Constructors/Voxel/Classes/VoxelConstructor";
import { BoxVoxelShape } from "@divinevoxel/foundation/Default/Builder/Shapes/default/Box/Box.voxel.shape";

import { DataTool } from "@divinevoxel/foundation/Default/Tools/Data/DataTool";
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

      if (tool.isFaceExposed(VoxelFaces.Top)) {
        tool
          .setTexture(textures[getData(dt, x, y + 1, z) || 0])
          .calculateLight(VoxelFaces.Top);
        BoxVoxelShape.add.top();
      }
      if (tool.isFaceExposed(VoxelFaces.Bottom)) {
        tool
          .setTexture(textures[getData(dt, x, y - 1, z) || 0])
          .calculateLight(VoxelFaces.Bottom);
        BoxVoxelShape.add.bottom();
      }
      if (tool.isFaceExposed(VoxelFaces.East)) {
        tool
          .setTexture(textures[getData(dt, x + 1, y, z) || 0])
          .calculateLight(VoxelFaces.East);
        BoxVoxelShape.add.east();
      }
      if (tool.isFaceExposed(VoxelFaces.West)) {
        tool
          .setTexture(textures[getData(dt, x - 1, y, z) || 0])
          .calculateLight(VoxelFaces.West);
        BoxVoxelShape.add.west();
      }
      if (tool.isFaceExposed(VoxelFaces.South)) {
        tool
          .setTexture(textures[getData(dt, x, y, z - 1) || 0])
          .calculateLight(VoxelFaces.South);
        BoxVoxelShape.add.south();
      }
      if (tool.isFaceExposed(VoxelFaces.North)) {
        tool
          .setTexture(textures[getData(dt, x, y, z + 1) || 0])
          .calculateLight(VoxelFaces.North);
        BoxVoxelShape.add.north();
      }
    },
  };
}
