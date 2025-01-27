import { Vec3Array } from "@amodx/math";
import { LocationData } from "../../Math";
import { $2dMooreNeighborhood } from "../../Math/Constants/CardinalNeighbors";
import { ChunkHeightMap } from "../../World/Chunk/ChunkHeightMap";
import { WorldBounds } from "../../World/WorldBounds";
import { WorldRegister } from "../../World/WorldRegister";
import { WorldSpaces } from "../../World/WorldSpaces";

export class ColumnHeightMap {
  static getRelative(location: LocationData) {
    location = [...location];
    const chunkWidth = WorldSpaces.chunk.bounds.x;
    const chunkDepth = WorldSpaces.chunk.bounds.z;
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
  }
  static getAbsolute(location: LocationData) {
    WorldRegister.setDimension(location[0]);
    const column = WorldRegister.column.get(
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

      ChunkHeightMap.setChunk(chunk);

      const chunkPOS = y + i * WorldSpaces.chunk.bounds.y;

      let [chunkMin, chunkMax] = ChunkHeightMap.getMinMax();
      if (Math.abs(chunkMax) == Infinity) continue;
      chunkMax = chunkPOS + chunkMax;
      if (maxHeight < chunkMax) {
        maxHeight = chunkMax;
      }
    }

    return maxHeight + 1;
  }
}
