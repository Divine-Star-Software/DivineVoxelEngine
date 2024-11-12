import { Chunk } from "../../../Data/World/Classes/index.js";
//types
import type { LocationData } from "../../../Math";
//Data
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
//tools
import { LocationBoundTool } from "../../../Tools/Classes/LocationBoundTool.js";
import { ChunkDataTool } from "./ChunkDataTool.js";
//constants
import { ChunkStructProperties } from "../../../Data/Constants/Structs/ChunkStructProperties.js";
import { $2dMooreNeighborhood } from "../../../Math/Constants/CardinalNeighbors.js";
import { Vec3Array } from "@amodx/math";

export class HeightMapTool extends LocationBoundTool {
  static _chunkTool = new ChunkDataTool();

  chunk = {
    _c: <DataView>new DataView(new ArrayBuffer(0)),
    _y: 0,
    loadInAt: (x: number, y: number, z: number) => {
      WorldRegister.instance.setDimension(this.dimension);
      const chunk = WorldRegister.instance.chunk.get(x, y, z);
      if (!chunk) return false;
      HeightMapTool._chunkTool.setChunk(chunk);
      this.chunk._c = chunk.chunkState;
    },
    loadInAtLocation(location: LocationData) {
      WorldRegister.instance.setDimension(location[0]);
      const chunk = WorldRegister.instance.chunk.get(
        location[1],
        location[2],
        location[3]
      );
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
        if (this.setY(i).hasVoxels() || this.setY(i).isDirty()) {
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
          ChunkStructProperties.heightMap,
          this._y
        ) == 1
      );
    },
    isDirty() {
      HeightMapTool._chunkTool._c = this._c;
      return (
        HeightMapTool._chunkTool.getArrayTagValue(
          ChunkStructProperties.dirtyMap,
          this._y
        ) == 1
      );
    },
    setHasVoxels(hasVoxels: boolean) {
      HeightMapTool._chunkTool._c = this._c;
      return HeightMapTool._chunkTool.setArrayTagValue(
        ChunkStructProperties.heightMap,
        this._y,
        hasVoxels ? 1 : 0
      );
    },
    setDirty(isDirty: boolean) {
      HeightMapTool._chunkTool._c = this._c;
      return HeightMapTool._chunkTool.setArrayTagValue(
        ChunkStructProperties.dirtyMap,
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
      WorldRegister.instance.setDimension(location[0]);
      const column = WorldRegister.instance.column.get(
        location[1],
        location[2],
        location[3]
      );
      if (!column) return WorldBounds.bounds.MinY;
      if (column.chunks.length == 0) return WorldBounds.bounds.MinY;
      let maxHeight = WorldBounds.bounds.MinY;
      const positon: Vec3Array = [location[1], location[2], location[3]];
      let y = positon[1];
      for (let i = 0; i < column.chunks.length; i++) {
        const chunk = column.chunks[i];
        if (!chunk) continue;

        this.chunk.setChunk(chunk);
        const chunkPOS = y + i * WorldSpaces.chunk._bounds.y;

        let [chunkMin, chunkMax] = this.chunk.getMinMax();
        if (Math.abs(chunkMax) == Infinity) continue;
        chunkMax = chunkPOS + chunkMax;
        if (maxHeight < chunkMax) {
          maxHeight = chunkMax;
        }
      }

      return maxHeight + 1;
    },
  };
}
