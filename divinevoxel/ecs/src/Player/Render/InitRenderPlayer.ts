import type { DivineVoxelEngineRender } from "@divinevoxel/core/Render";
import type { Scene } from "@babylonjs/core/scene";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";

import { RenderPlayer } from "./RenderPlayer.js";
import { PlayerManager } from "../Data/PlayerManager.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { SetUpPlayerData } from "../Data/SetUpPlayerData.js";

export async function INIT_RENDER_PLAYER(
  scene: Scene,
  camera: UniversalCamera,
  DVER: DivineVoxelEngineRender,
  playerModel: Mesh
) {

  console.log("got scene",scene);
  await SetUpPlayerData(DVER);

  PlayerManager.physics.eyeLevel = 0.7;

  playerModel.isVisible = false;
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
  });

  return renderPlayer;
}
