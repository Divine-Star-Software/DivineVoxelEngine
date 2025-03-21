import type { Vec3Array } from "@amodx/math";
import { VoxelTickUpdateRegister } from "../VoxelTickUpdateRegister";
import { VoxelCursorInterface } from "../../../../Voxels/Cursor/VoxelCursor.interface.js";
import { CardinalNeighbors3D } from "../../../../Math/CardinalNeighbors";
import { DimensionSimulation } from "../../../Dimensions/DimensionSimulation";

const floodOutChecks: Vec3Array[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const determineLevelChecks: Vec3Array[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
];

function determineLiquidLevel(
  simulation: DimensionSimulation,
  sourceVoxel: VoxelCursorInterface,
  x: number,
  y: number,
  z: number
) {
  const originalLevel = sourceVoxel.getLevel();

  if (sourceVoxel.getLevelState() == 1) {
    const upVoxel = simulation.nDataCursor.getVoxel(x, y + 1, z);
    if (!upVoxel || !upVoxel.isSameVoxel(sourceVoxel)) return Infinity;
    return 7;
  }
  if (originalLevel == 7) return 7;

  let highestNeighborLevel = -1;
  let foundHigherLevel = false;

  for (let i = 0; i < determineLevelChecks.length; i++) {
    const nx = x + determineLevelChecks[i][0];
    const ny = y + determineLevelChecks[i][1];
    const nz = z + determineLevelChecks[i][2];
    const voxel = simulation.nDataCursor.getVoxel(nx, ny, nz);
    if (!voxel || !voxel.isSameVoxel(sourceVoxel)) continue;

    const neighborLevel = voxel.getLevel();
    if (neighborLevel > originalLevel) {
      foundHigherLevel = true;
    }
    if (neighborLevel > highestNeighborLevel) {
      highestNeighborLevel = neighborLevel;
    }
  }

  if (!foundHigherLevel) {
    return Infinity;
  }

  if (highestNeighborLevel <= originalLevel) {
    return originalLevel;
  }
  return Math.max(0, highestNeighborLevel - 1);
}

VoxelTickUpdateRegister.registerType({
  type: "dve_liquid",
  run(simulation, voxel, update) {
    const { x, y, z } = update;
    const liquidUpdateRate = 3;

    const currentLevel = voxel.getLevel();
    const levelState = voxel.getLevelState();
    if (levelState == 1 && currentLevel < 7) {
      voxel.setLevel(currentLevel + 1);
      voxel.updateVoxel(0);
      simulation.scheduleUpdate("dve_liquid", x, y, z, liquidUpdateRate);
      simulation.bounds.updateDisplay(x, y, z);
      return;
    }
    if (levelState == 2) {
      voxel.setLevelState(0);
      voxel.updateVoxel(0);
      for (let i = 0; i < CardinalNeighbors3D.length; i++) {
        const nx = x + CardinalNeighbors3D[i][0];
        const ny = y + CardinalNeighbors3D[i][1];
        const nz = z + CardinalNeighbors3D[i][2];
        const voxel = simulation.nDataCursor.getVoxel(nx, ny, nz);
        if (!voxel || !voxel.substanceTags["dve_is_liquid"]) continue;
        simulation.scheduleUpdate("dve_liquid", nx, ny, nz, 0);
      }
      return;
    }
    if (currentLevel == 0) {
      const downVoxel = simulation.nDataCursor.getVoxel(x, y - 1, z);
      if (
        downVoxel &&
        downVoxel.isSameVoxel(voxel) &&
        downVoxel.getLevelState() == 1
      ) {
        simulation.scheduleUpdate("dve_liquid", x, y - 1, z, liquidUpdateRate);
      }
      voxel.setAir();
      voxel.setLevel(0);
      voxel.updateVoxel(1);
      simulation.bounds.updateDisplay(x, y, z);
      for (let i = 0; i < CardinalNeighbors3D.length; i++) {
        const nx = x + CardinalNeighbors3D[i][0];
        const ny = y + CardinalNeighbors3D[i][1];
        const nz = z + CardinalNeighbors3D[i][2];
        const voxel = simulation.nDataCursor.getVoxel(nx, ny, nz);
        voxel?.updateVoxel(2);
      }
      return;
    }

    const finalLevel = determineLiquidLevel(simulation, voxel, x, y, z);

    if (finalLevel == Infinity) {
      const newLevel = currentLevel - 1;
      voxel.setLevel(newLevel);
      voxel.updateVoxel(0);
      if (levelState == 1) voxel.setLevelState(0);
      simulation.scheduleUpdate("dve_liquid", x, y, z, liquidUpdateRate);
      simulation.bounds.updateDisplay(x, y, z);

      for (let i = 0; i < 4; i++) {
        const nx = floodOutChecks[i][0] + x;
        const ny = floodOutChecks[i][1] + y;
        const nz = floodOutChecks[i][2] + z;
        const nVoxel = simulation.nDataCursor.getVoxel(nx, ny, nz);

        if (!nVoxel || !nVoxel.isSameVoxel(voxel)) continue;
        const nState = nVoxel.getLevelState();
        if (nState == 2) continue;
        if (nVoxel.getLevel() > newLevel) {
          simulation.scheduleUpdate("dve_liquid", nx, ny, nz, liquidUpdateRate);
        }
      }

      return;
    }

    if (currentLevel < finalLevel) {
      voxel.setLevel(currentLevel + 1);
      voxel.updateVoxel(0);
      simulation.scheduleUpdate("dve_liquid", x, y, z, liquidUpdateRate);
      simulation.bounds.updateDisplay(x, y, z);
    }

    const downVoxel = simulation.nDataCursor.getVoxel(x, y - 1, z);
    if (!downVoxel || downVoxel.isAir() || downVoxel.isSameVoxel(voxel)) {
      if (downVoxel) {
        downVoxel.setId(voxel.getId());
        downVoxel.setLevel(0);
        downVoxel.setLevelState(1);
        downVoxel.updateVoxel(0);
        simulation.scheduleUpdate("dve_liquid", x, y - 1, z, liquidUpdateRate);
      }
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nx = floodOutChecks[i][0] + x;
      const ny = floodOutChecks[i][1] + y;
      const nz = floodOutChecks[i][2] + z;
      const nVoxel = simulation.sDataCursor.getVoxel(nx, ny, nz);
      if (!nVoxel || !(nVoxel.isSameVoxel(voxel) || nVoxel.isAir())) continue;
      const vLevel = nVoxel.getLevel();
      const nState = nVoxel.getLevelState();
      if (nState == 2) continue;
      if (vLevel + 1 < currentLevel) {
        nVoxel.setId(voxel.getId());
        nVoxel.setLevel(vLevel + 1);
        nVoxel.updateVoxel(0);
        simulation.bounds.updateDisplay(nx, ny, nz);
        if (currentLevel - 1 > 0) {
          simulation.scheduleUpdate("dve_liquid", nx, ny, nz, liquidUpdateRate);
        }
      }
    }
  },
});
