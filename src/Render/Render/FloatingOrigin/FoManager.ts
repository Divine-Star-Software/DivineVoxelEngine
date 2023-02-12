import type { Scene, TransformNode, Vector3 } from "babylonjs";

import { DVEBabylon } from "../../Babylon/DVEBabylon.js";

export const FOManager = {
 activeCamera: <TransformNode | null>null,
 activeNode: <TransformNode | null>null,

 onOriginSet: <Function[]>[],

 registerOnOriginSet(run: (node: TransformNode) => void) {
  this.onOriginSet.push(run);
 },

 setOriginCenter(scene: Scene, object: { position: Vector3 }) {
  this.activeNode = new DVEBabylon.system.TransformNode("", scene);
  this.onOriginSet.forEach((_) => _(this.activeCamera));
  const doublepos = new DVEBabylon.system.Vector3();
  scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
   this.activeNode!.position = doublepos.subtract(object.position);
  });
 },
};
