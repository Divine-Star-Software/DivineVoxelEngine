import { Vector3Like } from "@amodx/math";
import { VoxelVertexBuffer, VoxelIndiceBuffer } from "./Buffers";
import { VoxelMeshVertexStructCursor } from "../Tools/VoxelMeshVertexStructCursor";

export class VoxelMesh {
  indicieIndex = 0;
  indicieCount = 0;
  vertexCount = 0;
  minBounds = Vector3Like.Create(Infinity, Infinity, Infinity);
  maxBounds = Vector3Like.Create(-Infinity, -Infinity, -Infinity);

  readonly buffer = new VoxelVertexBuffer(
    VoxelMeshVertexStructCursor.VertexFloatSize,
    1000
  );
  readonly indices = new VoxelIndiceBuffer(1000);

  addVerticies(count: number, indicesCount: number) {
    this.vertexCount += count;
    this.indicieCount += indicesCount;
  }

  clear() {
    // this.buffer.length = 0;
    //this.indices.length = 0;
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
