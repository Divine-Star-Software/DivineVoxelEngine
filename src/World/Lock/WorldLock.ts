import type { WorldLockTasks } from "Meta/Tasks/Tasks.types.js";
import type { LocationData } from "voxelspaces";

import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { DataLoaderTool } from "../../Tools/Loader/DataLoaderTool.js";
import { UtilMap } from "../../Global/Util/UtilMap.js";

export const WorldLock = {
 locks: new UtilMap<string, WorldLockTasks>(),
 dataLoader: <DataLoaderTool>{},
 $INIT(dataLoaderTool: DataLoaderTool) {
  this.dataLoader = dataLoaderTool;
 },

 _loadMap: new UtilMap<string, boolean>(),

 addLock(data: WorldLockTasks) {
  return new Promise((resolve) => {
   this.locks.add([[data.toString(), data]]);
   const [dim, [ssx, ssy, ssz], [esx, esy, esz]] = data;
   const [a, sx, sy, sz] = WorldSpaces.column.getLocationXYZ(ssx, ssy, ssz);
   const [b, ex, ey, ez] = WorldSpaces.column.getLocationXYZ(esx, esy, esz);
   const run = () => {
    let allFound = true;
    for (let y = sy; y < ey; y += WorldSpaces.column._bounds.y) {
     for (let x = sx; x < ex; x += WorldSpaces.column._bounds.x) {
      for (let z = sz; z < ez; z += WorldSpaces.column._bounds.z) {
       const location: LocationData = [
        ...WorldSpaces.column.getLocationXYZ(x, y, z),
       ];
       location[0] = dim;
       if (WorldRegister.column.get(location)) continue;
       allFound = false;
       if (!this.dataLoader.isEnabled()) {
        WorldRegister.column.fill(location);
        continue;
       }
       const key = location.toString();
       if (this._loadMap.has(key)) continue;
       this._loadMap.set(key, true);
       this.dataLoader.setLocation(location).loadIfExists((loaded) => {
        this._loadMap.remove(key);
        if (WorldRegister.column.get(location)) return;
        if (!loaded) {
         WorldRegister.column.fill(location);
        }
       });
      }
     }
    }
    return allFound;
   };
   if (run()) return resolve(true);

   const inte = setInterval(() => {
    if (run()) {
     clearInterval(inte);
     resolve(true);
    }
   }, 100);
  });
 },

 removeLock(data: WorldLockTasks) {
  this.locks.remove(data.toString());
 },

 isLocked([sdim, x, y, z]: LocationData) {
  let locked = false;

  for (const [key, [dim, [sx, sy, sz], [ex, ey, ez]]] of this.locks._map) {
   if (dim != sdim) continue;
   if (x >= sx && y >= sy && z >= sz && x <= ex && y <= ey && z <= ez) continue;
   locked = true;
   break;
  }
  return locked;
 },
};
