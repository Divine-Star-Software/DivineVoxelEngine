import { Vec3Array } from "@amodx/math";
import { VoxelBehaviorsRegister } from "../VoxelBehaviorsRegister";
const levelChecks: Vec3Array[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
];
VoxelBehaviorsRegister.register({
  type: "dve_farmland",
  onTick(simulation, voxel, x, y, z) {
    let currentLevel = voxel.getLevel();

    let foundHigherLevel = false;
    let maxLevel = -1;
    for (let i = 0; i < 4; i++) {
      const nx = levelChecks[i][0] + x;
      const ny = levelChecks[i][1] + y;
      const nz = levelChecks[i][2] + z;

      const nVoxel = simulation.nDataCursor.getVoxel(nx, ny, nz);

      if (!nVoxel) continue;

      if (!nVoxel.isSameVoxel(voxel) && !nVoxel.substanceTags["dve_is_liquid"])
        continue;
      const nLevel = nVoxel.getLevel();

      if (currentLevel < nLevel) {
        foundHigherLevel = true;
      }
      if (maxLevel < nLevel) {
        maxLevel = nLevel;
      }
    }

    maxLevel = Math.max(0, maxLevel - 1);

    if (!foundHigherLevel) {
      if (currentLevel == 0) {
        if (Math.random() > 0.1) return;
        const upVoxel = simulation.nDataCursor.getVoxel(x, y + 1, z);
        if (upVoxel && upVoxel.tags["dve_simulation_behavior"] == "dve_crop") {
          return;
        }
        //turn to dirt
        voxel.setStringId("dve_dirt");
        voxel.setState(0);
        voxel.setMod(0);

        simulation.bounds.updateDisplay(x, y, z);
        return;
      }
      const newLevel = currentLevel - 1;
      if (newLevel == 0) {
        voxel.setState(
          voxel.schema.state
            .startEncoding(voxel.getState())
            .setValue("moist", "false")
            .getEncoded()
        );

        simulation.bounds.updateDisplay(x, y, z);
      }
      voxel.setLevel(newLevel);

      return;
    }

    if (foundHigherLevel) {
      if (currentLevel < maxLevel) {
        const newLevel = currentLevel + 1;
        if (currentLevel == 0) {
          voxel.setState(
            voxel.schema.state
              .startEncoding(voxel.getState())
              .setValue("moist", "true")
              .getEncoded()
          );

          simulation.bounds.updateDisplay(x, y, z);
        }
        voxel.setLevel(newLevel);

        return;
      }
    }
  },
});
