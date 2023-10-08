import type { VoxelData } from "@divinevoxel/core";
import { DivineVoxelEngineWorld } from "@divinevoxel/core/World";

type StartWorldProps = {
  voxels: VoxelData[];
};
export async function StartWorld(props: StartWorldProps) {
  const DVEW = new DivineVoxelEngineWorld();
  DVEW.dataRegister.voxels.registerData(props.voxels);
  await DVEW.init();

  return {
    DVEW,
  };
}
