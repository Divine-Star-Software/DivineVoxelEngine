import { SectionMesh } from "../../Renderer/Classes/SectionMesh";

export interface VoxelEffectConstructor {
  id: string;
  new (mesh: SectionMesh): VoxelEffect;
}

export abstract class VoxelEffect {
  constructor(public mesh: SectionMesh) {}
  abstract init(): void;
  abstract setPoints(pointss: Float32Array): void;
  abstract dispose(): void;
}
