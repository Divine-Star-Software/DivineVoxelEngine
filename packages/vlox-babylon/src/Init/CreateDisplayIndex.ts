import {
  ArcRotateCamera,
  Engine,
  Mesh,
  Scene,
  Vector3,
  HemisphericLight,
} from "@babylonjs/core";

import { MeshVoxel } from "@divinevoxel/vlox/Mesher/Functions/MeshVoxel";
import { VoxelCursor } from "@divinevoxel/vlox//Voxels/Cursor/VoxelCursor";
import {
  VoxelData,
  RawVoxelData,
  PaintVoxelData,
} from "@divinevoxel/vlox/Voxels/";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";

import { SchemaRegister } from "@divinevoxel/vlox/Voxels/State/SchemaRegister";

import { DVEBRClassicMaterial } from "../Matereials/Classic/DVEBRClassicMaterial";
import { DefaultMaterialManager } from "../Matereials/DefaultMaterialManager";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { VoxelIndex } from "@divinevoxel/vlox/Voxels/Indexes/VoxelIndex";
import { VoxelModelIndex } from "@divinevoxel/vlox/Voxels/Indexes/VoxelModelIndex";
import { VoxelTextureIndex } from "@divinevoxel/vlox/Voxels/Indexes/VoxelTextureIndex";
import { CacheManager } from "@divinevoxel/vlox/Cache/CacheManager";
import { DVEBRMesh } from "../Meshes/DVEBRMesh";
const dataTool = new VoxelCursor();
const materialMap = new Map<string, DVEBRClassicMaterial>();

const buildMesh = (
  scene: Scene,
  voxelData: RawVoxelData,
  voxelId: string,
  stateID: string
) => {
  const meshedVoxel = MeshVoxel(voxelData);
  if (!meshedVoxel) return false;

  if (meshedVoxel[0][0] == 1) throw new Error(`Not in right mode`);
  dataTool.copyRaw(voxelData).process();
  const renderedMaterial = dataTool.getRenderedMaterial()!;

  const material = DVEBabylonRenderer.instance.materials.get(renderedMaterial);
  if (!material) throw new Error(`Could not load material ${renderedMaterial}`);

  const mesh = new Mesh(crypto.randomUUID(), scene);
  if (!materialMap.has(renderedMaterial)) {
    const newMat = (material as any).clone(scene);

    if (!newMat) throw new Error("Error creating mat.");

    materialMap.set(renderedMaterial, newMat);

    newMat.setNumberArray(
      "lightGradient",
      DefaultMaterialManager.unifrosm.lightGradient
    );
    newMat.setNumber("doSun", 0);
    newMat.setNumber("baseLevel", 1);
    newMat.setNumber("sunLevel", 1);
    //    newMat.wireframe = true;
    mesh.material = newMat._material;
  } else {
    mesh.material = materialMap.get(renderedMaterial)!._material;
  }

  VoxelModelIndex.registerModel(
    voxelId,
    stateID,
    meshedVoxel[0],
    renderedMaterial,
    material._material
  );

  DVEBRMesh.UpdateVertexData(
    mesh,
    scene.getEngine() as any,
    meshedVoxel[0][1][0]
  );

  return mesh;
};
export default async function CreateDisplayIndex(data: VoxelData[]) {
  const voxelIndex = new VoxelIndex(data);
  if (
    !CacheManager.cacheStoreEnabled &&
    CacheManager.cacheLoadEnabled &&
    CacheManager.cachedData?.displayIndex
  ) {
    VoxelTextureIndex.loadData(CacheManager.cachedData.displayIndex.textures);
    VoxelModelIndex.loadData(CacheManager.cachedData.displayIndex.meshes);

    for (const [voxelId, states] of VoxelModelIndex.voxelModels) {
      for (const [stateId, state] of states) {
        const material = DVEBabylonRenderer.instance.materials.get(
          state.material
        );

        if (!material) continue;
        VoxelModelIndex.registerMaterial(voxelId, stateId, material);
      }
    }

    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  /*   canvas.setAttribute(
    "style",
    "position:absolute;left:50%;top:0;background-color:black; z-index:100; width: 256px; height: 256px; display: block; margin: auto;"
  );

  document.body.append(canvas); */

  const engine = new Engine(canvas, undefined, { preserveDrawingBuffer: true });
  const displayScene = new Scene(engine);

  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 4,
    Math.PI / 2.5,
    2,
    new Vector3(0, 0, 0),
    displayScene,
    false
  );

  camera.minZ = 0.0001;
  camera.mode = ArcRotateCamera.ORTHOGRAPHIC_CAMERA;

  const zoom = 0.8;
  const ratio = engine.getAspectRatio(camera);
  camera.orthoLeft = -zoom;
  camera.orthoRight = zoom;
  camera.orthoBottom = -zoom / ratio;
  camera.orthoTop = zoom / ratio;

  displayScene.activeCamera = camera;

  displayScene.clearColor.set(0, 0, 0, 0);

  //CreateBox("",{size:1},displayScene);
  const light = new HemisphericLight("", new Vector3(0, 1, 0), displayScene);

  await displayScene.whenReadyAsync();

  const meshes = new Map<
    Mesh,
    {
      id: string;
      stateId: string;
    }
  >();
  displayScene.autoClear = false;

  engine.runRenderLoop(() => {
    displayScene.render();
  });

  const addVoxelData = PaintVoxelData.Create({});
  for (const [voxelId, states] of voxelIndex.states) {
    addVoxelData.id = voxelId;
    for (const [stateId, state] of states.states) {
      addVoxelData.state = 0;
      addVoxelData.mod = 0;
      if (state.data.display.type == "model") {
        const voxelSchema = SchemaRegister.getVoxelSchemas(voxelId);
        if (state.data.display.state) {
          addVoxelData.state = voxelSchema.state.readString(
            state.data.display.state
          );
        }
        if (state.data.display.mod) {
          addVoxelData.mod = voxelSchema.mod.readString(state.data.display.mod);
        }
        const rawData = VoxelCursor.VoxelDataToRaw(addVoxelData);
        const mesh = await buildMesh(
          displayScene,
          rawData,
          voxelId,
          state.data.id
        );

        if (!mesh) continue;
        mesh.setEnabled(false);
        meshes.set(mesh, { id: voxelId, stateId: state.data.id });
      }
      if (state.data.display.type == "texture") {
        const { source } = state.data.display;
        const path = TextureManager.getTexturePath(
          source[0],
          source[1],
          source[2] || "default"
        );
        VoxelTextureIndex.registerImage(voxelId, stateId, path);
        continue;
      }
    }
  }

  for (const [mesh, data] of meshes) {
    mesh.setEnabled(true);
    displayScene.render();
    await displayScene.whenReadyAsync();

    VoxelTextureIndex.registerImage(
      data.id,
      data.stateId,
      canvas.toDataURL("image/png")
    );

    mesh.setEnabled(false);
    engine.clear(displayScene.clearColor, true, true);
  }

  engine.dispose();
  materialMap.clear();

  if (CacheManager.cacheStoreEnabled) {
    CacheManager.cachedDisplayData = {
      textures: VoxelTextureIndex.cacheData(),
      meshes: VoxelModelIndex.cacheData(),
    };
  }
}
