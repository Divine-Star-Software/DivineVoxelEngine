import { QuadScalarVertexData } from "../Primitives/QuadVertexData.js";
import { VoxelMesh } from "../VoxelMesh.js";

export class MesherDataTool {
  segments = new Map<string, number[]>();

  mesh: VoxelMesh | null = null;

  startNewMesh(mesh?: VoxelMesh) {
    this.mesh = mesh ? mesh : new VoxelMesh();
  }

  clear() {
    this.mesh?.clear();
    return this;
  }
}
