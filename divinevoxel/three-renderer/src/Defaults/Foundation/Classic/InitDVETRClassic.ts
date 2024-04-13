import { Camera, Scene } from "three";
import { Vec3Array } from "@divinevoxel/core/Math";
import { TextureData } from "@divinevoxel/foundation/Textures/Texture.types";
import { TextureBuilder } from "@divinevoxel/foundation/Textures/TextureBuilder";
import { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render/DivineVoxelEngineRender";
import { TextureManager } from "@divinevoxel/foundation/Textures/TextureManager";
import { DefaultMaterialManager } from "../DefaultMaterialManager";
import { DVEThreeRenderer } from "../../DVEThreeRenderer";
import { DVEBRClassicMaterial } from "./DVETRClassicMaterial";
import { DVETRNodeMesh } from "../../Nodes/Meshes/DVETRNodeMesh";
import { SceneTool } from "../SceneTool";
export type DVEBRClassicData = {
  textureData: TextureData[];
  textureTypes: string[];
  substances: NodeSubstanceData[];
  scene: Scene;
  camera: Camera;
};
export type NodeMaterialOptions = {
  alphaTesting: boolean;
  alphaBlending: boolean;
  mipMapBias?: number;
  hasEffects?: boolean;
  backFaceCulling?: boolean;
};

export type NodeMeshData = {
  id: string;
  type?: string;
} & NodeMeshOptions;

export type NodeMeshOptions = {
  boundingBoxMaxSize: Vec3Array;
  type?: string;
};

export type NodeSubstanceData = {
  id: string;
  shaderId: string;
  textureType: string;
  material: NodeMaterialOptions;
  mesh: NodeMeshOptions;
};
const defaultSubstances = ["#dve_solid", "#dve_flora", "#dve_liquid"];

export default function InitDVEBRClassic(initData: DVEBRClassicData) {
  const renderer = new DVEThreeRenderer({
    scene: initData.scene,
    camera: initData.camera,
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

  renderer.init = async (dver:DivineVoxelEngineRender) => {
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
    console.log("REIGSTER TEXTURES", initData.textureData);
    TextureManager.registerTexture(initData.textureData);
    await TextureManager.$INIT();
    const uvMap = TextureManager.generateTextureUVMap();
    for (const constructor of dver.threads.constructors.__comms) {
      await constructor.runAsyncTasks("sync-texuture-index", uvMap);
    }
    const meshes: DVETRNodeMesh[] = [];
    const materials: DVEBRClassicMaterial[] = [];
    for (const substance of substances) {
      const newMaterial = new DVEBRClassicMaterial(substance.id, {
        scene: renderer.scene,
        data: {
          shaderId: substance.shaderId,
          textureTypeId: substance.textureType,
        },
      });

      materials.push(newMaterial);
      meshes.push(
        new DVETRNodeMesh({
          id: substance.id,
          materialId: newMaterial.id,
          boundingBoxMaxSize: [16, 16, 16],
        })
      );
    }
    materials.push(
      new DVEBRClassicMaterial("#dve_node_texture", {
        scene: renderer.scene,
        data: {
          shaderId: "#dve_node_texture",
          textureTypeId: "#dve_node_texture",
        },
      }),
      new DVEBRClassicMaterial("#dve_skybox", {
        scene: renderer.scene,
        data: {
          shaderId: "#dve_skybox",
          textureTypeId: "",
        },
      })
    );
    meshes.push(
      new DVETRNodeMesh({
        id: "dve_node_texture",
        materialId: "dve_node_texture",
        boundingBoxMaxSize: [1, 1, 1],
      })
    );

    for (const mesh of meshes) {
      renderer.nodes.meshes.register(mesh.data.id, mesh);
    }
    for (const mat of materials) {
      console.log("CREATE MATERIAL",mat.id)
      mat.createMaterial(initData.scene);
      renderer.nodes.materials.register(mat.id, mat);
    }
    DefaultMaterialManager.init();

    renderer.scene.registerBeforeRender(() => {
      DefaultMaterialManager.updateUniforms();
    });
    setInterval(() => {
      DefaultMaterialManager.runEffects();
    }, 20);
    TextureManager.$START_ANIMATIONS();

    const sceneTool = new SceneTool();
    sceneTool.levels
      .setSun(0.5)
      .levels.setBase(0)

      .fog.setColor(0.1)
      .fog.setMode("volumetric")
      .fog.setDensity(0.0)
      .options.doAO(true)
      .doEffects(true)
      .doSun(true)
      .doRGB(true);
  };
  return renderer;
}
