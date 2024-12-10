import { DVEBRShaderStore } from "../../Renderer/Shaders/DVEBRShaderStore";
import { DVEBRClassicMaterial } from "../../Matereials/Classic/DVEBRClassicMaterial";
import { DVEBRDefaultMaterialBaseData } from "../../Matereials/Types/DVEBRDefaultMaterial.types";
import {
  CreateDefaultRenderer,
  CreateTextures,
} from "../../Renderer/CreateDefaultRenderer";
import { HemisphericLight, Vector3 } from "@babylonjs/core";
import { URIShaderTypes } from "@amodx/uri/Constants/URIShaderTypes";
import { VoxelBaseShader } from "../../Renderer/Shaders/Code/VoxelBaseShader";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { SkyboxShader } from "../../Renderer/Shaders/Code/SkyboxShader";
import { NodeShader } from "../../Renderer/Shaders/Code/NodeShader";
export type DVEBRClassicData = DVEBRDefaultMaterialBaseData & {
  doSun?: boolean;
  doRGB?: boolean;
  doAO?: boolean;
};
const defaultSubstances = [
  "#dve_glow",
  "#dve_flora",
  "#dve_solid",
  "#dve_transparent",
  "#dve_liquid",
];

export default async function InitDVEBRClassic(initData: DVEBRClassicData) {
  await CreateTextures(initData.scene, initData.textureData);

  DVEBRShaderStore.storeShader(
    "#dve_skybox",
    URIShaderTypes.Vertex,
    SkyboxShader.GetVertex()
  );

  DVEBRShaderStore.storeShader(
    "#dve_skybox",
    URIShaderTypes.Fragment,
    SkyboxShader.GetFragment()
  );

  DVEBRShaderStore.setShaderData(
    "#dve_skybox",
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
  const nodeTexture = TextureManager.getOrAddTextureType("#dve_node");
  const nodeTextureLength = nodeTexture.animationUniform.length;
  DVEBRShaderStore.storeShader(
    "#dve_node",
    URIShaderTypes.Vertex,
    NodeShader.GetVertex({
      textureLength: nodeTextureLength,
    })
  );

  DVEBRShaderStore.storeShader(
    "#dve_node",
    URIShaderTypes.Fragment,
    NodeShader.GetFragment()
  );

  DVEBRShaderStore.setShaderData(
    "#dve_node",
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
  const voxelTexture = TextureManager.getOrAddTextureType("#dve_voxel");
  const voxelTextureLength = voxelTexture.animationUniform.length;
  for (const substance of defaultSubstances) {
    DVEBRShaderStore.setShaderData(
      substance,
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
      substance,
      URIShaderTypes.Vertex,
      VoxelBaseShader.GetVertex({
        doAO: true,
        textureLength: voxelTextureLength,
      })
    );
    DVEBRShaderStore.storeShader(
      substance,
      URIShaderTypes.Fragment,
      VoxelBaseShader.GetFragment({
        doAO: !substance.includes("liquid"),
      })
    );
  }

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
      newMat.createMaterial(scene._scene);
      return newMat;
    },

    scene: initData.scene,
    textureData: initData.textureData,
    textureTypes: initData.textureTypes,
    substances: initData.substances,
  });
  return r;
}
