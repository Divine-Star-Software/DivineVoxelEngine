import { Vector3Like } from "@amodx/math";
import { VoxelVertexBuffer, VoxelIndiceBuffer } from "./VoxelMeshBuffers";
import { VoxelMeshVertexStructCursor } from "./VoxelMeshVertexStructCursor";

export class VoxelMesh {
  indicieCount = 0;
  vertexCount = 0;
  minBounds = Vector3Like.Create(Infinity, Infinity, Infinity);
  maxBounds = Vector3Like.Create(-Infinity, -Infinity, -Infinity);

  readonly buffer = new VoxelVertexBuffer(
    VoxelMeshVertexStructCursor.VertexFloatSize,
    1024
  );
  readonly indices = new VoxelIndiceBuffer(1024);

  addVerticies(vertexCount: number, indicesCount: number) {
    this.vertexCount += vertexCount;
    this.indicieCount += indicesCount;
  }

  clear() {
    this.indicieCount = 0;
    this.vertexCount = 0;

    this.minBounds.x = Infinity;
    this.minBounds.y = Infinity;
    this.minBounds.z = Infinity;
    this.maxBounds.x = -Infinity;
    this.maxBounds.y = -Infinity;
    this.maxBounds.z = -Infinity;
  }
}
