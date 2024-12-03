import { DVEFOManager } from "@divinevoxel/vlox/Interfaces/Render/DVEFOManager.js";
import { DVEQRScene } from "./Scene/DVEQRScene";
import { URINode } from "@amodx/uri/Meshes/URINode";
import { DVEQRNode } from "./Meshes/DVEQRNode";
export class DVEQRFOManager extends DVEFOManager {
  activeCamera: any | null = null;
  activeNode: any | null = null;
  onOriginSet: Function[] = [];

  uriNode = new DVEQRNode();

  constructor(public scene: DVEQRScene) {
    super(scene);
  }

  registerOnOriginSet(run: (node: any) => void) {
    this.onOriginSet.push(run);
  }
  getActiveNode(): URINode<any> | null {
    if (!this.activeNode) return null;
    if (!this.uriNode._node) this.uriNode._node = this.activeNode;
    return this.uriNode;
  }
  setOriginCenter(scene: any, object: { position: any }) {

  }
}
