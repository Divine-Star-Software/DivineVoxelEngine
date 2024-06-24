import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Contexts/Constructor";

import { DVEFConstrucotrCore } from "../../Contexts/Constructor/DVEFConstructorCore.js";
import { Analyzer } from "../Analyzer/Analyzer.js";
import {
  DVEDefaultBuilder,
  DVEDefaultBuilderInitData,
} from "../Builder/Builder";
import { Propagation } from "../Propagation/Propagation.js";

export async function StartContrusctor(props: {
  builder: DVEDefaultBuilderInitData;
}) {
  const DVEC = new DivineVoxelEngineConstructor();
  const core = new DVEFConstrucotrCore({
    analyzer: new Analyzer(),
    builder: new DVEDefaultBuilder(props.builder),
    propagation: new Propagation(),
  });
  await DVEC.init({
    core,
  });
  return {
    DVEC,
    core,
  };
}
