import { VoxelUpdateTasks } from "../Tasks.types.js";
import { VoxelUpdateTask } from "../VoxelUpdateTask.js";
import { RGBUpdate } from "../Propagation/Illumanation/RGBUpdate.js";
import { SunUpdate } from "../Propagation/Illumanation/SunUpdate.js";
import { LocationData } from "../../Math/index.js";
import { WorldRegister } from "../../World/WorldRegister.js";
import { WorldSpaces } from "../../World/WorldSpaces.js";
import { SectionCursor } from "../../World/Cursor/SectionCursor.js";
import { Vec3Array } from "@amodx/math";
import { CardinalNeighbors3D } from "../../Math/CardinalNeighbors.js";
import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface.js";
import { getBitArrayIndex } from "../../Util/Binary/BinaryArrays.js";
import { WorldCursor } from "../../World/index.js";

const task = new VoxelUpdateTask();
const cursor = new WorldCursor();
const sectionCursor = new SectionCursor();

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
function determineLiquidLevel(
  sourceVoxel: VoxelCursorInterface,
  x: number,
  y: number,
  z: number
) {
  const originalLevel = sourceVoxel.getLevel();
  let highestNeighborLevel = -1;

  for (let i = 0; i < CardinalNeighbors3D.length; i++) {
    const nx = x + CardinalNeighbors3D[i][0];
    const ny = y + CardinalNeighbors3D[i][1];
    const nz = z + CardinalNeighbors3D[i][2];

    const voxel = task.nDataCursor.getVoxel(nx, ny, nz);
    if (!voxel) continue;
    if (!voxel.isSameVoxel(sourceVoxel)) continue;

    const neighborLevel = voxel.getLevel();
    if (neighborLevel > highestNeighborLevel) {
      highestNeighborLevel = neighborLevel;
    }
  }

  // If no neighbor is higher, keep the same level
  if (highestNeighborLevel <= originalLevel) {
    return originalLevel;
  }

  // Otherwise, set level to highestNeighbor - 1,
  // but don't go below 0 in case the neighbor had level=0
  return Math.max(0, highestNeighborLevel - 1);
}
function floodOut(
  sourceVoxel: VoxelCursorInterface,
  x: number,
  y: number,
  z: number
) {
  const level = sourceVoxel.getLevel();
  for (let i = 0; i < 4; i++) {
    const nx = floodOutChecks[i][0] + x;
    const ny = floodOutChecks[i][1] + y;
    const nz = floodOutChecks[i][2] + z;
    const voxel = task.nDataCursor.getVoxel(nx, ny, nz);
    if (!voxel) continue;
    if (!(voxel.isSameVoxel(sourceVoxel) || voxel.isAir())) continue;
    const vLevel = voxel.getLevel();
    if (vLevel + 1 < level) {
      const downVoxel = cursor.getVoxel(nx, ny - 1, nz);
      if (!downVoxel) continue;
      if (downVoxel.isAir()) {
      } else if (downVoxel.isRenderable()) {
        voxel.setId(sourceVoxel.getId());
        voxel.setLevel(vLevel + 1);
        voxel.updateVoxel(3);
        voxel.updateVoxel(0);
        task.bounds.updateDisplay(nx, ny, nz);
        task.bounds.updatePropagation(nx, ny, nz);
      }
    }
  }
}

function liquidUpdate(
  voxel: VoxelCursorInterface,
  x: number,
  y: number,
  z: number
) {
  let canFloodOut = true;
  const level = voxel.getLevel();

  if (level < 7) {
    const neededLevel = determineLiquidLevel(voxel, x, y, z);

    if (level < neededLevel) {
      voxel.setLevel(level + 1);
      voxel.updateVoxel(3);
      canFloodOut = false;

      task.bounds.updateDisplay(x, y, z);
      task.bounds.updatePropagation(x, y, z);
    }
  }
  if (canFloodOut) floodOut(voxel, x, y, z);
}

let propagationMap: Uint8Array;
let propagationVoxelMap: Uint8Array;

export function PropagationUpdate(location: LocationData) {
  task.setOriginAt(location);

  const sector = WorldRegister.sectors.getAt(location);

  if (!sector) {
    console.warn(
      `Could not run logic update sector at ${location} does not exist`
    );
    return false;
  }

  const section = sector.getSection(location[1], location[2], location[3]);

  if (!section) {
    console.warn(
      `Could not run logic update sector at ${location}.  Section does not exist`
    );
    return false;
  }

  if (!propagationMap) {
    propagationMap = section.propagationDirtyMap.slice();
  }
  if (!propagationVoxelMap) {
    propagationVoxelMap = section.propagationDirty.slice();
  }

  propagationMap.set(section.propagationDirtyMap);
  propagationVoxelMap.set(section.propagationDirty);
  const [minY, maxY] = section.getPropagationMinMax();

  section.propagationDirtyMap.fill(0);
  section.propagationDirty.fill(0);

  const [cx, cy, cz] = section.position;
  const slice = WorldSpaces.section.bounds.x * WorldSpaces.section.bounds.z;
  const startY = minY * slice;
  const endY = (maxY + 1) * slice;
  sectionCursor.setSection(section);

  for (let i = startY; i < endY; i++) {
    if (!(i % slice)) {
      const y = i / slice;
      if (getBitArrayIndex(propagationMap, y) == 0) {
        i += slice - 1;
        continue;
      }
    }

    if (!section.ids[i] || getBitArrayIndex(propagationVoxelMap, i) == 0)
      continue;
    const voxel = sectionCursor.getVoxelAtIndex(i);
    const x = cx + sectionCursor._voxelPosition.x;
    const y = cy + sectionCursor._voxelPosition.y;
    const z = cz + sectionCursor._voxelPosition.z;

    if (voxel._substanceTags["dve_is_liquid"]) {
      liquidUpdate(voxel, x, y, z);
    }
  }

  task.bounds.markPropagationDirty();
  task.bounds.markDisplayDirty();
}
