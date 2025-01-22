import { Observable } from "@amodx/core/Observers/Observable";
class DVEQRMeshObservers {
  updated = new Observable();
}
import { ChunkMeshInterface } from "@divinevoxel/vlox/Interfaces/Render/DVEChunkMeshInterface";

export class DVEQRMesh implements ChunkMeshInterface {
  observers = new DVEQRMeshObservers();

  dispose(): void {
  //  this._mesh.dispose();
  }
  isVisible: boolean;
  setEnabled(enabled: boolean): void {
   // this._mesh.setEnabled(enabled);
  }
  setIndicies(indices: ArrayLike<number>): void {
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
