import { SubMesh } from "@babylonjs/core/Meshes/subMesh";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { BufferAllocation } from "./BufferMesh";
export class SubBufferMesh {
  verticesStart = 0;
  verticesCount = 0;
  indicesStart = 0;
  indicesCount = 0;
  allocation: BufferAllocation;
  transform: TransformNode;
  mesh: SubMesh;

  private _enabled = false;

  setEnabled(enabled: boolean) {
    this._enabled = enabled;
    if (enabled) {
      this.allocation._bufferMesh.voxelScene.active.set(this.mesh,this);
    } else {
      this.allocation._bufferMesh.voxelScene.active.delete(this.mesh);
    }
  }
  isEnabled() {
    return this._enabled;
  }

  render() {
    this.allocation._bufferMesh.render(this.mesh, false, this.transform as any);
  }
}
