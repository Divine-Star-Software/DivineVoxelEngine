import { URIMesh } from "@divinestar/uri/Meshes/URIMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { DVEBRScene } from "../../Scene/DVEBRScene";
import { Observable } from "@divinestar/utils/Observers/Observable";
class DVEBRMeshObservers {
  updated = new Observable();
}

export class DVEBRMesh extends URIMesh<DVEBRScene, Mesh> {
  observers = new DVEBRMeshObservers();
  dispose(): void {
    this._mesh.dispose();
  }
  isVisible: boolean;
  setEnabled(enabled: boolean): void {
    this._mesh.setEnabled(enabled);
  }
  setIndicies(indicies: ArrayLike<number>): void {
    throw new Error("Method not implemented.");
  }
  getIndicies(): ArrayLike<number> {
    throw new Error("Method not implemented.");
  }
  setVertexData(id: string, data: ArrayLike<number>, stride: number): void {
    throw new Error("Method not implemented.");
  }
  getVertexData(id: string): ArrayLike<number> {
    throw new Error("Method not implemented.");
  }
  clearCachedData(): void {
    throw new Error("Method not implemented.");
  }
}
