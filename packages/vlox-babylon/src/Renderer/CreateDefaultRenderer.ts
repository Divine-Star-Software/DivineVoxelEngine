import { DVEBabylonRenderer } from "./DVEBabylonRenderer.js";
import { DefaultMaterialManager } from "../Matereials/DefaultMaterialManager.js";
import {
  DVEBRDefaultMaterialBaseData,
  NodeSubstanceData,
} from "../Matereials/Types/DVEBRDefaultMaterial.types.js";

import { Engine, RawTexture, type Material, type Scene } from "@babylonjs/core";
import { NodeMaterialData } from "@divinevoxel/vlox/Renderer/DVERenderNode.types";

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
  if (CacheManager.cacheLoadEnabled && CacheManager.cachedData?.textures) {
    TextureManager.registerTexture(CacheManager.cachedData.textures);
  } else {
    TextureManager.registerTexture(textureData);
  }

  await TextureManager.compiledTextures({
    createCache: CacheManager.cacheStoreEnabled,
  });

  for (const [key, type] of TextureManager._compiledTextures) {
    if (!type.images!.length) continue;
    type.shaderTexture = new ImageArrayTexture(type.images!, scene);
    const animatedTexture = type.animatedTexture;
    animatedTexture.build();
    animatedTexture.shaderTexture = new RawTexture(
      animatedTexture._buffer,
      animatedTexture._size,
      animatedTexture._size,
      Engine.TEXTUREFORMAT_RED_INTEGER,
      null,
      false,
      undefined,
      Engine.TEXTURE_NEAREST_NEAREST,
      Engine.TEXTURETYPE_UNSIGNED_SHORT
    );
    (animatedTexture.shaderTexture as RawTexture).metadata = {
      buffer: animatedTexture._buffer,
    };
  }
}

export async function CreateDefaultRenderer(
  initData: DVEBRDefaultMaterialBaseData & {
    scene: Scene;
    createMaterial: (
      scene: Scene,
      matData: NodeMaterialData
    ) => MaterialInterface;
    afterCreate?: (sceneTool: SceneTool) => Promise<void>;
  }
): Promise<DVEBabylonRenderer> {
  const { scene } = initData;
  const renderer = DVEBabylonRenderer.instance
    ? DVEBabylonRenderer.instance
    : new DVEBabylonRenderer({
        scene,
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
    /*      {
      id: "dve_node",
      shaderId: "dve_node",
      textureTypeId: "dve_node",
      alphaBlending: false,
      alphaTesting: true,
    }, */
    {
      id: "dve_skybox",
      shaderId: "dve_skybox",
      textureTypeId: "",
      alphaBlending: false,
      alphaTesting: false,
    }
  );

  for (const mat of materials) {
    renderer.materials.register(mat.id, initData.createMaterial(scene, mat));
  }
  DefaultMaterialManager.init();
  scene.registerBeforeRender(() => {
    for (const [key, type] of TextureManager._compiledTextures) {
      if (type.animatedTexture.tick(scene.deltaTime)) {
        (type.animatedTexture.shaderTexture as RawTexture).update(
          type.animatedTexture._buffer
        );
      }
    }
    DefaultMaterialManager.runEffects();
    DefaultMaterialManager.updateUniforms();
  });

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
  renderer.init = async (dver) => {};
  return renderer;
}
