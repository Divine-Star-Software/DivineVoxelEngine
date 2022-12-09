//types
import type { ChunkData, Column } from "Meta/Data/WorldData.types";
import type { VoxelTemplateSubstanceType } from "Meta/index";
//Data
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "./ChunkDataTool.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";

export class HeightMapTool {
 static _chunkTool = new ChunkDataTool();
 _data = {
  dimension: "main",
 };

 constructor() {
  this.chunk._s = this;
//  this.column._s = this;
 }

 setDimension(dimensionId: string) {
  this._data.dimension = dimensionId;
 }

 chunk = {
  _p: {
   x: 0,
   z: 0,
  },
  _c: <DataView>new DataView(new ArrayBuffer(0)),
  _s: <HeightMapTool>{},
  loadIn(x: number, y: number, z: number) {
   const chunk = WorldRegister.chunk.get(this._s._data.dimension, x, y, z);
   if (!chunk) return false;
   HeightMapTool._chunkTool.setChunk(chunk);
   this._c = chunk.data;
  },
  setChunk(chunk: ChunkData) {
   HeightMapTool._chunkTool.setChunk(chunk);
   this._c = chunk.data;
  },
  setXZ(x: number, z: number) {
   this._p.x = x;
   this._p.z = z;
   return this;
  },
  getMin(substance: VoxelTemplateSubstanceType | "all" = "all") {
   HeightMapTool._chunkTool._c = this._c;
   if (substance == "all") {
    return HeightMapTool._chunkTool.getTagValue("#dve:min_height");
   }
   return 0;
  },
  getMax(substance: VoxelTemplateSubstanceType | "all" = "all") {
    HeightMapTool._chunkTool._c = this._c;
   if (substance == "all") {
    return HeightMapTool._chunkTool.getTagValue("#dve:max_height");
   }
   return 0;
  },
  update(
   mode: "remove" | "add",
   substance: VoxelTemplateSubstanceType | "all" = "all",
   x: number,
   y: number,
   z: number
  ) {
   if (mode == "add") {
    HeightMapTool._chunkTool._c = this._c;
    const minY = HeightMapTool._chunkTool.getTagValue("#dve:min_height");
    const maxY = HeightMapTool._chunkTool.getTagValue("#dve:max_height");
    const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
    if (minY > voxelPOS.y) {
     HeightMapTool._chunkTool.setTagValue("#dve:min_height", voxelPOS.y);
    }
    if (maxY < voxelPOS.y) {
     HeightMapTool._chunkTool.setTagValue("#dve:max_height", voxelPOS.y);
    }
   }
  },
 };
/*  column = {
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
 }; */
}
