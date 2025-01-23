
export class DVEQRFOManager  {
  activeCamera: any | null = null;
  activeNode: any | null = null;
  onOriginSet: Function[] = [];

  uriNode : any;


  registerOnOriginSet(run: (node: any) => void) {
    this.onOriginSet.push(run);
  }
  getActiveNode(): any | null {
   // if (!this.activeNode) return null;
   // if (!this.uriNode._node) this.uriNode._node = this.activeNode;
    return this.uriNode;
  }
  setOriginCenter(scene: any, object: { position: any }) {

  }
}
