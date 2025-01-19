import type { VoxelData } from "../Types/";
import {
  DivineVoxelEngineWorld,
  DVEWorldProps,
} from "../Contexts/World/DivineVoxelEngineWorld";

import InitVoxelModelsWorld from "../VoxelModels/World/InitVoxelModelsWorld";
type StartWorldProps = {
  voxels: VoxelData[];
} & DVEWorldProps;
export async function StartWorld(props: StartWorldProps) {
  const DVEW = new DivineVoxelEngineWorld(props);

  InitVoxelModelsWorld(DVEW);
  DVEW.dataRegiser.voxels.registerData(props.voxels);

  await DVEW.init();

  return DVEW;
}
