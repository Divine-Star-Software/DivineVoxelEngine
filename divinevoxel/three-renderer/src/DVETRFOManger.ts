import { DVEFOManager } from "@divinevoxel/core/Interfaces/Render/DVEFOManager.js";
import { DVETRScene } from "./Scene/DVETRScene";
import { URINode } from "@divinestar/uri/Meshes/URINode";
import { DVETRNode } from "./Meshes/DVETRNode";
import { Group } from "three";
export class DVETRFOManager extends DVEFOManager {
  activeCamera: Group | null = null;
  activeNode: Group | null = null;

  uriNode = new DVETRNode();

  constructor(public scene: DVETRScene) {
    super(scene);
  }

  getActiveNode(): URINode<Group> | null {
    if (!this.activeNode) return null;
    if (!this.uriNode._node) this.uriNode._node = this.activeNode;
    return this.uriNode;
  }
}
