import { Vector3, Vector4, Matrix4, Frustum, Mesh, Box3 } from "three";
import { Group } from "three";
import { DVEMeshCuller } from "@divinevoxel/core/Interfaces/Render/DVEMeshCuller.js";
import { DVETRScene } from "./Scene/DVETRScene.js";
import { DVETRFOManager } from "./DVETRFOManger.js";

export class DVETRMeshCuller extends DVEMeshCuller {
  constructor(public scene: DVETRScene, public foManager: DVETRFOManager) {
    super(scene, foManager);
    this.init(scene);
  }
  init(scene: DVETRScene) {
    console.log("MESH CULLER", this);

    const fallbackNode = new Group();

    const min = new Vector3();
    const max = new Vector3();
    const box = new Box3(min, max);
    const world = new Vector4(0, 0, 0, 0);
    const run = () => {
      const cam = scene.camera;
      if (!cam) return;
      const node: Group = this.foManager.getActiveNode()
        ? this.foManager.getActiveNode()!._node
        : fallbackNode;

      scene._scene.traverse((mesh) => {
        if (!(mesh instanceof Mesh)) return;
        if (mesh.frustumCulled) return;
        if ((mesh as any).type != "chunk") return;

        const position = mesh.position;

        mesh.position.set(
          mesh.position.x + node.position.x,
          mesh.position.y + node.position.y,
          mesh.position.z + node.position.z
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
        box.set(min, max);
        cam.updateMatrixWorld(); // Ensure the camera's matrixWorld is updated
        cam.matrixWorldInverse.copy(cam.matrixWorld).invert();
        const projectionMatrix = new Matrix4().multiplyMatrices(
          cam.projectionMatrix,
          cam.matrixWorldInverse
        );

        // Create a Frustum from the camera's view-projection matrix
        const frustum = new Frustum();
        frustum.setFromProjectionMatrix(projectionMatrix);

        // Check if the mesh's bounding box is within the frustum
        const isInFrustum = frustum.intersectsBox(box);

        if (isInFrustum) {
          mesh.visible = false;
          return;
        }
        mesh.visible = true;
      });
    };
    scene.registerBeforeRender(run);
  }
}
