//types
import type { ConstructorTextureData } from "../../../../Textures/Constructor.types";

import type { DirectionNames } from "@divinevoxel/core/Types/Util.types.js";
//utils

//constructors
import { SimpleBoxVoxelConstructor } from "./Classes/Box/SimpleBox.constructor.js";
import {
  PillarBoxVoxelConstructor,
  PillarBoxVoxelConstructorData,
} from "./Classes/Box/PillarBox.constructor.js";
import { SimpleLiquidConstructor } from "./Classes/Liquid/SimpleLiquid.constructor.js";
import { SimplePanelVoxelConstructor } from "./Classes/Panel/SimplePanel.constructor.js";
import { SimpleStairVoxelConstructor } from "./Classes/Stair/SimpleStair.constructor.js";
import { VoxelConstructor } from "./Classes/VoxelConstructor.js";
import { SimpleCrossedPanelVoxelConstructor } from "./Classes/Panel/SimpleCrossedPanel.constructor.js";
import { UtilMap } from "../../../../Util/UtilMap";
import { ShapeStateBoxVoxelConstructor } from "./Classes/Box/ShapeStateBox.constructor";
import { VoxelFaces } from "@divinevoxel/core/Math";

export class VoxelConstructors {
  static constructors = new UtilMap<string, VoxelConstructor>();
  static get(id: string): VoxelConstructor {
    return <VoxelConstructor>this.constructors.get(id);
  }
  static registerVoxel(voxel: VoxelConstructor | VoxelConstructor[]) {
    if (Array.isArray(voxel)) {
      for (const vox of voxel) {
        this.constructors.set(vox.id, vox);
      }
      return;
    }
    this.constructors.set(voxel.id, voxel);
  }

  static defaults = {
    box: {
      shapeState(
        id: string,
        textures:
          | ConstructorTextureData[]
          | Record<VoxelFaces, ConstructorTextureData[]>
      ) {
        return new ShapeStateBoxVoxelConstructor(id, textures);
      },
      simple(
        id: string,
        textures:
          | ConstructorTextureData
          | Record<DirectionNames, ConstructorTextureData>
      ) {
        return new SimpleBoxVoxelConstructor(id, textures);
      },
      pillar(id: string, textures: PillarBoxVoxelConstructorData) {
        return new PillarBoxVoxelConstructor(id, textures);
      },
    },
    stair: {
      simple(id: string, texture: ConstructorTextureData) {
        return new SimpleStairVoxelConstructor(id, texture);
      },
    },
    panel: {
      simple(id: string, texture: ConstructorTextureData) {
        return new SimplePanelVoxelConstructor(id, texture);
      },
    },
    crossedPanel: {
      simple(id: string, texture: ConstructorTextureData) {
        return new SimpleCrossedPanelVoxelConstructor(id, texture);
      },
    },
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
