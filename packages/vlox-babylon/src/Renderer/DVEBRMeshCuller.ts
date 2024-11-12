import { Scene } from "@babylonjs/core";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/math.vector.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { BoundingBox } from "@babylonjs/core/Culling/boundingBox.js";

import { DVEMeshCuller } from "@divinevoxel/vlox/Interfaces/Render/DVEMeshCuller.js";

import { DVEBRScene } from "./Scene/DVEBRScene.js";
import { DVEBRFOManager } from "./DVEBRFOManger.js";

export class DVEBRMeshCuller extends DVEMeshCuller {
  constructor(public scene: DVEBRScene, public foManager: DVEBRFOManager) {
    super(scene, foManager);
    this.init(scene._scene);
  }
  init(scene: Scene) {
    const box = new BoundingBox(Vector3.Zero(), Vector3.Zero());
    const fallbackNode = new TransformNode("", scene);

    const min = new Vector3();
    const max = new Vector3();
    const world = new Vector4(0, 0, 0, 0);
    scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
      const cam = scene.activeCamera;
      if (!cam) return;
      const node: TransformNode = this.foManager.getActiveNode()
        ? this.foManager.getActiveNode()!._node
        : fallbackNode;
      const meshesLength = scene.meshes.length;
      for (let i = 0; i < meshesLength; i++) {
        const mesh = scene.meshes[i];
        if (!mesh.alwaysSelectAsActiveMesh) continue;
        if ((mesh as any).type == "chunk") {
          const position = mesh.position;
          mesh._worldMatrix.setRow(
            3,
            world.set(
              mesh.position.x + node.position.x,
              mesh.position.y + node.position.y,
              mesh.position.z + node.position.z,
              1
            )
          );
          min.set(
            node.position.x + position.x,
            node.position.y + position.y,
            node.position.z + position.z
          );
          max.set(
            node.position.x + position.x + 16,
            node.position.y + position.y + 16,
            node.position.z + position.z + 16
          );
          box.reConstruct(min, max);
          if (cam.isInFrustum(box)) {
            mesh.isVisible = true;
            mesh.setEnabled(true);
            continue;
          }
          mesh.isVisible = false;
          mesh.setEnabled(false);
        }
      }
    });
  }
}
