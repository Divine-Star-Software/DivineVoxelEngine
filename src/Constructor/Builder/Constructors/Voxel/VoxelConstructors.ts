//types
import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types.js";
import type { DirectionNames } from "Meta/Util.types.js";
import type { VoxelConstructor } from "Meta/Constructor/Voxel.types.js";
import {
 BoxVoxelConstructor,
 PillarBoxVoxelConstructor,
 PillarBoxVoxelConstructorData,
} from "./classes/Box.constructor.js";
import { LiquidVoxelConstructor } from "./classes/Liquid.constructor.js";
import { PanelVoxelConstructor } from "./classes/Panel.constructor.js";
export const VoxelConstructors = {
 voxelObjects: <Map<string, VoxelConstructor>>new Map(),
 getVoxel(id: string): VoxelConstructor {
  return <VoxelConstructor>this.voxelObjects.get(id);
 },
 registerVoxel(voxel: VoxelConstructor | VoxelConstructor[]) {
  if (Array.isArray(voxel)) {
   for (const vox of voxel) {
    this.voxelObjects.set(vox.id, vox);
   }
   return;
  }
  this.voxelObjects.set(voxel.id, voxel);
 },

 defaults: {
  box: {
   simple(
    id: string,
    textures:
     | ConstructorTextureData
     | Record<DirectionNames, ConstructorTextureData>
   ) {
    return new BoxVoxelConstructor(id, textures);
   },
   pillar(id: string, textures: PillarBoxVoxelConstructorData) {
    return new PillarBoxVoxelConstructor(id, textures);
   },
  },
  panel: {
   simple(id: string, texture: ConstructorTextureData) {
    return new PanelVoxelConstructor(id, texture);
   },
  },
  liquid: {
   simple(
    id: string,
    textures: [ConstructorTextureData, ConstructorTextureData]
   ) {
    return new LiquidVoxelConstructor(id, textures);
   },
  },
 },
};
