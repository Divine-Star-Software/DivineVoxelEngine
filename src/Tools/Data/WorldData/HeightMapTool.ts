//types
import type { ChunkData, Column } from "Meta/Data/WorldData.types";
import type { VoxelTemplateSubstanceType } from "Meta/Data/Voxels/Voxel.types.js";
//Data
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "./ChunkDataTool.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
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
  loadInAt(x: number, y: number, z: number) {
   const chunk = WorldRegister.chunk.get([this._s._data.dimension, x, y, z]);
   if (!chunk) return false;
   HeightMapTool._chunkTool.setChunk(chunk);
   this._c = chunk.data;
  },
  loadInAtLocation(location: LocationData) {
   const chunk = WorldRegister.chunk.get(location);
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
  getMinMax() {
   HeightMapTool._chunkTool._c = this._c;
   return [
    HeightMapTool._chunkTool.getTagValue("#dve_min_height"),
    HeightMapTool._chunkTool.getTagValue("#dve_max_height"),
   ];
  },
  getMin(substance: VoxelTemplateSubstanceType | "all" = "all") {
   HeightMapTool._chunkTool._c = this._c;
   if (substance == "all") {
    return HeightMapTool._chunkTool.getTagValue("#dve_min_height");
   }
   return 0;
  },
  getMax(substance: VoxelTemplateSubstanceType | "all" = "all") {
   HeightMapTool._chunkTool._c = this._c;
   if (substance == "all") {
    return HeightMapTool._chunkTool.getTagValue("#dve_max_height");
   }
   return 0;
  },
  update(
   mode: "remove" | "add",
   substance: VoxelTemplateSubstanceType | "all" = "all",
   location: LocationData
  ) {
   if (mode == "add") {
    HeightMapTool._chunkTool._c = this._c;
    const minY = HeightMapTool._chunkTool.getTagValue("#dve_min_height");
    const maxY = HeightMapTool._chunkTool.getTagValue("#dve_max_height");
    const voxelPOS = WorldSpaces.voxel.getPositionLocation(location);
    if (minY > voxelPOS.y) {
     HeightMapTool._chunkTool.setTagValue("#dve_min_height", voxelPOS.y);
    }
    if (maxY < voxelPOS.y) {
     HeightMapTool._chunkTool.setTagValue("#dve_max_height", voxelPOS.y);
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
