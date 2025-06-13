import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { MeshVoxel } from "@divinevoxel/vlox/Mesher/Functions/MeshVoxel";
import { VoxelCursor } from "@divinevoxel/vlox//Voxels/Cursor/VoxelCursor";
import {
  VoxelData,
  RawVoxelData,
  PaintVoxelData,
} from "@divinevoxel/vlox/Voxels/";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { SchemaRegister } from "@divinevoxel/vlox/Voxels/State/SchemaRegister";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { VoxelIndex } from "@divinevoxel/vlox/Voxels/Indexes/VoxelIndex";
import { VoxelModelIndex } from "@divinevoxel/vlox/Voxels/Indexes/VoxelModelIndex";
import { VoxelTextureIndex } from "@divinevoxel/vlox/Voxels/Indexes/VoxelTextureIndex";
import { CacheManager } from "@divinevoxel/vlox/Cache/CacheManager";
import { DVEBRMesh } from "../Meshes/DVEBRMesh";
import { VoxelImager } from "../Voxels/VoxelImager";
import { WorkItemProgress } from "@divinevoxel/vlox/Util/WorkItemProgress";

const dataTool = new VoxelCursor();

let canvas = document.createElement("canvas");
let context: CanvasRenderingContext2D = canvas.getContext("2d")!;
async function loadAndInvertImage(
  imgSrcData: string | HTMLImageElement
): Promise<string> {
  if (!context) throw new Error("");
  const prom: Promise<string> = new Promise((resolve, reject) => {
    const image = typeof imgSrcData == "string" ? new Image() : imgSrcData;
    image.onerror = (error) => reject(error);
    if (typeof imgSrcData == "string") image.src = imgSrcData;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = false;
      context.save();
      context.translate(0, canvas.height);
      context.scale(1, -1);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.restore();
      const dataUrl = canvas.toDataURL("image/png");
      const returnImage = new Image(canvas.width, canvas.height);
      returnImage.src = dataUrl;
      returnImage.onload = () => {
        resolve(returnImage.src);
      };
    };
  });
  return prom;
}

const buildMesh = (
  scene: Scene,
  voxelData: RawVoxelData,
  voxelId: string,
  stateID: string
) => {
  const meshedVoxel = MeshVoxel(voxelData);
  if (!meshedVoxel) return false;
  if (meshedVoxel[0][0] == 1) throw new Error(`Not in right mode`);
  dataTool.setRaw(voxelData).process();
  const renderedMaterial = dataTool.getRenderedMaterial()!;

  const material = DVEBabylonRenderer.instance.materials.get(renderedMaterial);
  if (!material) throw new Error(`Could not load material ${renderedMaterial}`);

  const mesh = new Mesh(crypto.randomUUID(), scene);
  mesh.material = material._material;

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

export default async function CreateDisplayIndex(
  data: VoxelData[],
  getProgress?: (progress: WorkItemProgress) => void
) {
  const progress = new WorkItemProgress();
  if (getProgress) getProgress(progress);
  progress.startTask("Create Display Index");
  progress.setStatus("Building Display Index");
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
  await DVEBabylonRenderer.instance.scene.whenReadyAsync();
  const voxelImager = new VoxelImager(DVEBabylonRenderer.instance.scene);
  await voxelImager.scene.whenReadyAsync();
  const meshes = new Map<
    Mesh,
    {
      id: string;
      stateId: string;
    }
  >();

  const addVoxelData = PaintVoxelData.Create({});
  progress.setWorkLoad(voxelIndex.states.size);
  for (const [voxelId, states] of voxelIndex.states) {
    addVoxelData.id = voxelId;
    for (const [stateId, state] of states.states) {
      progress.setStatus(`making model: ${voxelId} ${stateId}`);
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
        const mesh = buildMesh(
          voxelImager.scene,
          rawData,
          voxelId,
          state.data.id
        );
        if (!mesh) console.error(`Could not make mesh for ${voxelId}`, rawData);
        if (!mesh) continue;
        mesh.setEnabled(false);
        meshes.set(mesh, { id: voxelId, stateId: state.data.id });
      }
      if (state.data.display.type == "texture") {
        const { source, textureType } = state.data.display;

        const path = await loadAndInvertImage(
          TextureManager.getTexture(textureType || "dve_voxel").getTexturePath(
            source
          )
        );

        VoxelTextureIndex.registerImage(voxelId, stateId, path);
        continue;
      }
    }
    progress.completeWorkItems(1);
  }
  progress.setWorkLoad(meshes.size);
  for (const [mesh, data] of meshes) {
    mesh.setEnabled(true);
    progress.setStatus(`making image: ${data.id} - ${data.stateId}`);
    const dataUrl = await voxelImager.createImageFromMesh(mesh);
    VoxelTextureIndex.registerImage(data.id, data.stateId, dataUrl);
    mesh.setEnabled(false);
    progress.completeWorkItems(1);
    mesh.dispose();
  }

  if (CacheManager.cacheStoreEnabled) {
    CacheManager.cachedDisplayData = {
      textures: VoxelTextureIndex.cacheData(),
      meshes: VoxelModelIndex.cacheData(),
    };
  }
  progress.endTask();
}
