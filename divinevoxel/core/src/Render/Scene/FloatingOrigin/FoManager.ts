import type { Scene } from "@babylonjs/core";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/math.vector.js";
export const FOManager = {
  activeCamera: <TransformNode | null>null,
  activeNode: <TransformNode | null>null,

  onOriginSet: <Function[]>[],

  registerOnOriginSet(run: (node: TransformNode) => void) {
    this.onOriginSet.push(run);
  },

  setOriginCenter(scene: Scene, object: { position: Vector3 }) {
    this.activeNode = new TransformNode("", scene);
    this.onOriginSet.forEach((_) => _(this.activeCamera));
    const doublepos = new Vector3();
    scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
      this.activeNode!.position = doublepos.subtract(object.position);
    });
  },
};
