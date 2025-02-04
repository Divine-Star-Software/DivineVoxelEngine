import { DVEBRShaderStore } from "../../Shaders/DVEBRShaderStore";
import { VoxelBaseShader } from "../../Shaders/Code/VoxelBaseShader";
import { SkyboxShader } from "../../Shaders/Code/SkyboxShader";
import { NodeShader } from "../../Shaders/Code/NodeShader";
import { DVEBRClassicMaterial } from "../../Matereials/Classic/DVEBRClassicMaterial";
import { DVEBRDefaultMaterialBaseData } from "../../Matereials/Types/DVEBRDefaultMaterial.types";
import {
  CreateDefaultRenderer,
  CreateTextures,
} from "../../Renderer/CreateDefaultRenderer";
import { HemisphericLight, ShaderMaterial, Vector3 } from "@babylonjs/core";

import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";

export type DVEBRClassicData = DVEBRDefaultMaterialBaseData & {
  doSun?: boolean;
  doRGB?: boolean;
  doAO?: boolean;
};
const defaultMaterials = [
  "dve_glow",
  "dve_flora",
  "dve_solid",
  "dve_transparent",
  "dve_liquid",
];

export default async function InitDVEBRClassic(initData: DVEBRClassicData) {
  await CreateTextures(initData.scene, initData.textureData);

  DVEBRShaderStore.storeShader(
    "dve_skybox",
    "vertex",
    SkyboxShader.GetVertex()
  );

  DVEBRShaderStore.storeShader(
    "dve_skybox",
    "frag",
    SkyboxShader.GetFragment()
  );

  DVEBRShaderStore.setShaderData(
    "dve_skybox",
    [
      "time",
      "fogOptions",
      "vFogColor",
      "sunLightLevel",
      "baseLevel",
      "doEffects",
      "world",
      "viewProjection",
      "worldOrigin",
      "cameraPosition",
      "cameraDirection",
    ],
    ["position", "normal", "indices"]
  );

/*   DVEBRShaderStore.storeShader(
    "dve_node",
    "vertex",
    NodeShader.GetVertex({
      textureLength: 0,
    })
  );

  DVEBRShaderStore.storeShader("dve_node", "frag", NodeShader.GetFragment());

  DVEBRShaderStore.setShaderData(
    "dve_node",
    [
      "time",
      "fogOptions",
      "vFogColor",
      "sunLightLevel",
      "baseLevel",
      "doEffects",
      "world",
      "viewProjection",
      "worldOrigin",
      "cameraPosition",
      "cameraDirection",
    ],
    ["position", "normal", "indices"]
  ); */
  const voxelTexture = TextureManager.getTexture("dve_voxel");
  const voxelTextureLength = voxelTexture.animations.length;
  for (const material of defaultMaterials) {
    DVEBRShaderStore.setShaderData(
      material,
      [
        "time",
        "fogOptions",
        "vFogColor",
        "sunLightLevel",
        "baseLevel",
        "doAO",
        "doSun",
        "doRGB",
        "doColor",
        "doEffects",
        "mipMapBias",
        "world",
        "viewProjection",
        "worldOrigin",
        "cameraPosition",
        "lightGradient",
        `dve_voxel_texture_animations`,
        "dve_texture",
      ],
      [
        "position",
        "normal",
        "indices",
        "voxelData",
        "textureIndex",
        "uv",
        "colors",
      ]
    );
    DVEBRShaderStore.storeShader(
      material,
      "vertex",
      VoxelBaseShader.GetVertex({
        doAO: true,
        textureLength: voxelTextureLength,
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

  let time = 0;
  const materials: ShaderMaterial[] = [];
  initData.scene.registerBeforeRender(() => {
    for (let i = 0; i < materials.length; i++) {
      materials[i].setFloat("time", time);
    }
    time++;
  });

  const r = await CreateDefaultRenderer({
    afterCreate: async (scene) => {
      if (initData.doSun === undefined || initData.doSun === true) {
        scene.options.doSun(true);
        scene.levels.setSun(0.0);
        scene.levels.setBase(0.01);
      }
      if (initData.doRGB === undefined || initData.doRGB === true)
        scene.options.doRGB(true);
      if (initData.doAO === undefined || initData.doAO === true)
        scene.options.doAO(true);

      scene.options.doEffects(true);
      const hemLight = new HemisphericLight(
        "",
        new Vector3(0, -1, 0),
        initData.scene
      );
      hemLight.specular.set(0, 0, 0);
      hemLight.intensity = 0.1;
    },

    //@ts-ignore
    createMaterial: (scene, matData) => {
      const newMat = new DVEBRClassicMaterial(matData.id, {
        scene: scene,
        data: {
          effectId: matData.shaderId,
          textureTypeId: matData.textureTypeId || "",
        },
        ...matData,
      });
      newMat.createMaterial(scene);
      materials.push(newMat._material);
      return newMat;
    },

    scene: initData.scene,
    textureData: initData.textureData,
    textureTypes: initData.textureTypes,
    substances: initData.substances,
  });
  return r;
}
