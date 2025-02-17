import type { LocationData } from "../../Math";

import { WorldSpaces } from "../../World/WorldSpaces.js";
import { BrushTool } from "../../Tools/Brush/Brush";

import { RawVoxelData } from "../../Voxels/Types/Voxel.types";
import { WorldRegister } from "../../World/WorldRegister";
import { Thread } from "@amodx/threads";

const brush = new BrushTool();
const dataTool = brush.voxelCursor;

export class WorldGenRegister {
  static _worldThread: Thread;
  static MAX_ATTEMPTS = 100;
  static _requests = new Map<
    string,
    {
      attempts: number;
      dimension: number;
      sections: Map<string, [x: number, y: number, z: number]>;
      voxels: [x: number, y: number, z: number, data: RawVoxelData][];
    }
  >();

  static registerRequest(location: Readonly<LocationData>) {
    const id = location.toString();
    this._requests.set(id, {
      attempts: 0,
      sections: new Map(),
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
      location[2] < WorldSpaces.world.bounds.MinY ||
      location[2] >= WorldSpaces.world.bounds.MaxY
    )
      return false;
    const requests = this._requests.get(registerId);
    if (!requests) return;
    const sector = WorldRegister.sectors.get(
      location[0],
      location[1],
      location[2],
      location[3]
    );
    if (!sector) {
      const sectorPos = WorldSpaces.sector.getPosition(
        location[1],
        location[2],
        location[3]
      );
      const sectorKey = WorldSpaces.hash.hashVec3(sectorPos);

      if (!requests.sections.has(sectorKey)) {
        this._worldThread.runTask("add-sector", [
          requests.dimension,
          sectorPos.x,
          sectorPos.y,
          sectorPos.z,
        ]);
        requests.sections.set(sectorKey, [
          sectorPos.x,
          sectorPos.y,
          sectorPos.z,
        ]);
      }
    }
    const [dim, x, y, z] = location;
    requests.voxels.push([x, y, z, rawData]);
  }

  static attemptRequestFullFill(registerId: string) {
    const requests = this._requests.get(registerId);
    if (!requests || !requests.voxels.length) return true;
    let done = true;
    for (const [key, pos] of requests.sections) {
      if (!WorldSpaces.world.inBounds(pos[0], pos[1], pos[2])) continue;
      const sector = WorldRegister.sectors.get(
        requests.dimension,
        pos[0],
        pos[1],
        pos[2]
      );
      if (!sector) {
        done = false;
        this._worldThread.runTask("add-sector", [
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
