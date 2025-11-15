import { DefaultMaterialManager } from "../Materials/DefaultMaterialManager";
import {
  DVEBRDefaultMaterialBaseData,
  NodeSubstanceData,
} from "../Materials/DVEQRDefaultMaterial.types";
import { NodeMaterialData } from "@divinevoxel/vlox/Renderer/DVERenderNode.types";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { DVEQuantumRenderer } from "../Adapter/DVEQuantumRenderer.js";
import { DVEQMaterial } from "../Materials/DVEQMaterial";
import { ImageArrayTexture } from "../Renderer/Textures/ImageArrayTexture";
import { Scene } from "../Renderer/Scene/Scene";
import { TextureData } from "@divinevoxel/vlox/Textures/Texture.types";
import { VoxelScene } from "../Renderer/Scene/VoxelScene/VoxelScene";

const defaultSubstances = [
  "dve_glow",
  "dve_flora",
  "dve_solid",
  "dve_transparent",

  "dve_liquid",
];
export async function CreateTextures(scene: Scene, textureData: TextureData[]) {
  TextureManager.registerTexture(textureData);
  await TextureManager.compiledTextures();

  for (const [key, type] of TextureManager._compiledTextures) {
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
      textureType: id,
      shaderId: id,
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
    const materials: NodeMaterialData[] = [];
    for (const substance of DefaultSubstances) {
      const newMaterial = {
        id: substance.id,
        shaderId: substance.id,
        textureTypeId: substance.id,
        ...substance.material,
      };

      materials.push(newMaterial);
    }

    materials.push(
      {
        id: "dve_item",
        shaderId: "dve_item",
        textureTypeId: "dve_item",
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
      renderer.materials.register(mat.id, new DVEQMaterial(mat.id, mat));
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

    //   TextureManager.$START_ANIMATIONS();

    // initData.afterCreate && (await initData.afterCreate({} as any));
  };
  return renderer;
}
