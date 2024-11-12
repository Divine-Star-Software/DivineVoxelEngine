import type { Scene } from "@babylonjs/core";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/math.vector.js";
import { DVEFOManager } from "@divinevoxel/vlox/Interfaces/Render/DVEFOManager.js";
import { DVEBRScene } from "./Scene/DVEBRScene";
import { URINode } from "@amodx/uri/Meshes/URINode";
import { DVEBRNode } from "./Meshes/DVEBRNode";
export class DVEBRFOManager extends DVEFOManager {
  activeCamera: TransformNode | null = null;
  activeNode: TransformNode | null = null;
  onOriginSet: Function[] = [];

  uriNode = new DVEBRNode();

  constructor(public scene: DVEBRScene) {
    super(scene);
  }

  registerOnOriginSet(run: (node: TransformNode) => void) {
    this.onOriginSet.push(run);
  }
  getActiveNode(): URINode<TransformNode> | null {
    if (!this.activeNode) return null;
    if (!this.uriNode._node) this.uriNode._node = this.activeNode;
    return this.uriNode;
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
