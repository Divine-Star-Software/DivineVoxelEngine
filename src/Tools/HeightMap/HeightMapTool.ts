//types
import type { ChunkData, Column } from "Meta/Data/WorldData.types";
import type { VoxelTemplateSubstanceType } from "Meta/index";
//Data
import { HeightMapData } from "../../Data/Chunk/HeightMapData.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";

export class HeightMapTool {
 _data = {
  dimension: "main",
 };

 constructor() {
  this.chunk._s = this;
  this.column._s = this;
 }

 setDimension(dimensionId: string) {
  this._data.dimension = dimensionId;
 }

 chunk = {
  _p: {
   x: 0,
   z: 0,
  },
  _c: <ChunkData>{},
  _s: <HeightMapTool>{},
  loadIn(x: number, y: number, z: number) {
   const chunk = WorldRegister.chunk.get(this._s._data.dimension, x, y, z);
   if (!chunk) return false;
   this._c = chunk;
  },
  setXZ(x: number, z: number) {
   this._p.x = x;
   this._p.z = z;
   return this;
  },
  getMin(substance: VoxelTemplateSubstanceType | "all" = "all") {
   if (substance == "all") {
    return HeightMapData.getLowestExposedVoxel(
     this._p.x,
     this._p.z,
     this._c.data
    );
   }
   return HeightMapData.getMaxYForSubstance(
    substance,
    this._p.x,
    this._p.z,
    this._c.data
   );
  },
  getMax(substance: VoxelTemplateSubstanceType | "all" = "all") {
   if (substance == "all") {
    return HeightMapData.getHighestExposedVoxel(
     this._p.x,
     this._p.z,
     this._c.data
    );
   }
   return HeightMapData.getMinYForSubstance(
    substance,
    this._p.x,
    this._p.z,
    this._c.data
   );
  },
 };
 column = {
  _c: <Column>{},
  _p: {
   x: 0,
   z: 0,
  },
  _s: <HeightMapTool>{},
  loadIn(x: number, z: number, y: number = 0) {
   const column = WorldRegister.column.get(this._s._data.dimension, x, z, y);
   if (!column) return false;
   this._c = column;
  },
  setXZ(x: number, z: number) {
   this._p.x = x;
   this._p.z = z;
   return this;
  },
  getMin() {},
  getMax() {},
 };
}
