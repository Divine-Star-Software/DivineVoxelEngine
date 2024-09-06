import { VoxelFaces } from "@divinevoxel/core/Math";

import { VoxelConstructor } from "@divinevoxel/foundation/Default/Mesher/Constructors/Voxel/Classes/VoxelConstructor";
import { CubeVoxelShape } from "@divinevoxel/foundation/Default/Mesher/Shapes/default/Cube/Cube.voxel.shape";

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

      if (tool.isFaceExposed(VoxelFaces.Up)) {
        tool
          .setTexture(textures[getData(dt, x, y + 1, z) || 0])
          .calculateLight(VoxelFaces.Up);
        CubeVoxelShape.add.up();
      }
      if (tool.isFaceExposed(VoxelFaces.Down)) {
        tool
          .setTexture(textures[getData(dt, x, y - 1, z) || 0])
          .calculateLight(VoxelFaces.Down);
        CubeVoxelShape.add.down();
      }
      if (tool.isFaceExposed(VoxelFaces.East)) {
        tool
          .setTexture(textures[getData(dt, x + 1, y, z) || 0])
          .calculateLight(VoxelFaces.East);
        CubeVoxelShape.add.east();
      }
      if (tool.isFaceExposed(VoxelFaces.West)) {
        tool
          .setTexture(textures[getData(dt, x - 1, y, z) || 0])
          .calculateLight(VoxelFaces.West);
        CubeVoxelShape.add.west();
      }
      if (tool.isFaceExposed(VoxelFaces.South)) {
        tool
          .setTexture(textures[getData(dt, x, y, z - 1) || 0])
          .calculateLight(VoxelFaces.South);
        CubeVoxelShape.add.south();
      }
      if (tool.isFaceExposed(VoxelFaces.North)) {
        tool
          .setTexture(textures[getData(dt, x, y, z + 1) || 0])
          .calculateLight(VoxelFaces.North);
        CubeVoxelShape.add.north();
      }
    },
  };
}
