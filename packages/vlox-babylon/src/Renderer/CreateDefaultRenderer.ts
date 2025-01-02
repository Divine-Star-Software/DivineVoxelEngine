import { DVEBabylonRenderer } from "./DVEBabylonRenderer.js";
import { DefaultMaterialManager } from "../Matereials/DefaultMaterialManager.js";
import {
  DVEBRDefaultMaterialBaseData,
  NodeSubstanceData,
} from "../Matereials/Types/DVEBRDefaultMaterial.types.js";
import { URIMaterial } from "@amodx/uri/Materials/URIMaterial.js";
import { DVEBRScene } from "./Scene/DVEBRScene.js";
import type { Material, Scene } from "@babylonjs/core";
import { NodeMaterialData } from "@divinevoxel/vlox/Interfaces/Render/Nodes/DVERenderNode.types";
import { DVEBRNodeMesh } from "./Nodes/Meshes/DVEBRNodeMesh.js";
import { TextureBuilder } from "@divinevoxel/vlox/Textures/TextureBuilder";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { SceneTool } from "../Tools/SceneTool.js";
import InitDefaultEffects from "../Effects/InitDefaultEffects.js";
import { TextureData } from "@divinevoxel/vlox/Textures/Texture.types.js";
import { ImageArrayTexture } from "./Textures/ImageArrayTexture.js";
import { CacheManager } from "@divinevoxel/vlox/Cache/CacheManager.js";
const defaultSubstances = [
  "#dve_glow",
  "#dve_flora",
  "#dve_solid",
  "#dve_transparent",
  "#dve_liquid",
];

export async function CreateTextures(scene: Scene, textureData: TextureData[]) {
  TextureManager.getOrAddTextureType("#dve_voxel");
  TextureManager.getOrAddTextureType("#dve_node");

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
    createMaterial: (
      scene: DVEBRScene,
      matData: NodeMaterialData
    ) => URIMaterial<DVEBRScene, any, Material>;
    afterCreate?: (sceneTool: SceneTool) => Promise<void>;
  }
): DVEBabylonRenderer {
  const renderer = DVEBabylonRenderer.instance
    ? DVEBabylonRenderer.instance
    : new DVEBabylonRenderer({
        scene: initData.scene,
      });

  const createVoxelShader = (id: string) => {
    const shader = DefaultMaterialManager.shaders.createVoxelShader(id);
    shader.setCodeBody("vertex", `@${id}_vertex`);
    shader.setCodeBody("frag", `@${id}_frag`);
    DefaultMaterialManager.shaders.register.create([shader]);
    return id;
  };

  const DefaultSubstances: NodeSubstanceData[] = defaultSubstances.map((id) => {
    return {
      id,
      material: {
        alphaBlending:
          id == "#dve_liquid" || id == "#dve_transparent" ? true : false,
        alphaTesting: true,
        backFaceCulling:
          id == "#dve_liquid" || id == "#dve_flora" ? false : true,
        stencil: id == "#dve_liquid" ? true : undefined,
        mipMapBias: -0.6,
      },
      textureType: "#dve_voxel",
      shaderId: id,
      mesh: {
        boundingBoxMaxSize: [1, 1, 1],
        type: "chunk",
      },
    };
  });

  renderer.init = async (dver) => {
    const substances = [...DefaultSubstances, ...initData.substances];

    DefaultMaterialManager.shaders.register.create([
      DefaultMaterialManager.shaders.createSkyBoxShader("#dve_skybox"),
      DefaultMaterialManager.shaders.createBasicTextureShader("#dve_node"),
    ]);

    const skybox = DefaultMaterialManager.shaders
      .createBasicTextureShader("#dve_node")
      .compile();

    const uvMap = TextureManager.generateTextureUVMap();

    for (const constructor of dver.threads.construcotrs.getThreads()) {
      await constructor.runAsyncTasks("sync-texuture-index", uvMap);
    }

    const meshes: DVEBRNodeMesh[] = [];
    const materials: NodeMaterialData[] = [];
    for (const substance of substances) {
      const newMaterial = {
        id: substance.id,
        shaderId: substance.id,
        textureTypeId: "#dve_voxel",
        ...substance.material,
      };

      materials.push(newMaterial);
      meshes.push(
        new DVEBRNodeMesh({
          id: substance.id,
          materialId: newMaterial.id,
          boundingBoxMaxSize: [16, 16, 16],
          type: substance.mesh.type,
        })
      );
    }

    materials.push(
      {
        id: "#dve_node",
        shaderId: "#dve_node",
        textureTypeId: "#dve_node",
        alphaBlending: false,
        alphaTesting: true,
      },
      {
        id: "#dve_skybox",
        shaderId: "#dve_skybox",
        textureTypeId: "",
        alphaBlending: false,
        alphaTesting: false,
      }
    );
    meshes.push(
      new DVEBRNodeMesh({
        id: "#dve_node",
        materialId: "#dve_node",
        boundingBoxMaxSize: [1, 1, 1],
      })
    );

    for (const mesh of meshes) {
      renderer.nodes.meshes.register(mesh.data.id, mesh);
    }
    for (const mat of materials) {
      renderer.nodes.materials.register(
        mat.id,
        initData.createMaterial(renderer.scene, mat)
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
