import { LightData } from "../../../Data/Light/LightByte.js";
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { VoxelMath } from "../.././../Libs/Math/VoxelMath.js";
import { Propagation } from "../Propagation.js";
import { IlluminationManager } from "../Illumanation/IlluminationManager.js";

const dataTool = new DataTool();
const nDataTool = new DataTool();
export const ExplosionManager = {
 _queue: <number[][]>[],
 _visitedMap: <Map<string, boolean>>new Map(),

 addToMap(x: number, y: number, z: number) {
  const key = `${x}-${y}-${z}`;
  this._visitedMap.set(key, true);
 },

 inMap(x: number, y: number, z: number) {
  const key = `${x}-${y}-${z}`;
  return this._visitedMap.has(key);
 },

 runExplosion(
  dimension: string,
  sx: number,
  sy: number,
  sz: number,
  radius: number
 ) {
  this._queue.push([sx, sy, sz]);

  dataTool.setDimension(dimension);
  nDataTool.setDimension(dimension);
  const dia = radius;
  while (this._queue.length) {
   const node = this._queue.shift();
   if (!node) break;
   const x = node[0];
   const y = node[1];
   const z = node[2];

   if (!this.inMap(x + 1, y, z)) {
    if (dataTool.loadIn(x + 1, y, z)) {
     const d = VoxelMath.distance3D(sx, sy, sz, x + 1, y, z);
     if (d <= radius) {
      this._queue.push([x + 1, y, z]);
     }
     this.addToMap(x + 1, y, z);
    }
   }
   if (!this.inMap(x - 1, y, z)) {
    if (dataTool.loadIn(x - 1, y, z)) {
     const d = VoxelMath.distance3D(sx, sy, sz, x - 1, y, z);
     if (d <= radius) {
      this._queue.push([x - 1, y, z]);
     }
    }
    this.addToMap(x - 1, y, z);
   }
   if (!this.inMap(x, y, z + 1)) {
    if (dataTool.loadIn(x, y, z + 1)) {
     const d = VoxelMath.distance3D(sx, sy, sz, x, y, z + 1);
     if (d <= radius) {
      this._queue.push([x, y, z + 1]);
     }
    }
    this.addToMap(x, y, z + 1);
   }
   if (!this.inMap(x, y, z - 1)) {
    if (dataTool.loadIn(x, y, z - 1)) {
     const d = VoxelMath.distance3D(sx, sy, sz, x, y, z - 1);
     if (d <= radius) {
      this._queue.push([x, y, z - 1]);
     }
    }
    this.addToMap(x, y, z - 1);
   }
   if (!this.inMap(x, y + 1, z)) {
    if (dataTool.loadIn(x, y + 1, z)) {
     const d = VoxelMath.distance3D(sx, sy, sz, x, y + 1, z);
     if (d <= radius) {
      this._queue.push([x, y + 1, z]);
     }
    }
    this.addToMap(x, y + 1, z);
   }
   if (!this.inMap(x, y - 1, z)) {
    if (dataTool.loadIn(x, y - 1, z)) {
     const d = VoxelMath.distance3D(sx, sy, sz, x, y - 1, z);
     if (d <= dia) {
      this._queue.push([x, y - 1, z]);
     }
    }
    this.addToMap(x, y - 1, z);
   }

   if (dataTool.loadIn(x, y, z)) {
    if (dataTool.isRenderable()) {
     for (const n of $3dCardinalNeighbors) {
      const nx = x + n[0];
      const ny = y + n[1];
      const nz = z + n[2];

      if (nDataTool.loadIn(nx, ny, nz)) {
       const l = nDataTool.getLight();
       if (l > 0) {
        if (LightData.getS(l) > 0) {
         IlluminationManager._sunLightRemove.push([nx, ny, nz]);
        }
        if (LightData.hasRGBLight(l)) {
         IlluminationManager._RGBlightRemovalQ.push([nx, ny, nz]);
        }
       }
      }
     }

     if (dataTool.isLightSource() && dataTool.getLightSourceValue()) {
        IlluminationManager.runRGBRemoveAt(true,x,y,z);
     }

     dataTool.setAir().commit(2);
     Propagation.addToRebuildQue(x, y, z, "all");
    }
   }
  }

  IlluminationManager.runSunLightRemove();
  IlluminationManager.runRGBRemove();
  
  IlluminationManager.runSunLightUpdate();
  IlluminationManager.runRGBUpdate();
  this._visitedMap.clear();
 },
};
