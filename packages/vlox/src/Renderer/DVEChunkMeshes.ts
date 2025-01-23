import { Vec3Array } from "@amodx/math";
import { CompactMeshData } from "../Mesher/Types/Mesher.types";
import { ChunkMesh } from "./Classes/ChunkMesh";

export abstract class DVEChunkMeshes {
  abstract updateVertexData(
    chunk: ChunkMesh,
    position: Vec3Array,
    data: CompactMeshData
  ): ChunkMesh;
}
