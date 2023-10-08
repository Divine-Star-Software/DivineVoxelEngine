import type { VoxelData } from "@divinevoxel/core";
import {
  DivineVoxelEngineConstructor,
  VoxelConstructor,
} from "@divinevoxel/core/Constructor";
import { VoxelConstructors } from "@divinevoxel/core/Constructor/Builder/Constructors/Voxel/VoxelConstructors";
type StartContructorProps = {
  getVoxelConstructors(
    contructors: typeof VoxelConstructors
  ): VoxelConstructor[];
};
export async function StartContrusctor(props: StartContructorProps) {
  const DVEC = new DivineVoxelEngineConstructor();
  const contructors = props.getVoxelConstructors(VoxelConstructors);
  for (const voxel of contructors) {
    DVEC.voxelManager.registerVoxel(voxel);
  }
  await DVEC.init();


  return {
    DVEW: DVEC,
  };
}
