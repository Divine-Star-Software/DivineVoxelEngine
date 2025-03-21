import { VoxelBehaviorsRegister } from "../VoxelBehaviorsRegister";

VoxelBehaviorsRegister.register({
  type: "dve_crop",
  onTick(simulation, voxel, x, y, z) {
    const downVoxel = simulation.nDataCursor.getVoxel(x, y - 1, z);

    if (
      downVoxel &&
      downVoxel.tags["dve_simulation_behavior"] == "dve_farmland"
    ) {
      const waterLevel = downVoxel.getLevel();

      if (waterLevel <= 0) return;

      const plantLevel = voxel.schema.state
        .startEncoding(voxel.getState())
        .getNumber("level");
      if (plantLevel >= 7) return;
      voxel.setState(
        voxel.schema.state
          .startEncoding()
          .setNumber("level", plantLevel + 1)
          .getEncoded()
      );
      simulation.bounds.updateDisplay(x, y, z);
    }
  },
});
