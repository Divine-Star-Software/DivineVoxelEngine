import type { Scene } from "@babylonjs/core/scene";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
export class DVEBRFOManager {
  activeCamera: TransformNode | null = null;
  activeNode: TransformNode | null = null;
  onOriginSet: Function[] = [];

  node: TransformNode;

  registerOnOriginSet(run: (node: TransformNode) => void) {
    this.onOriginSet.push(run);
  }
  getActiveNode(): TransformNode | null {
    if (!this.activeNode) return null;
    if (!this.node) this.node = this.activeNode;
    return this.node;
  }
  setOriginCenter(scene: Scene, object: { position: Vector3 }) {
    this.activeNode = new TransformNode("", scene);
    this.onOriginSet.forEach((_) => _(this.activeCamera));
    const doublepos = new Vector3();
    scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
      this.activeNode!.position = doublepos.subtract(object.position);
    });
  }
}
