import { VoxelBehaviorsRegister } from "../VoxelBehaviorsRegister";

VoxelBehaviorsRegister.register({
  type: "dve_default",
  onInteract(simulation, voxel, x, y, z) {},
  onPaint(simulation, voxel, x, y, z) {},
  onErase(simulation, voxel, x, y, z) {},
  onTick(simulation, voxel, x, y, z) {
  //  console.log("tick the default", voxel.getStringId(),x,y,z);
  },
});
