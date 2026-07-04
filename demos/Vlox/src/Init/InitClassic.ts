import { Scene } from "@babylonjs/core/scene";
import { Camera } from "@babylonjs/core/Cameras/camera";
import InitDVErenderer from "@divinevoxel/vlox-babylon/Init/Classic/InitDVEBRClassic";
import { TextureData } from "@divinevoxel/vlox/Textures";
import { VoxelData } from "@divinevoxel/vlox/Voxels";
import { InitSkybox } from "@divinevoxel/vlox-babylon/Init/Skybox/InitSkybox";

export default async function InitPBR({
  scene,
  camera,
  textureData,
  voxelData,
}: {
  scene: Scene;
  camera: Camera;
  textureData: TextureData[];
  voxelData: VoxelData[];
}) {
  const renderer = await InitDVErenderer({
    textureTypes: [],
    substances: [],
    scene,
    textureData,
    camera,
  });

  InitSkybox({
    renderer,
  });

  return renderer;
}
