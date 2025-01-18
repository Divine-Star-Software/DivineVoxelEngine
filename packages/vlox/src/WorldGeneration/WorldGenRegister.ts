import type { LocationData } from "../Math";

import { WorldSpaces } from "../Data/World/WorldSpaces.js";
import { BrushTool } from "../Tools/Brush/Brush";
import { ChunkDataTool } from "../Tools/Data/WorldData/ChunkDataTool";


import { WorldBounds } from "../Data/World/WorldBounds";
import { RawVoxelData } from "../Data/Types/VoxelData.types";
import { DivineVoxelEngineConstructor } from "../Contexts/Constructor";

const brush = new BrushTool();
const dataTool = brush.voxelCursor;
const chunkTool = new ChunkDataTool();
export class WorldGenRegister {
  static MAX_ATTEMPTS = 100;
  static _requests = new Map<
    string,
    {
      attempts: number;
      dimension: string;
      chunks: Map<string, [x: number, y: number, z: number]>;
      voxels: [x: number, y: number, z: number, data: RawVoxelData][];
    }
  >();

  static registerRequest(location: LocationData) {
    const id = location.toString();
    this._requests.set(id, {
      attempts: 0,
      chunks: new Map(),
      dimension: location[0],
      voxels: [],
    });
    return id;
  }

  static addToRequest(
    registerId: string,
    location: LocationData,
    rawData: RawVoxelData
  ) {
    if (
      location[2] < WorldBounds.bounds.MinY ||
      location[2] >= WorldBounds.bounds.MaxY
    )
      return false;
    const requests = this._requests.get(registerId);
    if (!requests) return;
    const chunkPOS = WorldSpaces.chunk.getPositionXYZ(
      location[1],
      location[2],
      location[3]
    );
    const chunkKey = WorldSpaces.chunk.getKeyXYZ(
      location[1],
      location[2],
      location[3]
    );
    if (!chunkTool.loadInAtLocation(location)) {
      if (!requests.chunks.has(chunkKey)) {
        DivineVoxelEngineConstructor.instance.threads.world.runTasks("add-chunk", [
          requests.dimension,
          chunkPOS.x,
          chunkPOS.y,
          chunkPOS.z,
        ]);
        requests.chunks.set(chunkKey, [chunkPOS.x, chunkPOS.y, chunkPOS.z]);
      }
    }
    const [dim, x, y, z] = location;
    requests.voxels.push([x, y, z, rawData]);
  }

  static attemptRequestFullFill(registerId: string) {
    const requests = this._requests.get(registerId);
    if (!requests || !requests.voxels.length) return true;
    chunkTool.setDimension(requests.dimension);

    let done = true;
    for (const [key, pos] of requests.chunks) {
      if (
        pos[0] < WorldBounds.bounds.MinX ||
        pos[0] > WorldBounds.bounds.MaxX ||
        pos[1] < WorldBounds.bounds.MinY ||
        pos[1] > WorldBounds.bounds.MaxY ||
        pos[2] < WorldBounds.bounds.MinZ ||
        pos[2] > WorldBounds.bounds.MaxZ
      ) {
        continue;
      }

      if (!chunkTool.loadInAt(pos[0], pos[1], pos[2])) {
        done = false;
        DivineVoxelEngineConstructor.instance.threads.world.runTasks("add-chunk", [
          requests.dimension,
          pos[0],
          pos[1],
          pos[2],
        ]);
      }
    }
    if (!done) {
      requests.attempts++;
      if (requests.attempts >= this.MAX_ATTEMPTS) {
        console.error(
          `World gen requests cancled after max attempts`,
          requests
        );
        this._requests.delete(registerId);
        return true;
      }
      return false;
    }
/*     brush.setDimension(requests.dimension);
    dataTool.setDimension(requests.dimension);
    const voxels = requests.voxels;
    brush.start();
    while (voxels.length) {
      const data = voxels.shift();
      if (!data) break;
      dataTool.loadInAt(data[0], data[1], data[2]);
      brush.setXYZ(data[0], data[1], data[2]).setRaw(data[3]).paint();
    } */
    brush.stop();
    this._requests.delete(registerId);
    return true;
  }
}
