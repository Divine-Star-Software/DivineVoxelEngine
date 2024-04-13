import type { VoxelData } from "@divinevoxel/core";
import { DivineVoxelEngineWorld } from "@divinevoxel/core/Contexts/World/DivineVoxelEngineWorld";
import { DVEFWorldCore } from "../../Contexts/World/DVEFWorldCore";
type StartWorldProps = {
  voxels: VoxelData[];
};
export async function StartWorld(props: StartWorldProps) {
  const DVEW = new DivineVoxelEngineWorld();
  const core = new DVEFWorldCore();
  core.dataRegiser.voxels.registerData(props.voxels);
  await DVEW.init(core);

  return {
    DVEW,
  };
}
