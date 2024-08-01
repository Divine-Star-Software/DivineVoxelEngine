import { DVEBabylonRenderer } from "../../DVEBabylonRenderer.js";
import { DefaultMaterialManager } from "./DefaultMaterialManager.js";
import {
  DVEBRDefaultMaterialBaseData,
  NodeSubstanceData,
} from "./Types/DVEBRDefaultMaterial.types";
import { URIMaterial } from "@amodx/uri/Materials/URIMaterial.js";
import { DVEBRScene } from "../../Scene/DVEBRScene.js";
import type { Material, Scene } from "@babylonjs/core";
import { NodeMaterialData } from "@divinevoxel/core/Interfaces/Render/Nodes/DVERenderNode.types";
import { DVEBRNodeMesh } from "../../Nodes/Meshes/DVEBRNodeMesh.js";
import { TextureBuilder } from "@divinevoxel/foundation/Textures/TextureBuilder";
import { TextureManager } from "@divinevoxel/foundation/Textures/TextureManager";
import { SceneTool } from "./Tools/SceneTool.js";
const defaultSubstances = [
  "#dve_glow",
  "#dve_flora",
  "#dve_solid",
  "#dve_liquid",
];

export function CreateDefaultRenderer(
  initData: DVEBRDefaultMaterialBaseData & {
    createMaterial: (
      scene: DVEBRScene,
      matData: NodeMaterialData
    ) => URIMaterial<DVEBRScene, any, Material>;
    afterCreate?: (sceneTool: SceneTool) => Promise<void>;
  }
): DVEBabylonRenderer {
  const renderer = new DVEBabylonRenderer({
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
        alphaBlending: id == "#dve_liquid" ? true : false,
        alphaTesting: true,
        backFaceCulling: id == "#dve_liquid" ? false : true,
        stencil: id == "#dve_liquid" ? true : undefined,
        mipMapBias: -0.6,
      },
      textureType: id,
      shaderId: createVoxelShader(id),
      mesh: {
        boundingBoxMaxSize: [1, 1, 1],
        type: "chunk",
      },
    };
  });

  renderer.init = async (dver) => {
    const substances = [...DefaultSubstances, ...initData.substances];

    TextureManager.getOrAddTextureType("#dve_node_texture");
    for (const data of substances) {
      TextureManager.getOrAddTextureType(data.textureType);
    }
    DefaultMaterialManager.shaders.register.create([
      DefaultMaterialManager.shaders.createSkyBoxShader("#dve_skybox"),
      DefaultMaterialManager.shaders.createBasicTextureShader(
        "#dve_node_texture"
      ),
    ]);


    await TextureBuilder.setUpImageCreation();
    TextureManager.registerTexture(initData.textureData);


    await TextureManager.$INIT();
    await TextureManager.createRawDataMap();
 
    const uvMap = TextureManager.generateTextureUVMap();

    for (const constructor of dver.core.threads.construcotrs.getThreads()) {
      await constructor.runAsyncTasks("sync-texuture-index", uvMap);
    }

    const meshes: DVEBRNodeMesh[] = [];
    const materials: NodeMaterialData[] = [];
    for (const substance of substances) {
      const newMaterial = {
        id: substance.id,
        shaderId: substance.id,
        textureTypeId: substance.id,
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
        id: "#dve_node_texture",
        shaderId: "#dve_node_texture",
        textureTypeId: "#dve_node_texture",
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
        id: "#dve_node_texture",
        materialId: "#dve_node_texture",
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
    TextureManager.$START_ANIMATIONS();
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

    initData.afterCreate && (await initData.afterCreate(sceneTool));
  };
  return renderer;
}
