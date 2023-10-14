import type { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene";

import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { PlayerManager } from "../Data/PlayerManager.js";
import { PlayerPhysicsStatesValues } from "../Data/PlayerPhysicsData.js";
import { PlayerPickCube } from "./PlayerPickCube.js";
import { DivineVoxelEngineRender } from "@divinevoxel/core/Render/DivineVoxelEngineRender.js";

/*
PLAYER 
*/

type PlayerRenderNodes = {
  model: Mesh;
  camera: UniversalCamera;
  camNode: TransformNode;
  scene: Scene;
};
export class RenderPlayer {
  settings = {
    doWalkEffect: true,
  };

  active = true;

  __Vec3: typeof Vector3;
  direction: Vector3;
  sideDirection: Vector3;
  xzd: Vector3;
  cameraRotation: Vector3;
  picker: PlayerPickCube;

  constructor(
    public manager: typeof PlayerManager,
    public nodes: PlayerRenderNodes
  ) {
    //@ts-ignore
    this.__Vec3 = DVEPBabylonSystem.DVERSystem.Vector3;
    //@ts-ignore
    this.direction = new DVEPBabylonSystem.DVERSystem.Vector3();
    //@ts-ignore
    this.sideDirection = new DVEPBabylonSystem.DVERSystem.Vector3();
    //@ts-ignore
    this.xzd = new DVEPBabylonSystem.DVERSystem.Vector3();
    //@ts-ignore
    this.cameraRotation = new DVEPBabylonSystem.DVERSystem.Vector3();
    this.picker = new PlayerPickCube(DivineVoxelEngineRender.instance, this);
  }

  render() {
    if (!this.active) return;
    //update physics data
    const camera = this.nodes.camera;
    camera.getDirectionToRef(this.__Vec3.Forward(), this.direction);
    camera.getDirectionToRef(this.__Vec3.Left(), this.sideDirection);
    PlayerManager.physics.direction.set(
      this.direction.x,
      this.direction.y,
      this.direction.z
    );
    PlayerManager.physics.sideDirection.set(
      this.sideDirection.x,
      this.sideDirection.y,
      this.sideDirection.z
    );
    const rotation = camera.rotation;
    PlayerManager.physics.rotation.set(rotation.x, rotation.y, rotation.z);

    if (this.settings.doWalkEffect) {
      let et = performance.now();
      this.xzd.x = this.direction.x;
      this.xzd.z = this.direction.z;
      this.xzd.normalize();
      if (
        PlayerManager.physics.states.movement ==
        PlayerPhysicsStatesValues.walkingForward
      ) {
        let runFactor = 0.02 * PlayerManager.physics.states.running;
        let factor = 0.008 + runFactor;
        let yd = Math.abs(this.direction.y) > 0.5 ? 0 : 1;
        this.cameraRotation.x =
          Math.cos(et / 100) * factor * Number(this.xzd.x.toFixed(1)) * yd;
        this.cameraRotation.z =
          Math.cos(et / 100) * factor * Number(this.xzd.z.toFixed(1)) * yd;
        this.cameraRotation.y = Math.abs(Math.sin(et / 100)) * factor;
      } else {
        this.cameraRotation.scaleInPlace(0.5);
      }
      this.nodes.camNode.rotation = this.__Vec3.Lerp(
        this.cameraRotation,
        this.nodes.camNode.rotation,
        0.25
      );
    }
  }
}
