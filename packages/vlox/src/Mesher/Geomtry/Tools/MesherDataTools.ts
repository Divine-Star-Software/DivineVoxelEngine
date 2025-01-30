import { QuadScalarVertexData } from "../Primitives/QuadVertexData.js";
import { Mesh } from "../Mesh.js";

export class MesherDataTool {
  segments = new Map<string, number[]>();

  mesh: Mesh | null = null;

  startNewMesh(mesh?: Mesh) {
    this.mesh = mesh ? mesh : new Mesh();
  }

  resetAll() {
    this.mesh?.clear();
    return this;
  }
}
