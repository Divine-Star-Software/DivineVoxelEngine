import type { WorldLockTasks } from "../../Tasks/Tasks.types";
import type { LocationData } from "../../Math";

import { WorldRegister } from "../../World/WorldRegister.js";
import { WorldSpaces } from "../../World/WorldSpaces.js";
import { SafeInterval } from "@amodx/core/Intervals/SafeInterval.js";
import { WorldStorageInterface } from "../../World/Storage/WorldStorage.interface";

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
      } = WorldSpaces.column.getPositionXYZ(ssx, ssy, ssz);
      const {
        x: ex,
        y: ey,
        z: ez,
      } = WorldSpaces.column.getPositionXYZ(esx, esy, esz);
      const run = async () => {
        let allFound = true;
        for (
          let y = sy;
          y < ey + WorldSpaces.column.bounds.y;
          y += WorldSpaces.column.bounds.y
        ) {
          for (let x = sx; x <= ex; x += WorldSpaces.column.bounds.x) {
            for (let z = sz; z <= ez; z += WorldSpaces.column.bounds.z) {
              const columnPos = WorldSpaces.column.getPositionXYZ(x, y, z);
              const location: LocationData = [
                taskData[0],
                columnPos.x,
                columnPos.y,
                columnPos.z,
              ] as LocationData;
              location[0] = dim;
              WorldRegister.setDimension(location[0]);
              if (
                WorldRegister.column.get(location[1], location[2], location[3])
              )
                continue;
              allFound = false;
              const key = location.toString();
              if (this._loadMap.has(key)) continue;
              this._loadMap.set(key, true);
              let success = false;
              if (!this.worldStorage) {
                if (
                  WorldRegister.column.get(
                    location[1],
                    location[2],
                    location[3]
                  )
                ) {
                  success = true;
                }
              } else {
                success = await this.worldStorage.loadColumn(location);
              }

              this._loadMap.delete(key);
              if (
                WorldRegister.column.get(location[1], location[2], location[3])
              )
                return;
              if (!success) {
                WorldRegister.column.fill(
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

      const inte = new SafeInterval().setInterval(100).setOnRun(async () => {
        const didRun = await run();
        if (didRun) {
          inte.stop();
          resolve(true);
        }
      });
      inte.start();
    });
  }

  static removeLock(data: WorldLockTasks) {
    this.locks.delete(data.toString());
  }

  static isLocked([sdim, x, y, z]: LocationData) {
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
