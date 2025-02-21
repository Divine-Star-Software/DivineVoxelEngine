import { VoxelUpdateRegister } from "../VoxelUpdateRegister";
import { VoxelCursorInterface } from "../../../Voxels/Cursor/VoxelCursor.interface.js";
import { DimensionSimulation } from "../VoxelUpdateTick";
import { Vec3Array } from "@amodx/math";
import { CardinalNeighbors3D } from "../../../Math/CardinalNeighbors";

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

  for (let i = 0; i < CardinalNeighbors3D.length; i++) {
    const nx = x + CardinalNeighbors3D[i][0];
    const ny = y + CardinalNeighbors3D[i][1];
    const nz = z + CardinalNeighbors3D[i][2];
    const voxel = simulation.nDataCursor.getVoxel(nx, ny, nz);
    if (!voxel || !voxel.isSameVoxel(sourceVoxel)) continue;

    const levelState = voxel.getLevelState();
    const neighborLevel = levelState == 1 ? 7 : voxel.getLevel();
    if (neighborLevel > highestNeighborLevel) {
      highestNeighborLevel = neighborLevel;
    }
  }

  if (highestNeighborLevel <= originalLevel) {
    return originalLevel;
  }
  return Math.max(0, highestNeighborLevel - 1);
}

VoxelUpdateRegister.registerType({
  type: "liquid",
  run(simulation, voxel, update) {
    const { x, y, z } = update;

    const currentLevel = voxel.getLevel();
    const levelState = voxel.getLevelState();
    const finalLevel =
      currentLevel < 7 ? determineLiquidLevel(simulation, voxel, x, y, z) : 7;
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
            simulation.scheduleUpdate("liquid", nx, ny - 1, nz, 1);
            continue;
          }
          if (downVoxel.isSameVoxel(voxel)) {
            nVoxel.setId(voxel.getId());
            nVoxel.setLevel(
              determineLiquidLevel(simulation, nVoxel, nx, ny, nz)
            );
            nVoxel.updateVoxel(0);
            simulation.bounds.updateDisplay(nx, ny, nz);
            continue;
          }

          if (downVoxel.isRenderable()) {
            nVoxel.setId(voxel.getId());
            nVoxel.setLevel(vLevel);
            nVoxel.updateVoxel(0);
            simulation.bounds.updateDisplay(nx, ny, nz);
            simulation.scheduleUpdate("liquid", nx, ny, nz, 1);
          }
        }
      }
    }
  },
});
