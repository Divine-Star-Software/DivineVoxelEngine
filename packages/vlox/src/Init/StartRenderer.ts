import { InitVoxelData } from "../VoxelData/InitVoxelData";
import { DivineVoxelEngineRender, DVERInitData } from "../Contexts/Render";
import { VoxelData } from "../Types";
import {
  VoxelGeometryData,
  VoxelModelData,
} from "../VoxelModels/VoxelModel.types";

type StartRendererProps = {
  voxels: VoxelData[];
  geometry?: VoxelGeometryData[];
  models?: VoxelModelData[];
} & DVERInitData;
export async function StartRenderer(props: StartRendererProps) {
  const DVER = new DivineVoxelEngineRender();

  const t = performance.now();
  await DVER.init(props);
  console.log("DONE INIT DVE", performance.now() - t);

  const t2 = performance.now();
  InitVoxelData({
    world: DVER.threads.world,
    constructors: DVER.threads.construcotrs,
    geometry: props.geometry,
    models: props.models,
    voxels: props.voxels,
  });
  console.log("DONE INIT VOXEL DATA", performance.now() - t2);

  return DVER;
}
