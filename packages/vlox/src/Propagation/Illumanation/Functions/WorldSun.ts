//types
import type { WorldSunTaskRequest } from "../../../Contexts/Constructor/Tasks/TasksRequest";
//data
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import {
  $3dCardinalNeighbors,
  $3dMooreNeighborhood,
} from "../../../Math/Constants/CardinalNeighbors.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";

import { IlluminationManager as IM } from "../IlluminationManager.js";
import { HeightMapTool } from "../../../Tools/Data/WorldData/HeightMapTool.js";
import { ColumnCursor } from "../../../Data/Cursor/ColumnCursor";
import { LightData } from "../../../Data/LightData";
import { WorldCursor } from "../../../Data/Cursor/WorldCursor";
const inColumnBounds = (cx: number, cz: number, x: number, z: number) => {
  if (
    x >= cx &&
    x <= cx + WorldSpaces.chunk._bounds.x &&
    z >= cz &&
    z <= cz + WorldSpaces.chunk._bounds.z
  )
    return true;
  return false;
};

const worldCursor = new WorldCursor();
const heightMapTool = new HeightMapTool();

const queue: number[] = [];

export function RunWorldSun(tasks: WorldSunTaskRequest) {
  IM.setDimension(tasks.origin[0]);
  tasks.start();
  WorldRegister.instance.setDimension(tasks.origin[0]);
  if (
    !WorldRegister.instance.column.get(
      tasks.origin[1],
      tasks.origin[2],
      tasks.origin[2]
    )
  )
    return false;
  const [dimension, cx, cy, cz] = tasks.origin;

  IM._sDataTool.setDimension(dimension);
  const RmaxY = heightMapTool.column.getRelative(tasks.origin);
  const AmaxY = heightMapTool.column.getAbsolute(tasks.origin);

  const maxX = cx + WorldSpaces.chunk._bounds.x;
  const maxY = WorldBounds.bounds.MaxY;
  const maxZ = cz + WorldSpaces.chunk._bounds.z;

  worldCursor.setFocalPoint(...tasks.origin);

  const columnCursor = worldCursor.getColumnCursor(
    tasks.origin[1],
    tasks.origin[2],
    tasks.origin[3]
  );
  //fill
  for (let iy = AmaxY; iy < maxY; iy++) {
    for (let iz = cz; iz < maxZ; iz++) {
      for (let ix = cx; ix < maxX; ix++) {
        if (!columnCursor.loadIn(ix, iy, iz)) continue;
        const l = columnCursor.voxel.getLight();
        if (l < 0) continue;
        columnCursor.voxel.setLight(LightData.setS(0xf, l));
      }
    }
  }

  //accumulate
  for (let iy = AmaxY; iy <= RmaxY; iy++) {
    for (let iz = cz; iz < maxZ; iz++) {
      for (let ix = cx; ix < maxX; ix++) {
        if (!columnCursor.loadIn(ix, iy, iz)) continue;
        const l = columnCursor.voxel.getLight();
        if (l < 0 && IM.lightData.getS(l) != 0xf) continue;

        for (let i = 0; i < $3dCardinalNeighbors.length; i++) {
          const n = $3dCardinalNeighbors[i];
          const nx = ix + n[0];
          const ny = iy + n[1];
          const nz = iz + n[2];

          const nTool = worldCursor.getColumnCursor(nx, ny, nz);
          if (nTool.loadIn(nx, ny, nz)) {
            const nl = nTool.voxel.getLight();
            if (nl > -1 && LightData.getS(nl) < 0xf) {
              queue.push(ix, iy, iz);
              break;
            }
          }
        }
      }
    }
  }

  //flood
  while (queue.length) {
    const x = queue.shift()!;
    const y = queue.shift()!;
    const z = queue.shift()!;
    const column = worldCursor.getColumnCursor(x, y, z);
    if (!column.loadIn(x, y, z)) continue;
    const sl = column.voxel.getLight();
    if (sl <= 0) continue;
    const sunL = LightData.getS(sl);
    if (sunL >= 0xf && !inColumnBounds(cx, cz, x, z)) continue;

    {
      const nColumn = worldCursor.getColumnCursor(x - 1, y, z);
      const nVoxel = nColumn.loadIn(x - 1, y, z);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
          queue.push(x - 1, y, z);
          nVoxel.setLight(IM.lightData.getMinusOneForSun(sl, nl));
        }
      }
    }
    {
      const nColumn = worldCursor.getColumnCursor(x + 1, y, z);
      const nVoxel = nColumn.loadIn(x + 1, y, z);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
          queue.push(x + 1, y, z);
          nVoxel.setLight(IM.lightData.getMinusOneForSun(sl, nl));
        }
      }
    }
    {
      const nColumn = worldCursor.getColumnCursor(x, y, z + 1);
      const nVoxel = nColumn.loadIn(x, y, z + 1);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
          queue.push(x, y, z + 1);
          nVoxel.setLight(IM.lightData.getMinusOneForSun(sl, nl));
        }
      }
    }
    {
      const nColumn = worldCursor.getColumnCursor(x, y, z - 1);
      const nVoxel = nColumn.loadIn(x, y, z - 1);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
          queue.push(x, y, z - 1);
          nVoxel.setLight(IM.lightData.getMinusOneForSun(sl, nl));
        }
      }
    }

    {
      const nColumn = worldCursor.getColumnCursor(x, y - 1, z);
      const nVoxel = nColumn.loadIn(x, y - 1, z);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > -1 && LightData.isLessThanForSunAddDown(nl, sl)) {
          if (nVoxel.isAir()) {
            queue.push(x, y - 1, z);
            nVoxel.setLight(LightData.getSunLightForUnderVoxel(sl, nl));
          } else {
            if (!nVoxel.isOpaque()) {
              queue.push(x, y - 1, z);
              nVoxel.setLight(LightData.getMinusOneForSun(sl, nl));
            }
          }
        }
      }
    }

    {
      const nColumn = worldCursor.getColumnCursor(x, y + 1, z);
      const nVoxel = nColumn.loadIn(x, y + 1, z);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
          queue.push(x, y + 1, z);
          nVoxel.setLight(IM.lightData.getMinusOneForSun(sl, nl));
        }
      }
    }
  }

  tasks.stop();
}
