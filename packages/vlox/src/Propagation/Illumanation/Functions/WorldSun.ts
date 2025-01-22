//types
//data
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { $3dCardinalNeighbors } from "../../../Math/Constants/CardinalNeighbors.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";

import { IlluminationManager as IM } from "../IlluminationManager.js";
import { HeightMapTool } from "../../../Tools/Data/WorldData/HeightMapTool.js";
import { LightData } from "../../../VoxelData/LightData";
import { WorldCursor } from "../../../Data/Cursor/World/WorldCursor";
import { Vec3Array } from "@amodx/math";
import { UpdateTask } from "../../../Contexts/Constructor/Tasks/UpdateTask";

const worldCursor = new WorldCursor();
const heightMapTool = new HeightMapTool();
const FloodOutPositions: Vec3Array[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
];
const queue: number[] = [];

export function RunWorldSun(tasks: UpdateTask) {
  IM.setDimension(tasks.origin[0]);

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

  const columnCursor = worldCursor.getColumn(
    tasks.origin[1],
    tasks.origin[2],
    tasks.origin[3]
  );
  if (!columnCursor) return;
  const minY = AmaxY - 1 < 0 ? 0 : AmaxY;
  //fill
  for (let iy = minY; iy < maxY; iy++) {
    for (let iz = cz; iz < maxZ; iz++) {
      for (let ix = cx; ix < maxX; ix++) {
        const voxel = columnCursor.getVoxel(ix, iy, iz);
        if (!voxel) continue;
        const l = voxel.getLight();
        if (l < 0) continue;
        voxel.setLight(LightData.setS(0xf, l));
      }
    }
  }

  const maxAcculamteY = AmaxY == RmaxY ? RmaxY + 1 : RmaxY;
  //accumulate
  for (let iy = minY; iy <= maxAcculamteY; iy++) {
    for (let iz = cz; iz < maxZ; iz++) {
      for (let ix = cx; ix < maxX; ix++) {
        const l = columnCursor.getVoxel(ix, iy, iz)?.getLight();
        if (l && l < 0 && LightData.getS(l) != 0xf) continue;
        for (let i = 0; i < $3dCardinalNeighbors.length; i++) {
          const n = $3dCardinalNeighbors[i];
          const nx = ix + n[0];
          const ny = iy + n[1];
          const nz = iz + n[2];

          const nVoxel = worldCursor.getVoxel(nx, ny, nz);
          if (!nVoxel) continue;
          const nl = nVoxel.getLight();
          if (nl > -1 && LightData.getS(nl) < 0xf) {
            queue.push(ix, iy, iz);
            break;
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
    const sl = worldCursor.getVoxel(x, y, z)?.getLight();
    if (!sl || sl < 0) continue;

    for (let i = 0; i < 5; i++) {
      const nx = x + FloodOutPositions[i][0];
      const ny = y + FloodOutPositions[i][1];
      const nz = z + FloodOutPositions[i][2];
      const nVoxel = worldCursor.getVoxel(nx, ny, nz);
      if (nVoxel) {
        const nl = nVoxel.getLight();
        if (nl > -1 && LightData.isLessThanForSunAdd(nl, sl)) {
          queue.push(nx, ny, nz);
          nVoxel.setLight(LightData.getMinusOneForSun(sl, nl));
        }
      }
    }

    const nVoxel = worldCursor.getVoxel(x, y - 1, z);
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


}
