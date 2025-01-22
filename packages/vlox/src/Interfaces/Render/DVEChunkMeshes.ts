import { Vec3Array } from "@amodx/math";
import { CompactMeshData } from "../../Mesher/Types/Mesher.types";
import { ChunkMeshInterface } from "./DVEChunkMeshInterface";
import { ChunkMesh } from "../../Contexts/Render/Scene/Classes/ChunkMesh";

export abstract class DVEChunkMeshes {
  abstract updateVertexData(
    chunk: ChunkMesh,
    position: Vec3Array,
    data: CompactMeshData
  ): ChunkMesh;
}
