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

const defaultSubstances = [
  "#dve_glow",
  "#dve_flora",
  "#dve_solid",
  "#dve_transparent",

  "#dve_liquid",
];

export default function CreateDefaultRenderer(
  initData: DVEBRDefaultMaterialBaseData & {}
): DVEQuantumRenderer {
  const renderer = new DVEQuantumRenderer({
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

    for (const constructor of dver.threads.construcotrs.getThreads()) {
      await constructor.runAsyncTasks("sync-texuture-index", uvMap);
    }

    const meshes: DVEQRNodeMesh[] = [];
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
        new DVEQRNodeMesh({
          id: substance.id,
          materialId: newMaterial.id,
          boundingBoxMaxSize: [16, 16, 16],
          type: substance.mesh.type,
          worldMesh:true
        },initData.scene)
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
      new DVEQRNodeMesh({
        id: "#dve_node_texture",
        materialId: "#dve_node_texture",
        boundingBoxMaxSize: [1, 1, 1],
      },initData.scene)
    );

    for (const mesh of meshes) {
      renderer.nodes.meshes.register(mesh.data.id, mesh);
    }
    for (const mat of materials) {
      renderer.nodes.materials.register(
        mat.id,
        new DVEQMaterial(mat.id, mat)
      );
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
