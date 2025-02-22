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
function determineLiquidLevel(
  simulation: DimensionSimulation,
  sourceVoxel: VoxelCursorInterface,
  x: number,
  y: number,
  z: number
) {
  const originalLevel = sourceVoxel.getLevel();
  let highestNeighborLevel = -1;
  let foundHigherLevel = false;

  for (let i = 0; i < CardinalNeighbors3D.length; i++) {
    const nx = x + CardinalNeighbors3D[i][0];
    const ny = y + CardinalNeighbors3D[i][1];
    const nz = z + CardinalNeighbors3D[i][2];
    const voxel = simulation.nDataCursor.getVoxel(nx, ny, nz);
    if (!voxel || !voxel.isSameVoxel(sourceVoxel)) continue;

    const levelState = voxel.getLevelState();

    const neighborLevel = levelState == 1 ? 7 : voxel.getLevel();
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
  type: "liquid",
  run(simulation, voxel, update) {
    const { x, y, z } = update;
    const liquidUpdateRate = 3;

    const currentLevel = voxel.getLevel();
    const levelState = voxel.getLevelState();

    if (levelState == 2) {
      voxel.setLevelState(0);
      for (let i = 0; i < CardinalNeighbors3D.length; i++) {
        const nx = x + CardinalNeighbors3D[i][0];
        const ny = y + CardinalNeighbors3D[i][1];
        const nz = z + CardinalNeighbors3D[i][2];
        const voxel = simulation.nDataCursor.getVoxel(nx, ny, nz);
        if (!voxel || !voxel._substanceTags["dve_is_liquid"]) continue;
        simulation.scheduleUpdate("liquid", nx, ny, nz, 0);
      }
      return;
    }
    if (currentLevel == 0) {
      voxel.setAir();
      voxel.setLevel(0);
      voxel.updateVoxel(1);
      simulation.bounds.updateDisplay(x, y, z);
      return;
    }

    const finalLevel =
      currentLevel < 7 ? determineLiquidLevel(simulation, voxel, x, y, z) : 7;

    //removing
    if (finalLevel == Infinity) {
      const newLevel = currentLevel - 1;
      voxel.setLevel(newLevel);
      for (let i = 0; i < 4; i++) {
        const nx = floodOutChecks[i][0] + x;
        const ny = floodOutChecks[i][1] + y;
        const nz = floodOutChecks[i][2] + z;
        const nVoxel = simulation.sDataCursor.getVoxel(nx, ny, nz);

        if (!nVoxel || !nVoxel.isSameVoxel(voxel)) continue;
        const nState = nVoxel.getLevelState();
        if (nState == 2) continue;
        if (nVoxel.getLevel() >= newLevel) {
          simulation.scheduleUpdate("liquid", nx, ny, nz, liquidUpdateRate);
        }
      }

      if (newLevel == 0) {
        simulation.scheduleUpdate(
          "liquid",
          x,
          y,
          z,
          (Math.random() * 10) >> 0
        );
      } else {
        simulation.scheduleUpdate("liquid", x, y, z, liquidUpdateRate);
      }

      simulation.bounds.updateDisplay(x, y, z);

      return;
    }

    if (currentLevel < finalLevel) {
      voxel.setLevel(currentLevel + 1);
      simulation.scheduleUpdate("liquid", x, y, z, 1);
      simulation.bounds.updateDisplay(x, y, z);
    }

    if (levelState == 0) {
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
          let downVoxel = simulation.nDataCursor.getVoxel(nx, ny - 1, nz);
          if (!downVoxel) continue;
          if (downVoxel.isAir()) {
            nVoxel.setId(voxel.getId());
            nVoxel.setLevel(finalLevel - 1);
            nVoxel.updateVoxel(0);
            const floorVoxel = !simulation.sDataCursor
              .getVoxel(nx, ny - 2, nz)
              ?.isAir();
            if (floorVoxel) {
              downVoxel.setId(voxel.getId());
              downVoxel.setLevel(7);
              downVoxel.setLevelState(0);
              downVoxel.updateVoxel(0);
            } else {
              downVoxel.setId(voxel.getId());
              downVoxel.setLevel(7);
              downVoxel.setLevelState(1);
              downVoxel.updateVoxel(0);
            }
            simulation.bounds.updateDisplay(nx, ny, nz);
            simulation.bounds.updateDisplay(nx, ny - 1, nz);
            simulation.scheduleUpdate(
              "liquid",
              nx,
              ny - 1,
              nz,
              liquidUpdateRate
            );
            continue;
          }
          if (downVoxel.isSameVoxel(voxel)) {
            nVoxel.setId(voxel.getId());
            nVoxel.setLevel(vLevel + 1);
            nVoxel.updateVoxel(0);
            simulation.bounds.updateDisplay(nx, ny, nz);
            continue;
          }

          if (downVoxel.isRenderable()) {
            nVoxel.setId(voxel.getId());
            nVoxel.setLevel(vLevel + 1);
            nVoxel.updateVoxel(0);
            simulation.bounds.updateDisplay(nx, ny, nz);
            if (currentLevel - 1 > 0) {
              simulation.scheduleUpdate("liquid", nx, ny, nz, liquidUpdateRate);
            }
          }
        }
      }
    }
  },
});
