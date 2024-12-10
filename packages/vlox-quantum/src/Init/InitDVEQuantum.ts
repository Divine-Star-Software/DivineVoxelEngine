import { DefaultMaterialManager } from "../Materials/DefaultMaterialManager";
import {
  DVEBRDefaultMaterialBaseData,
  NodeSubstanceData,
} from "../Materials/DVEQRDefaultMaterial.types";
import { NodeMaterialData } from "@divinevoxel/vlox/Interfaces/Render/Nodes/DVERenderNode.types";
import { DVEQRNodeMesh } from "../Adapter/Nodes/Meshes/DVEQRNodeMesh.js";
import { TextureBuilder } from "@divinevoxel/vlox/Textures/TextureBuilder";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { DVEQuantumRenderer } from "../Adapter/DVEQuantumRenderer.js";
import { DVEQMaterial } from "../Materials/DVEQMaterial";
import { ImageArrayTexture } from "../Renderer/Textures/ImageArrayTexture";
import { Scene } from "../Renderer/Scene/Scene";
import { TextureData } from "@divinevoxel/vlox/Textures/Texture.types";
import { VoxelScene } from "../Renderer/Scene/VoxelScene/VoxelScene";

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
  TextureManager.registerTexture(textureData);
  await TextureManager.$INIT();
  await TextureManager.createRawDataMap();

  for (const [key, type] of TextureManager.textureTypes) {
    if (!type.images!.length) continue;
    type.shaderTexture = new ImageArrayTexture(type.images!, scene);
  }
}

export default async function CreateDefaultRenderer(
  initData: DVEBRDefaultMaterialBaseData & {}
): Promise<DVEQuantumRenderer> {
  const renderer = new DVEQuantumRenderer({
    scene: initData.scene,
  });

  const scene = initData.scene;

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
      textureType: id,
      shaderId: createVoxelShader(id),
      mesh: {
        boundingBoxMaxSize: [1, 1, 1],
        type: "chunk",
      },
    };
  });

  await CreateTextures(initData.scene, initData.textureData);

  scene.voxelScene = new VoxelScene(scene, scene.renderRadius);
  await scene.voxelScene.init();
  scene.voxelScene.setCamera(scene.activeCamera!);
  scene._isReady = true;
  renderer.init = async (dver) => {
    const uvMap = TextureManager.generateTextureUVMap();

    for (const constructor of dver.threads.construcotrs.getThreads()) {
      await constructor.runAsyncTasks("sync-texuture-index", uvMap);
    }

    const meshes: DVEQRNodeMesh[] = [];
    const materials: NodeMaterialData[] = [];
    for (const substance of DefaultSubstances) {
      const newMaterial = {
        id: substance.id,
        shaderId: substance.id,
        textureTypeId: substance.id,
        ...substance.material,
      };

      materials.push(newMaterial);
      meshes.push(
        new DVEQRNodeMesh(
          {
            id: substance.id,
            materialId: newMaterial.id,
            boundingBoxMaxSize: [16, 16, 16],
            type: substance.mesh.type,
            worldMesh: true,
          },
          initData.scene
        )
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
      new DVEQRNodeMesh(
        {
          id: "#dve_node",
          materialId: "#dve_node",
          boundingBoxMaxSize: [1, 1, 1],
        },
        initData.scene
      )
    );

    for (const mesh of meshes) {
      renderer.nodes.meshes.register(mesh.data.id, mesh);
    }
    for (const mat of materials) {
      renderer.nodes.materials.register(mat.id, new DVEQMaterial(mat.id, mat));
    }
    DefaultMaterialManager.init();
    /* 

    initData.scene.registerBeforeRender(() => {
      DefaultMaterialManager.updateUniforms();
    });
    setInterval(() => {
      DefaultMaterialManager.runEffects();
    }, 20);
 */

    TextureManager.$START_ANIMATIONS();

    // initData.afterCreate && (await initData.afterCreate({} as any));
  };
  return renderer;
}
