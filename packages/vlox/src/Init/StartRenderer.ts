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

  await DVER.init(props);

  InitVoxelData({
    world: DVER.threads.world,
    constructors: DVER.threads.construcotrs,
    geometry: props.geometry,
    models: props.models,
    voxels: props.voxels,
  });

  return DVER;
}
