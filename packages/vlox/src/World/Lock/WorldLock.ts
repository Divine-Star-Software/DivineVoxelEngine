import type { WorldLockTasks } from "../../Tasks/Tasks.types";
import type { LocationData } from "../../Math";

import { WorldRegister } from "../../World/WorldRegister.js";
import { WorldSpaces } from "../../World/WorldSpaces.js";
import { WorldStorageInterface } from "../Types/WorldStorage.interface";

export class WorldLock {
  static locks = new Map<string, WorldLockTasks>();
  static _loadMap = new Map<string, boolean>();
  static worldStorage: WorldStorageInterface | null = null;

  static addLock(taskData: WorldLockTasks) {
    return new Promise(async (resolve) => {
      this.locks.set(taskData.toString(), taskData);
      const [dim, [ssx, ssy, ssz], [esx, esy, esz]] = taskData;
      const {
        x: sx,
        y: sy,
        z: sz,
      } = WorldSpaces.sector.getPosition(ssx, ssy, ssz);
      const {
        x: ex,
        y: ey,
        z: ez,
      } = WorldSpaces.sector.getPosition(esx, esy, esz);
      const run = async () => {
        let allFound = true;
        for (
          let y = sy;
          y < ey + WorldSpaces.sector.bounds.y;
          y += WorldSpaces.sector.bounds.y
        ) {
          for (let x = sx; x <= ex; x += WorldSpaces.sector.bounds.x) {
            for (let z = sz; z <= ez; z += WorldSpaces.sector.bounds.z) {
              const sectorPos = WorldSpaces.sector.getPosition(x, y, z);
              const location: LocationData = [
                taskData[0],
                sectorPos.x,
                sectorPos.y,
                sectorPos.z,
              ] as LocationData;
              location[0] = dim;

              if (
                WorldRegister.sectors.get(
                  location[0],
                  location[1],
                  location[2],
                  location[3]
                )
              )
                continue;
              allFound = false;
              const key = location.toString();
              if (this._loadMap.has(key)) continue;
              this._loadMap.set(key, true);
              let success = false;
              if (!this.worldStorage) {
                if (
                  WorldRegister.sectors.get(
                    location[0],
                    location[1],
                    location[2],
                    location[3]
                  )
                ) {
                  success = true;
                }
              } else {
                success = await this.worldStorage.loadSector(location);
              }

              this._loadMap.delete(key);
              if (
                WorldRegister.sectors.get(
                  location[0],
                  location[1],
                  location[2],
                  location[3]
                )
              )
                return;
              if (!success) {
                WorldRegister.sectors.new(
                  location[0],
                  location[1],
                  location[2],
                  location[3]
                );
              }
            }
          }
        }
        return allFound;
      };
      const didRun = await run();
      if (didRun) return resolve(true);

      const readyCheck = async () => {
        const didRun = await run();
        if (didRun) {
          resolve(true);
          return;
        }
        setTimeout(readyCheck, 10);
      };
      readyCheck();
    });
  }

  static removeLock(data: WorldLockTasks) {
    this.locks.delete(data.toString());
  }

  static isLocked(sdim: number, x: number, y: number, z: number) {
    if (!this.locks.size) return false;
    let locked = false;

    for (const [key, [dim, [sx, sy, sz], [ex, ey, ez]]] of this.locks) {
      if (dim != sdim) continue;
      if (x >= sx && y >= sy && z >= sz && x <= ex && y <= ey && z <= ez)
        continue;
      locked = true;
      break;
    }

    return locked;
  }
}
