import {
  ArcRotateCamera,
  Engine,
  Material,
  Mesh,
  Scene,
  Vector3,
  Tools,
  CreateBox,
  HemisphericLight,
} from "@babylonjs/core";
import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render/DivineVoxelEngineRender";
import { RawVoxelData } from "@divinevoxel/vlox/Data/Types/VoxelData.types";
import { PaintVoxelData } from "@divinevoxel/vlox/Data/Types/WorldData.types";
import {
  BuildNodeMesh,
  SetNodeMesh,
} from "@divinevoxel/vlox/Mesher/Tasks/BuidlerTasks.types";
import { DataTool } from "@divinevoxel/vlox/Tools/Data/DataTool";
import { VoxelData } from "@divinevoxel/vlox/Types";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { VoxelIndex } from "@divinevoxel/vlox/VoxelData/VoxelIndex";
import { SchemaRegister } from "@divinevoxel/vlox/VoxelState/SchemaRegister";
import { DVEBRNodeMesh } from "../Renderer/Nodes/Meshes/DVEBRNodeMesh";
import { VoxelTextureIndex } from "../Display/VoxelTextureIndex";
import { DVEBRClassicMaterial } from "../Matereials/Classic/DVEBRClassicMaterial";
import { DefaultMaterialManager } from "../Matereials/DefaultMaterialManager";
import { Inspector } from "@babylonjs/inspector";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { VoxelModelIndex } from "../Display/VoxelModelIndex";
export default async function CreateDisplayIndex(
  DVER: DivineVoxelEngineRender,
  data: VoxelData[]
) {
  const dataTool = new DataTool();
  const materialMap = new Map<string, DVEBRClassicMaterial>();

  const voxelIndex = new VoxelIndex(data);
  VoxelModelIndex;

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
  const buildMesh = (
    voxelData: RawVoxelData,
    voxelId: string,
    stateID: string
  ) => {
    return new Promise<Mesh | false>((resolve) => {
      DVER.threads.construcotrs.runPromiseTasks<BuildNodeMesh>(
        "build-node-mesh",
        [["main", 0, 0, 0], "#dve_node_voxel", voxelData],
        [],
        (data: SetNodeMesh | false) => {
          if (!data) return resolve(false);
          dataTool.loadInRaw(voxelData);
          const renderedSubstance = dataTool.getSubstnaceData().getRendered();
          const material =
            DVEBabylonRenderer.instance.nodes.materials.get(renderedSubstance);
          if (!material)
            throw new Error(`Could not load material ${renderedSubstance}`);

          const mesh = new Mesh(crypto.randomUUID(), displayScene);
          if (!materialMap.has(renderedSubstance)) {
            const newMat = (material as DVEBRClassicMaterial).clone(
              displayScene
            );

            if (!newMat) throw new Error("Error creating mat.");

            materialMap.set(renderedSubstance, newMat);

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
            mesh.material = materialMap.get(renderedSubstance)!._material;
          }

          VoxelModelIndex.registerModel(
            voxelId,
            stateID,
            data[1],
            material._material
          );
          DVEBRNodeMesh.UpdateVertexData(mesh, engine, data[1]);

          resolve(mesh);
        }
      );
    });
  };

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
      addVoxelData.shapeState = 0;
      addVoxelData.mod = 0;
      if (state.data.display.type == "model") {
        const voxelSchema = SchemaRegister.getVoxelSchemas(voxelId);
        if (state.data.display.state) {
          addVoxelData.shapeState = voxelSchema.shapeState.readString(
            state.data.display.state
          );
        }
        if (state.data.display.mod) {
          addVoxelData.mod = voxelSchema.modState.readString(
            state.data.display.mod
          );
        }
        const rawData = DataTool.VoxelDataToRaw(addVoxelData);
        const mesh = await buildMesh(rawData, voxelId, state.data.id);

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
}
