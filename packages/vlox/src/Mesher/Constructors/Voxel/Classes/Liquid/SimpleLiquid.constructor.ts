import type { ConstructorTextureData } from "../../../../../Textures/Constructor.types";

import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../Textures/TextureRegister.js";
import { LiquidVoxelShape } from "../../../../Shapes/default/Liquid/Liquid.voxel.shape.js";
import { VoxelFaces } from "../../../../../Math";

export class SimpleLiquidConstructor extends VoxelConstructor {
  textures: number[] = [];
  constructor(
    public id: string,
    public textureData: [ConstructorTextureData, ConstructorTextureData]
  ) {
    super();
  }
  process(tool: VoxelMesherDataTool) {
    LiquidVoxelShape.start();
    tool.getOverlayTextures().setAll(0);
    const x = tool.position.x;
    const y = tool.position.y;
    const z = tool.position.z;

    let n = tool.nVoxel.getVoxel(x, y + 1, z);
    if (n && !tool.voxel.isSameVoxel(n)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.Up, true);
      LiquidVoxelShape.add.up();
    }
    n = tool.nVoxel.getVoxel(x, y - 1, z);
    if (n && !tool.voxel.isSameVoxel(n)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.Down, true);
      LiquidVoxelShape.add.down();
    }
    n = tool.nVoxel.getVoxel(x + 1, y, z);
    if (n && !tool.voxel.isSameVoxel(n)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.East, true);
      LiquidVoxelShape.add.east();
    }
    n = tool.nVoxel.getVoxel(x - 1, y, z);
    if (n && !tool.voxel.isSameVoxel(n)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.West, true);
      LiquidVoxelShape.add.west();
    }
    n = tool.nVoxel.getVoxel(x, y, z + 1);
    if (n && !tool.voxel.isSameVoxel(n)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.South, true);
      LiquidVoxelShape.add.south();
    }
    n = tool.nVoxel.getVoxel(x, y, z - 1);
    if (n && !tool.voxel.isSameVoxel(n)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.North, true);
      LiquidVoxelShape.add.north();
    }
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {
    for (const text of this.textureData) {
      this.textures.push(textureManager.getTextureUV(text));
    }
  }
}
