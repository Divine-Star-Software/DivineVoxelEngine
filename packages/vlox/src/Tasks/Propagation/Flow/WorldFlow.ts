import { WorldSpaces } from "../../../World/WorldSpaces";
import { VoxelUpdateTask } from "../../VoxelUpdateTask";
import { WorldRegister } from "../../../World/WorldRegister";
import { EngineSettings } from "../../../Settings/EngineSettings";
import { Vec3Array } from "@amodx/math";
import { SunRemove, SunUpdate } from "../Illumanation/SunUpdate";
import { RGBRemove, RGBUpdate } from "../Illumanation/RGBUpdate";
import { WorldVoxelCursor } from "../../../World/Cursor/WorldVoxelCursor";
const flowUpdateChecks: Vec3Array[] = [
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
];
const queue: number[] = [];
const floodOutChecks: Vec3Array[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
];

function Flood(task: VoxelUpdateTask, voxel: WorldVoxelCursor) {
  const voxelId = voxel.id;

  while (queue.length) {
    const x = queue.shift()!;
    const y = queue.shift()!;
    const z = queue.shift()!;

    const voxel = task.sDataCursor.getVoxel(x, y, z);
    if (!voxel) continue;

    const level = voxel.getLevel();
    if (level <= 1) continue;
    const levelState = voxel.getLevelState();
    const hasBottomVoxel =
      !task.nDataCursor.getVoxel(x, y - 1, z)?.isAir() || false;

    if (hasBottomVoxel && !levelState) {
      for (let i = 0; i < 4; i++) {
        const nx = floodOutChecks[i][0] + x;
        const ny = floodOutChecks[i][1] + y;
        const nz = floodOutChecks[i][2] + z;
        const downVoxel = task.nDataCursor.getVoxel(nx, ny - 1, nz);
        const downAir = downVoxel?.isAir() || false;
        const downSameVoxel = downVoxel?.getVoxelId() == voxelId;

        let nVoxel = task.nDataCursor.getVoxel(nx, ny, nz);
        if (!nVoxel) continue;
        const nLevel = nVoxel.isAir() ? 0 : nVoxel.getLevel();
        const nState = nVoxel.getLevelState();
        if (
          nLevel < level &&
          (nVoxel.id == voxelId || nVoxel.isAir()) &&
          nState == 0
        ) {
          if (downAir && !downSameVoxel) {
            nVoxel.setId(voxelId);
            nVoxel.updateVoxel(0);
            nVoxel.setLevel(7);
            nVoxel.setLevelState(1);
          } else if (!downSameVoxel) {
            nVoxel.setId(voxelId);
            nVoxel.updateVoxel(0);
            nVoxel.setLevel(level - 1);
            nVoxel.setLevelState(0);
          }
          if (nVoxel.hasSunLight()) {
            task.sun.remove.push(nx, ny, nz);
          }
          if (nVoxel.hasRGBLight()) {
            task.rgb.remove.push(nx, ny, nz);
          }

          queue.push(nx, ny, nz);
        }
      }
      continue;
    }
    if (!WorldSpaces.world.inBounds(x, y - 1, z) && levelState != 1) continue;
    let nVoxel = task.nDataCursor.getVoxel(x, y - 1, z)!;
    const nLevel = nVoxel.isAir()
      ? 0
      : nVoxel.getVoxelId() == voxelId
        ? nVoxel.getLevel()
        : -1;
    const nState = nVoxel.getLevelState();
    const nAir = nVoxel.isAir();
    if (nLevel < 0 || nState == 1) continue;
    let state = nState;

    if (nAir) {
      const down = task.nDataCursor.getVoxel(x, y - 2, z);
      if (down && !down.isAir()) {
        state = 0;
      }
    }
    nVoxel = task.nDataCursor.getVoxel(x, y - 1, z)!;
    if (nVoxel.hasSunLight()) {
      task.sun.remove.push(x, y - 1, z);
    }
    if (nVoxel.hasRGBLight()) {
      task.rgb.remove.push(x, y - 1, z);
    }

    nVoxel.setId(voxelId);
    nVoxel.updateVoxel(0);
    nVoxel.setLevel(7);
    nVoxel.setLevelState(state);
    queue.push(x, y - 1, z);
  }
}

export function WorldFlow(task: VoxelUpdateTask) {
  if (!EngineSettings.doFlow) return false;
  const sector = WorldRegister.sectors.get(
    task.origin[0],
    task.origin[1],
    task.origin[2],
    task.origin[3]
  );

  if (!sector) {
    console.error(
      `Tried running world flow on a sector that does not exist ${task.origin.toString()}`
    );
    return false;
  }

  let maxX = WorldSpaces.section.bounds.x + sector.position[0];
  let maxZ = WorldSpaces.section.bounds.z + sector.position[2];
  for (let i = sector.sections.length - 1; i >= 0; i--) {
    const section = sector.sections[i];
    if (!section) continue;

    let [minY, maxY] = section.getMinMax();
    const cx = sector.position[0];
    const cy = sector.position[1] + i * WorldSpaces.section.bounds.y;
    const cz = sector.position[2];
    if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) continue;
    for (let y = cy + maxY; y >= cy + minY; y--) {
      for (let z = cz; z < maxZ; z++) {
        for (let x = cx; x < maxX; x++) {
          const voxel = task.nDataCursor.getVoxel(x, y, z);
          if (!voxel || voxel.isAir()) continue;
          if (voxel.getSubstanceData()["dve_is_liquid"]) {
            for (let i = 0; i < 5; i++) {
              const nVoxel = task.nDataCursor.getVoxel(
                x + flowUpdateChecks[i][0],
                y + flowUpdateChecks[i][1],
                z + flowUpdateChecks[i][2]
              );
              if (nVoxel && nVoxel.isAir()) {
                queue.push(x, y, z);
                Flood(task, voxel);
                break;
              }
            }
          }
        }
      }
    }
  }

  SunRemove(task);
  RGBRemove(task);
  SunUpdate(task);
  RGBUpdate(task);
}
