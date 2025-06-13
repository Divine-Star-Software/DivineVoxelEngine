import { DVEBRShaderStore } from "../../Shaders/DVEBRShaderStore";
import { VoxelBaseShader } from "../../Shaders/Code/VoxelBaseShader";
import { VoxelParticleShader } from "../../Shaders/Code/VoxelParticleShader";
import { DVEBRClassicMaterial } from "../../Matereials/Classic/DVEBRClassicMaterial";
import { DVEBRDefaultMaterialBaseData } from "../../Matereials/Types/DVEBRDefaultMaterial.types";
import {
  CreateDefaultRenderer,
  CreateTextures,
} from "../Default/CreateDefaultRenderer";
import { WorkItemProgress } from "@divinevoxel/vlox/Util/WorkItemProgress";
export type DVEBRClassicData = DVEBRDefaultMaterialBaseData & {
  doSun?: boolean;
  doRGB?: boolean;
  doAO?: boolean;
} & {
  getProgress?: (progress: WorkItemProgress) => void;
};
const defaultMaterials = [
  "dve_glow",
  "dve_flora",
  "dve_flora_transparent",
  "dve_solid",
  "dve_transparent",
  "dve_liquid",
];

export default async function InitDVEBRClassic(initData: DVEBRClassicData) {
  const progress = new WorkItemProgress();
  if (initData.getProgress) initData.getProgress(progress);
  progress.startTask("Init Classic Renderer");
  await CreateTextures(initData.scene, initData.textureData, progress);

  DVEBRShaderStore.setShaderData(
    "dve_voxel_particle",
    [
      "world",
      "viewProjection",
      "dve_voxel",
      "dve_voxel_animation",
      "dve_voxel_animation_size",
    ],
    ["position", "normal", "uv", "color"]
  );

  DVEBRShaderStore.storeShader(
    "dve_voxel_particle",
    "vertex",
    VoxelParticleShader.GetVertex()
  );

  DVEBRShaderStore.storeShader(
    "dve_voxel_particle",
    "frag",
    VoxelParticleShader.GetFragment()
  );

  for (const material of defaultMaterials) {
    DVEBRShaderStore.setShaderData(
      material,
      [
        "world",
        "viewProjection",
        "worldOrigin",
        "cameraPosition",
        "dve_voxel",
        "dve_voxel_animation",
        "dve_voxel_animation_size",
      ],
      ["position", "normal", "voxelData", "textureIndex", "uv", "colors"]
    );
    DVEBRShaderStore.storeShader(
      material,
      "vertex",
      VoxelBaseShader.GetVertex({
        doAO: true,
      })
    );
    DVEBRShaderStore.storeShader(
      material,
      "frag",
      material.includes("liquid")
        ? VoxelBaseShader.GetFragment(
            VoxelBaseShader.DefaultLiquidFragmentMain(true)
          )
        : VoxelBaseShader.GetFragment(VoxelBaseShader.DefaultFragmentMain(true))
    );
  }

  const renderer = await CreateDefaultRenderer({
    progress,
    afterCreate: async (scene) => {},
    createMaterial: (renderer, scene, matData) => {
      const newMat = new DVEBRClassicMaterial(
        renderer.voxelScene.options,
        matData.id,
        {
          scene,
          data: {
            effectId: matData.shaderId,
            textureTypeId: matData.textureTypeId || "",
          },
          ...matData,
        }
      );
      newMat.createMaterial(scene);
      return newMat;
    },
    scene: initData.scene,
    textureData: initData.textureData,
    textureTypes: initData.textureTypes,
    substances: initData.substances,
  });

  renderer.voxelScene.options.shade.doSun = true;
  renderer.voxelScene.options.shade.doRGB = true;
  renderer.voxelScene.options.shade.doAO = true;
  renderer.voxelScene.options.shade.doColor = true;
  renderer.voxelScene.options.levels.baseLevel = 0.1;
  renderer.voxelScene.options.levels.sunLevel = 1;
  renderer.voxelScene.options.fog.setColor(255, 255, 255);
  renderer.voxelScene.options.fog.heightFactor = 0.25;
  renderer.voxelScene.options.sky.setColor(130, 174, 255);
  renderer.voxelScene.options.sky.horizonStart = 0;
  renderer.voxelScene.options.sky.horizon = 64;
  renderer.voxelScene.options.sky.horizonEnd = 120;
  renderer.voxelScene.options.sky.startBlend = 100;
  renderer.voxelScene.options.sky.endBlend = 150;

  renderer.voxelScene.options.ubo.buffer.update();

  progress.endTask();
  return renderer;
}
