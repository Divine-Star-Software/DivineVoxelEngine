//data
import { CardinalNeighbors3D } from "../../../Math/CardinalNeighbors.js";
import { Distance3D } from "@amodx/math/Vectors/Functions/Distance3d";
import { RGBRemove, RGBUpdate } from "../Illumanation/RGBUpdate.js";
import { SunRemove, SunUpdate } from "../Illumanation/SunUpdate.js";
import { FlowManager } from "../Flow/FlowManager.js";

import { VoxelUpdateTask } from "../../VoxelUpdateTask.js";
import { Vec3Array } from "@amodx/math";
import { WorldCursor } from "../../../World/index.js";
import { VoxelLightData } from "../../../Voxels/Cursor/VoxelLightData.js";

const lightData = new VoxelLightData();
export const ExplosionManager = {
  runExplosion(tasks: VoxelUpdateTask, radius: number) {
    const [dimension, sx, sy, sz] = tasks.origin;
 //   FlowManager.setDimension(dimension);

    const queue: Vec3Array[] = [];

    queue.push([sx, sy, sz]);

    while (queue.length) {
      const node = queue.shift();
      if (!node) break;
      const x = node[0];
      const y = node[1];
      const z = node[2];

/*       if (!map.inMap(x + 1, y, z)) {
        if (tasks.sDataCursor.getVoxel(x + 1, y, z)) {
          const d = Distance3D(sx, sy, sz, x + 1, y, z);
          if (d <= radius) {
            queue.push([x + 1, y, z]);
          }
          map.add(x + 1, y, z);
        }
      }
      if (!map.inMap(x - 1, y, z)) {
        if (tasks.sDataCursor.getVoxel(x - 1, y, z)) {
          const d = Distance3D(sx, sy, sz, x - 1, y, z);
          if (d <= radius) {
            queue.push([x - 1, y, z]);
          }
        }
        map.add(x - 1, y, z);
      }
      if (!map.inMap(x, y, z + 1)) {
        if (tasks.sDataCursor.getVoxel(x, y, z + 1)) {
          const d = Distance3D(sx, sy, sz, x, y, z + 1);
          if (d <= radius) {
            queue.push([x, y, z + 1]);
          }
        }
        map.add(x, y, z + 1);
      }
      if (!map.inMap(x, y, z - 1)) {
        if (tasks.sDataCursor.getVoxel(x, y, z - 1)) {
          const d = Distance3D(sx, sy, sz, x, y, z - 1);
          if (d <= radius) {
            queue.push([x, y, z - 1]);
          }
        }
        map.add(x, y, z - 1);
      }
      if (!map.inMap(x, y + 1, z)) {
        if (tasks.sDataCursor.getVoxel(x, y + 1, z)) {
          const d = Distance3D(sx, sy, sz, x, y + 1, z);
          if (d <= radius) {
            queue.push([x, y + 1, z]);
          }
        }
        map.add(x, y + 1, z);
      }
      if (!map.inMap(x, y - 1, z)) {
        if (tasks.sDataCursor.getVoxel(x, y - 1, z)) {
          const d = Distance3D(sx, sy, sz, x, y - 1, z);
          if (d <= radius) {
            queue.push([x, y - 1, z]);
          }
        }
        map.add(x, y - 1, z);
      }
 */
      const voxel = tasks.sDataCursor.getVoxel(x, y, z);
      if (voxel) {
        if (voxel.isRenderable()) {
          for (const n of CardinalNeighbors3D) {
            const nx = x + n[0];
            const ny = y + n[1];
            const nz = z + n[2];
            const nvoxel = tasks.nDataCursor.getVoxel(x, y, z);
            if (nvoxel) {
              const l = nvoxel.getLight();
              if (l > 0) {
                if (lightData.getS(l) > 0) {
                  tasks.sun.remove.push(nx, ny, nz);
                }
                if (lightData.hasRGBLight(l)) {
                  tasks.rgb.remove.push(nx, ny, nz);
                }
              }
            }
          }

          tasks.bounds.updateDisplay(x, y, z);
/*           if (
            voxel.getHardness() > 10_000 ||
            voxel.getSubstnaceData().isLiquid()
          ) {
            continue;
          } */
            voxel.setAir().updateVoxel(1);
        }
      }
    }

    RGBRemove(tasks);
    SunRemove(tasks);

    RGBUpdate(tasks);
    SunUpdate(tasks);

    // tasks.runRebuildQueue();
  },
};
