import { VoxParser } from "@divinevoxel/magic/Parser/VoxParser";
import { RayPipeline } from "../../Pipelines/Ray/RayPipeline";
import { RaySceneCompute } from "../../Pipelines/Ray/RaySceneCompute";
import { StorageBuffer } from "../../Core/Buffers/StorageBuffer";
import { VoxelSDFShader } from "./VoxelSDFShader";
import { UniformBuffer } from "../../Core/Buffers/UniformBuffer";
import { VoxelCubeShader } from "./VoxelCubeShader";
import { VoxelParameters } from "./Classes/VoxelParameters";
import { VoxelMaterials } from "./Classes/VoxelMaterials";
type InitDVEMRayMarchingProps = {
  parsed: VoxParser;
  casnvas: HTMLCanvasElement;
};

export default async function InitDVEMRayMarching({
  parsed,
  casnvas,
}: InitDVEMRayMarchingProps) {
  const rayPipeLine = new RayPipeline(casnvas);
  const rayScene = new RaySceneCompute(rayPipeLine);
  await rayPipeLine.init(rayScene);

  const { voxelGrid,voxelLookUp } = parsed.getGPUData();
  const sdf = parsed.getSDFGrid();

  const material = new VoxelMaterials(rayPipeLine.engine);

  let index = 0;
  for (const color of parsed.palette) {
    material.setIndex(index);
    material.setColor(color);

    index++;
  }
  rayScene.init({
    uniforms: [
      new VoxelParameters(rayPipeLine.engine)
        .setMaxDistanceToCheck(1000)
        .setVoxelGridSize(0.1)
        .setVoxelGridDimensions(parsed.size!.x, parsed.size!.y, parsed.size!.z)
        .setElipson(0.001)
        .sync().uniform,

      material.sync().uniform,
    ],
    buffers: [
      /*       new StorageBuffer(
        rayPipeLine.engine,
        "voxelSDF",
        sdf.byteLength,
        "var<storage, read_write> voxelSDF: VoxelSDF"
      ).write(sdf), */
      new StorageBuffer(
        rayPipeLine.engine,
        "voxelGrid",
        voxelGrid.byteLength,
        "var<storage, read_write> voxelGrid: VoxelData"
      ).write(voxelGrid),
      new StorageBuffer(
        rayPipeLine.engine,
        "voxelLookUp",
        sdf.byteLength,
        "var<storage, read_write> voxelLookUp: VoxelLookUp"
      ).write(sdf),
    ],
    textures: [],
    sampler: [],
    code: {
      up: VoxelCubeShader.define,
      beforeMain: VoxelCubeShader.functions,
    },
  });


  rayPipeLine.render();
}
