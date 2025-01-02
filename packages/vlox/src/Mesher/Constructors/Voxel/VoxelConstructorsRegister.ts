//types
import type { ConstructorTextureData } from "../../../Textures/Constructor.types";

import type { DirectionNames } from "../../../Types/Util.types.js";
//utils

//constructors

import { SimpleLiquidConstructor } from "./Classes/Liquid/SimpleLiquid.constructor.js";

import { VoxelConstructor } from "./Classes/VoxelConstructor.js";

import { VoxelFaces } from "../../../Math";

import { VoxelPalette } from "../../../Data/Voxel/VoxelPalette";

export class VoxelConstructorsRegister {
  static constructorsPaltte: VoxelConstructor[] = [];
  static constructors = new Map<string, VoxelConstructor>();
  static get(id: string): VoxelConstructor {
    return <VoxelConstructor>this.constructors.get(id);
  }
  static registerVoxel(voxel: VoxelConstructor | VoxelConstructor[]) {
    if (Array.isArray(voxel)) {
      for (const vox of voxel) {
        this.constructors.set(vox.id, vox);
        this.constructorsPaltte[VoxelPalette.ids.getNumberId(vox.id)] = vox;
      }
      return;
    }
    this.constructorsPaltte[VoxelPalette.ids.getNumberId(voxel.id)] = voxel;
    this.constructors.set(voxel.id, voxel);
  }

  static defaults = {
    liquid: {
      simple(
        id: string,
        textures: [ConstructorTextureData, ConstructorTextureData]
      ) {
        return new SimpleLiquidConstructor(id, textures);
      },
    },
  };
}
