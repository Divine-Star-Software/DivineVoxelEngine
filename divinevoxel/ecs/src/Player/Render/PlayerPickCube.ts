import type { DivineVoxelEngineRender } from "@divinevoxel/core/Render";

import type { Mesh } from "@babylonjs/core";
import { PlayerManager } from "../Data/PlayerManager.js";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder.js";
import { RenderPlayer } from "./RenderPlayer.js";
import { Vector3, Color3 } from "@babylonjs/core/Maths/";
import "@babylonjs/core/Rendering/edgesRenderer.js"
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
export class PlayerPickCube {
  cube: Mesh;
  cameraPickPostion: Vector3;
  setPickNormals() {
    const camPick = this.player.nodes.scene.pickWithRay(
      this.player.nodes.camera.getForwardRay(
        10,
        undefined,
        this.cameraPickPostion
      )
    );
    if (
      !camPick ||
      !camPick.hit ||
      !camPick.pickedMesh ||
      camPick.faceId === undefined
    )
      return;
    let normal = camPick.pickedMesh.getFacetNormal(camPick.faceId);
    PlayerManager.physics.pick.normal.x = normal.x;
    PlayerManager.physics.pick.normal.y = normal.y;
    PlayerManager.physics.pick.normal.z = normal.z;
  }

  constructor(DVER: DivineVoxelEngineRender, public player: RenderPlayer) {
    const cubeMaterial = new StandardMaterial(
      "picker-cube",
      DVER.render.scene!
    );
    cubeMaterial.diffuseColor = new Color3(0.2, 0.2, 0.2);
    cubeMaterial.alpha = 0.3;
    this.cube = CreateBox(
      "playerblockdisplay",
      {
        size: 1.1,
      },
      DVER.render.scene!
    );
    this.cube.isPickable = true;
    this.cube.material = cubeMaterial;


    this.cube.parent = DVER.render.fo.activeNode;
    this.cube.enableEdgesRendering();
    this.cube.edgesWidth = 0.3;
    this.cube.edgesColor.set(0, 0, 0, 0.8);
    this.cube.convertToFlatShadedMesh();
    this.cube.updateFacetData();

    const cameraPickPostion = new Vector3();
    cameraPickPostion.y = PlayerManager.physics.eyeLevel;
    player.nodes.scene.registerBeforeRender(() => {
      this.cube.position.x = PlayerManager.physics.pick.position.x + 0.5;
      this.cube.position.y = PlayerManager.physics.pick.position.y + 0.5;
      this.cube.position.z = PlayerManager.physics.pick.position.z + 0.5;
    });
  }
}
