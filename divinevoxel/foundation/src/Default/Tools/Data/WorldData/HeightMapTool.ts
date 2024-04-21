import { Chunk } from "../../../../Data/World/Classes/index.js";
//types
import type { LocationData } from "@divinevoxel/core/Math";
//Data
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { WorldBounds } from "@divinevoxel/core/Data/World/WorldBounds.js";
//tools
import { LocationBoundTool } from "../../../Tools/Classes/LocationBoundTool.js";
import { ChunkDataTool } from "./ChunkDataTool.js";
//constants
import { ChunkTagIDs } from "../../../../Data/Constants/Tags/ChunkTagIds.js";
import { $2dMooreNeighborhood } from "@divinevoxel/core/Math/Constants/CardinalNeighbors.js";

export class HeightMapTool extends LocationBoundTool {
  static _chunkTool = new ChunkDataTool();

  chunk = {
    _c: <DataView>new DataView(new ArrayBuffer(0)),
    _y: 0,
    loadInAt: (x: number, y: number, z: number) => {
      const chunk = WorldRegister.instance.chunk.get([this.dimension, x, y, z]);
      if (!chunk) return false;
      HeightMapTool._chunkTool.setChunk(chunk);
      this.chunk._c = chunk.chunkState;
    },
    loadInAtLocation(location: LocationData) {
      const chunk = WorldRegister.instance.chunk.get(location);
      if (!chunk) return false;
      HeightMapTool._chunkTool.setChunk(chunk);
      this._c = chunk.chunkState;
    },
    setChunk(chunk: Chunk) {
      HeightMapTool._chunkTool.setChunk(chunk);
      this._c = chunk.chunkState;
    },
    setY(y: number) {
      WorldSpaces.voxel.setXYZ(0, y, 0);
      this._y = WorldSpaces.voxel.getPosition().y;
      return this;
    },
    getMinMax() {
      HeightMapTool._chunkTool._c = this._c;
      let min = Infinity;
      let max = -Infinity;
      let i = WorldSpaces.chunk.getHeight();
      while (i--) {
        if (this.setY(i).hasVoxels()) {
          if (i < min) min = i;
          if (i > max) max = i;
        }
      }
      return [min, max];
    },
    hasVoxels() {
      HeightMapTool._chunkTool._c = this._c;
      return (
        HeightMapTool._chunkTool.getArrayTagValue(
          ChunkTagIDs.heightMap,
          this._y
        ) == 1
      );
    },
    isDirty() {
      HeightMapTool._chunkTool._c = this._c;
      return (
        HeightMapTool._chunkTool.getArrayTagValue(
          ChunkTagIDs.dirtyMap,
          this._y
        ) == 1
      );
    },
    setHasVoxels(hasVoxels: boolean) {
      HeightMapTool._chunkTool._c = this._c;
      return HeightMapTool._chunkTool.setArrayTagValue(
        ChunkTagIDs.heightMap,
        this._y,
        hasVoxels ? 1 : 0
      );
    },
    setDirty(isDirty: boolean) {
      HeightMapTool._chunkTool._c = this._c;
      return HeightMapTool._chunkTool.setArrayTagValue(
        ChunkTagIDs.dirtyMap,
        this._y,
        isDirty ? 1 : 0
      );
    },
  };

  column = {
    getRelative(location: LocationData) {
      location = [...location];
      const chunkWidth = WorldSpaces.chunk._bounds.x;
      const chunkDepth = WorldSpaces.chunk._bounds.z;
      let maxHeight = -Infinity;
      const [dimension, x, y, z] = location;
      for (const check of $2dMooreNeighborhood) {
        location[1] = check[0] * chunkWidth + x;
        location[3] = check[1] * chunkDepth + z;
        const height = this.getAbsolute(location);
        if (height > maxHeight) {
          maxHeight = height;
        }
      }
      return maxHeight;
    },
    getAbsolute: (location: LocationData) => {
      const column = WorldRegister.instance.column.get(location);
      if (!column) return WorldBounds.bounds.MinY;
      if (column.chunks.length == 0) return WorldBounds.bounds.MinY;
      let maxHeight = WorldBounds.bounds.MinY;
      for (const chunk of column.chunks) {
        if (!chunk) continue;

        this.chunk.setChunk(chunk);
        const chunkPOS = HeightMapTool._chunkTool.getPositionData();
        let [chunkMin, chunkMax] = this.chunk.getMinMax();
        if (chunkMax == 0) continue;
        chunkMax += chunkPOS.y;
        if (maxHeight < chunkMax) {
          maxHeight = chunkMax;
        }
      }
      return maxHeight + 1;
    },
  };

  /*  chunk = {
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
 }; */
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
