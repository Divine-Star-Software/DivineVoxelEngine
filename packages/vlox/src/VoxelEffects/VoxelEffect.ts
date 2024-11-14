import { ChunkMesh } from "../Contexts/Render/Scene/Classes/ChunkMesh";

export interface VoxelEffectConstructor {
  id: string;
  new (mesh: ChunkMesh): VoxelEffect;
}

export abstract class VoxelEffect {
  constructor(public mesh: ChunkMesh) {}
  abstract init(): void;
  abstract setPoints(pointss: Float32Array): void;
  abstract dispose(): void;
}
