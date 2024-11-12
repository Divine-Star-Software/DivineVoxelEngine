import type { WorldLockTasks } from "../../../Types/Tasks.types";
import type { LocationData } from "../../../Math";

import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { DataLoaderTool } from "../../../DataLoader/World/Tools/DataLoaderTool.js";
import { SafeInterval } from "@amodx/core/Intervals/SafeInterval.js";

export const WorldLock = {
  locks: new Map<string, WorldLockTasks>(),
  dataLoader: <DataLoaderTool>{},
  init(dataLoaderTool: DataLoaderTool) {
    this.dataLoader = dataLoaderTool;
  },

  _loadMap: new Map<string, boolean>(),

  addLock(taskData: WorldLockTasks) {
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
          y < ey + WorldSpaces.column._bounds.y;
          y += WorldSpaces.column._bounds.y
        ) {
          for (let x = sx; x <= ex; x += WorldSpaces.column._bounds.x) {
            for (let z = sz; z <= ez; z += WorldSpaces.column._bounds.z) {
              const columnPos = WorldSpaces.column.getPositionXYZ(x, y, z);
              const location: LocationData = [
                taskData[0],
                columnPos.x,
                columnPos.y,
                columnPos.z,
              ] as LocationData;
              location[0] = dim;
              WorldRegister.instance.setDimension(location[0]);
              if (
                WorldRegister.instance.column.get(
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
              if (!this.dataLoader.isEnabled()) {
                if (
                  WorldRegister.instance.column.get(
                    location[1],
                    location[2],
                    location[3]
                  )
                ) {
                  success = true;
                }
              } else {
                success = await this.dataLoader.loadIfExists(location);
              }

              this._loadMap.delete(key);
              if (
                WorldRegister.instance.column.get(
                  location[1],
                  location[2],
                  location[3]
                )
              )
                return;
              if (!success) {
                WorldRegister.instance.column.fill(
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
  },

  removeLock(data: WorldLockTasks) {
    this.locks.delete(data.toString());
  },

  isLocked([sdim, x, y, z]: LocationData) {
    let locked = false;

    for (const [key, [dim, [sx, sy, sz], [ex, ey, ez]]] of this.locks) {
      if (dim != sdim) continue;
      if (x >= sx && y >= sy && z >= sz && x <= ex && y <= ey && z <= ez)
        continue;
      locked = true;
      break;
    }

    return locked;
  },
};
