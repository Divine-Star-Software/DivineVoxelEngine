import { DVEBabylonRenderer } from "./DVEBabylonRenderer.js";
import { DefaultMaterialManager } from "../Matereials/DefaultMaterialManager.js";
import {
  DVEBRDefaultMaterialBaseData,
  NodeSubstanceData,
} from "../Matereials/Types/DVEBRDefaultMaterial.types.js";

import type { Material, Scene } from "@babylonjs/core";
import { NodeMaterialData } from "@divinevoxel/vlox/Interfaces/Render/DVERenderNode.types";

import { TextureBuilder } from "@divinevoxel/vlox/Textures/TextureBuilder";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { SceneTool } from "../Tools/SceneTool.js";
import InitDefaultEffects from "../Effects/InitDefaultEffects.js";
import { TextureData } from "@divinevoxel/vlox/Textures/Texture.types.js";
import { ImageArrayTexture } from "../Textures/ImageArrayTexture.js";
import { CacheManager } from "@divinevoxel/vlox/Cache/CacheManager.js";
import { MaterialInterface } from "Matereials/MaterialInterface.js";
const defaultSubstances = [
  "dve_glow",
  "dve_flora",
  "dve_solid",
  "dve_transparent",
  "dve_liquid",
];

export async function CreateTextures(scene: Scene, textureData: TextureData[]) {
  TextureManager.getOrAddTextureType("dve_voxel");
  TextureManager.getOrAddTextureType("dve_node");

  await TextureBuilder.setUpImageCreation();

  if (CacheManager.cacheLoadEnabled && CacheManager.cachedData?.textures) {
    TextureManager.registerTexture(CacheManager.cachedData.textures);
  } else {
    TextureManager.registerTexture(textureData);
  }

  await TextureManager.$INIT();
  await TextureManager.createRawDataMap();

  if (CacheManager.cacheStoreEnabled) {
    CacheManager.cachedTextureData = await TextureManager.createCached();
  }

  for (const [key, type] of TextureManager.textureTypes) {
    if (!type.images!.length) continue;
    type.shaderTexture = new ImageArrayTexture(type.images!, scene);
  }
}

export function CreateDefaultRenderer(
  initData: DVEBRDefaultMaterialBaseData & {
    scene: Scene;
    createMaterial: (
      scene: Scene,
      matData: NodeMaterialData
    ) => MaterialInterface;
    afterCreate?: (sceneTool: SceneTool) => Promise<void>;
  }
): DVEBabylonRenderer {
  const renderer = DVEBabylonRenderer.instance
    ? DVEBabylonRenderer.instance
    : new DVEBabylonRenderer({
        scene: initData.scene,
      });

  const DefaultSubstances: NodeSubstanceData[] = defaultSubstances.map((id) => {
    return {
      id,
      material: {
        alphaBlending:
          id == "dve_liquid" || id == "dve_transparent" ? true : false,
        alphaTesting: true,
        backFaceCulling: id == "dve_liquid" || id == "dve_flora" ? false : true,
        stencil: id == "dve_liquid" ? true : undefined,
        mipMapBias: -0.6,
      },
      textureType: "dve_voxel",
      shaderId: id,
      mesh: {
        boundingBoxMaxSize: [1, 1, 1],
        type: "chunk",
      },
    };
  });

  renderer.init = async (dver) => {
    const substances = [...DefaultSubstances, ...initData.substances];

    const materials: NodeMaterialData[] = [];
    for (const substance of substances) {
      const newMaterial = {
        id: substance.id,
        shaderId: substance.id,
        textureTypeId: "dve_voxel",
        ...substance.material,
      };

      materials.push(newMaterial);
    }

    materials.push(
      {
        id: "dve_node",
        shaderId: "dve_node",
        textureTypeId: "dve_node",
        alphaBlending: false,
        alphaTesting: true,
      },
      {
        id: "dve_skybox",
        shaderId: "dve_skybox",
        textureTypeId: "",
        alphaBlending: false,
        alphaTesting: false,
      }
    );

    for (const mat of materials) {
      renderer.materials.register(
        mat.id,
        initData.createMaterial(initData.scene, mat)
      );
    }
    DefaultMaterialManager.init();
    initData.scene.registerBeforeRender(() => {
      DefaultMaterialManager.updateUniforms();
    });
    setInterval(() => {
      DefaultMaterialManager.runEffects();
    }, 20);
    setInterval(() => {
      for (const [key, type] of TextureManager.textureTypes) {
        type.runAnimations();
      }
    }, 50);
    const sceneTool = DefaultMaterialManager.sceneTool;

    sceneTool.levels
      .setSun(0)
      .levels.setBase(0)

      .fog.setColor(0.1)
      .fog.setMode("volumetric")
      .fog.setDensity(0.0)
      .fog.setHeightFactor(10.1)
      .options.doAO(true)
      .doEffects(false)
      .doSun(false)
      .doRGB(true);

    InitDefaultEffects();
    initData.afterCreate && (await initData.afterCreate(sceneTool));
  };
  return renderer;
}
