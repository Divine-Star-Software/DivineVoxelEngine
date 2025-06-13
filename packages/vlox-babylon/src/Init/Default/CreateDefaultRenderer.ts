import { DVEBabylonRenderer } from "../../Renderer/DVEBabylonRenderer.js";
import {
  DVEBRDefaultMaterialBaseData,
  NodeSubstanceData,
} from "../../Matereials/Types/DVEBRDefaultMaterial.types.js";

import type { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { RawTexture } from "@babylonjs/core/Materials/Textures/rawTexture";
import { NodeMaterialData } from "@divinevoxel/vlox/Renderer/DVERenderNode.types";

import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import InitDefaultEffects from "../../Effects/InitDefaultEffects.js";
import { TextureData } from "@divinevoxel/vlox/Textures/Texture.types.js";
import { ImageArrayTexture } from "../../Textures/ImageArrayTexture.js";
import { CacheManager } from "@divinevoxel/vlox/Cache/CacheManager.js";
import { MaterialInterface } from "../../Matereials/MaterialInterface.js";
import { VoxelScene } from "../../Scene/VoxelScene.js";
import { WorkItemProgress } from "@divinevoxel/vlox/Util/WorkItemProgress.js";

const defaultSubstances = [
  "dve_glow",
  "dve_flora",
  "dve_flora_transparent",
  "dve_solid",
  "dve_transparent",
  "dve_liquid",
];

export async function CreateTextures(
  scene: Scene,
  textureData: TextureData[],
  progress: WorkItemProgress
) {
  progress.setStatus("Creating Textures");
  if (CacheManager.cacheLoadEnabled && CacheManager.cachedData?.textures) {
    TextureManager.registerTexture(CacheManager.cachedData.textures);
  } else {
    TextureManager.registerTexture(textureData);
  }

  await TextureManager.compiledTextures({
    createCache: CacheManager.cacheStoreEnabled,
  },progress);

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
  progress.setStatus("Done");
  await progress.wait(100);
}

export async function CreateDefaultRenderer(
  initData: DVEBRDefaultMaterialBaseData & {
    scene: Scene;
    createMaterial: (
      renderer: DVEBabylonRenderer,
      scene: Scene,
      matData: NodeMaterialData
    ) => MaterialInterface;
    afterCreate?: (scene: VoxelScene) => Promise<void>;
    progress: WorkItemProgress;
  }
): Promise<DVEBabylonRenderer> {
  const { scene, progress } = initData;
  progress.setStatus("Creating Default Renderer");
  progress.setWorkLoad(4);
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
          id == "dve_liquid" ||
          id == "dve_transparent" ||
          id == "dve_flora_transparent"
            ? true
            : false,
        alphaTesting:
          id != "dve_liquid" &&
          id != "dve_transparent" &&
          id != "dve_flora_transparent"
            ? false
            : true,
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
      id: "dve_voxel_particle",
      shaderId: "dve_voxel_particle",
      textureTypeId: "dve_voxel",
      alphaBlending: true,
      alphaTesting: false,
    }
  );

  for (const mat of materials) {
    renderer.materials.register(
      mat.id,
      initData.createMaterial(renderer, scene, mat)
    );
  }

  let time = 0;
  console.warn(TextureManager._compiledTextures.get("dve_voxel"));
  scene.registerBeforeRender(() => {
    if (scene.deltaTime === undefined) return;
    for (const [key, type] of TextureManager._compiledTextures) {
      if (type.animatedTexture.tick(scene.deltaTime)) {
        (type.animatedTexture.shaderTexture as RawTexture).update(
          type.animatedTexture._buffer
        );
      }
    }
    renderer.voxelScene.options.ubo.updateTime(time);
    time += 0.1;
    renderer.voxelScene.options.ubo.update();
  });

  InitDefaultEffects();
  initData.afterCreate && (await initData.afterCreate(renderer.voxelScene));
  progress.completeWorkItems(4);
  progress.setStatus("Done");
  await progress.wait(100);
  return renderer;
}
