import { URIMesh } from "@amodx/uri/Meshes/URIMesh";
import { Mesh } from "three";
import { DVETRScene } from "../../Scene/DVETRScene";
export class DVETRMesh extends URIMesh<DVETRScene, Mesh> {
  dispose(): void {
    throw new Error("Method not implemented.");
  }
  isVisible: boolean;
  setEnabled(enabled: boolean): void {
    throw new Error("Method not implemented.");
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
