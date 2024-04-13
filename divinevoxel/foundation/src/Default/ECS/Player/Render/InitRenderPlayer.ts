import type { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render";
import { RenderPlayer } from "./RenderPlayer.js";
import { PlayerManager } from "../Data/PlayerManager.js";
import { SetUpPlayerData } from "../Data/SetUpPlayerData.js";

export async function INIT_RENDER_PLAYER(

  DVER: DivineVoxelEngineRender,
) {

  await SetUpPlayerData(DVER.TC);

  PlayerManager.physics.eyeLevel = 0.7;

/*   playerModel.isVisible = false;
  //move camera to player's eye level
  camera.position.y = PlayerManager.physics.eyeLevel;
  camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

  camera.minZ = 0.01;
  //set up camera
  const camNode = new TransformNode("camnode", scene as any);
  (camera as any).parent = camNode;
  //@ts-ignore
  camNode.parent = playerModel;

  //set up floating origin
  const oriign = new Vector3();
  scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
    oriign.x = PlayerManager.physics.position.x;
    oriign.y = PlayerManager.physics.position.y;
    oriign.z = PlayerManager.physics.position.z;
  });
  DVER.render.fo.setOriginCenter(scene as any, { position: oriign as any });

  const renderPlayer = new RenderPlayer(PlayerManager, {
    model: playerModel,
    //@ts-ignore
    camNode: camNode,
    camera: camera,
    scene: scene,
  });

  scene.registerBeforeRender(() => {
    renderPlayer.render();
  }); */

  return {} as any;
}
