import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Constructor";
import { DVEBuilder } from "@divinevoxel/core/Interfaces/Builder/DVEBuilder";
type StartContructorProps = {
  builder: DVEBuilder;
};
export async function StartContrusctor(props: StartContructorProps) {
  const DVEC = new DivineVoxelEngineConstructor();

  await DVEC.init({
    builder: props.builder,
  });

  return {
    DVEW: DVEC,
  };
}
