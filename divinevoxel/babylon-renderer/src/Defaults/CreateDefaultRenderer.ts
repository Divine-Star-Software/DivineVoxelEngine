import { DVEBabylonRenderer } from "../DVEBabylonRenderer.js";
import { DefaultMaterialManager } from "./DefaultMaterialManager.js";
import { SceneTool } from "./Tools/SceneTool";
import {
  DVEBRDefaultMaterialBaseData,
  NodeSubstanceData,
} from "./Types/DVEBRDefaultMaterial.types";
import { URIMaterial } from "@divinestar/uri/Materials/URIMaterial.js";
import { DVEBRScene } from "../Scene/DVEBRScene.js";
import type { Material, Scene } from "@babylonjs/core";
import { NodeMaterialData } from "@divinevoxel/core/Interfaces/Render/Nodes/DVERenderNode.types";
import { DVEBRNodeMesh } from "../Nodes/Meshes/DVEBRNodeMesh.js";
import { TextureBuilder } from "@divinevoxel/default/Textures/TextureBuilder";
import { TextureManager } from "@divinevoxel/default/Textures/TextureManager";
const defaultSubstances = ["#dve_flora", "#dve_solid", "#dve_liquid"];

export function CreateDefaultRenderer(
  initData: DVEBRDefaultMaterialBaseData & {
    createMaterial: (
      scene: DVEBRScene,
      matData: NodeMaterialData
    ) => URIMaterial<DVEBRScene, any, Material>;
    afterCreate?:()=>Promise<void>
  }
) {
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
        mipMapBias: id == "#dve_flora" ? -5 : 0,
      },
      textureType: id,
      shaderId: createVoxelShader(id),
      mesh: {
        materialId: id,
        boundingBoxMaxSize: [1, 1, 1],
      },
    };
  });

  renderer.init = async (dver) => {
    const substances = [...DefaultSubstances, ...initData.substances];
    TextureManager.addTextureType("#dve_node_texture");
    for (const data of substances) {
      TextureManager.addTextureType(data.textureType);
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
    const uvMap = TextureManager.generateTextureUVMap();
    for (const constructor of dver.constructorCommManager.__comms) {
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
        })
      );
    }

    materials.push(
      {
        id: "#dve_node_texture",
        shaderId: "#dve_node_texture",
        textureTypeId: "#dve_node_texture",
        alphaBlending: true,
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
        id: "dve_node_texture",
        materialId: "dve_node_texture",
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
      .levels.setBase(1)

      .fog.setColor(0.1)
      .fog.setMode("volumetric")
      .fog.setDensity(0.1)
      .fog.setHeightFactor(10.1)
      .options.doAO(true)
      .doEffects(false)
      .doSun(false)
      .doRGB(true);

      initData.afterCreate && await initData.afterCreate();
  };
  return renderer;
}
