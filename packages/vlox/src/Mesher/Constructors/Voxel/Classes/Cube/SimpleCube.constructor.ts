import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { CubeVoxelShape } from "../../../../Shapes/default/Cube/Cube.voxel.shape.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../Textures/TextureRegister.js";
import { DirectionNames } from "../../../../../Types";
import type { ConstructorTextureData } from "../../../../../Textures/Constructor.types.js";
import { VoxelFaces } from "../../../../../Math/index.js";

export class SimpleCubeVoxelConstructor extends VoxelConstructor {
  textures: number[] = [];
  constructor(
    public id: string,
    public textureData:
      | ConstructorTextureData
      | Record<DirectionNames, ConstructorTextureData>
  ) {
    super();
  }
  process(tool: VoxelMesherDataTool) {
    tool.getOverlayTextures().setAll(0);
    if (tool.isFaceExposed(VoxelFaces.Up)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.Up);
      CubeVoxelShape.add.up();
    }
    if (tool.isFaceExposed(VoxelFaces.Down)) {
      tool.setTexture(this.textures[1]).calculateLight(VoxelFaces.Down);
      CubeVoxelShape.add.down();
    }
    if (tool.isFaceExposed(VoxelFaces.East)) {
      tool.setTexture(this.textures[2]).calculateLight(VoxelFaces.East);
      CubeVoxelShape.add.east();
    }
    if (tool.isFaceExposed(VoxelFaces.West)) {
      tool.setTexture(this.textures[3]).calculateLight(VoxelFaces.West);
      CubeVoxelShape.add.west();
    }
    if (tool.isFaceExposed(VoxelFaces.South)) {
      tool.setTexture(this.textures[4]).calculateLight(VoxelFaces.South);
      CubeVoxelShape.add.south();
    }
    if (tool.isFaceExposed(VoxelFaces.North)) {
      tool.setTexture(this.textures[5]).calculateLight(VoxelFaces.North);
      CubeVoxelShape.add.north();
    }
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {
    const textures = this.textureData;

    if (Array.isArray(textures)) {
      let i = 6;
      while (i--) {
        this.textures.push(textureManager.getTextureUV(textures));
      }

      return;
    }
    this.textures.push(textureManager.getTextureUV(textures.up));
    this.textures.push(textureManager.getTextureUV(textures.down));
    this.textures.push(textureManager.getTextureUV(textures.east));
    this.textures.push(textureManager.getTextureUV(textures.west));
    this.textures.push(textureManager.getTextureUV(textures.south));
    this.textures.push(textureManager.getTextureUV(textures.north));
  }
}
