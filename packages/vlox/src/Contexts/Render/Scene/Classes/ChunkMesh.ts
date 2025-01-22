import { ChunkMeshInterface } from "Interfaces/Render/DVEChunkMeshInterface";
import { VoxelEffect } from "../../../../VoxelEffects/VoxelEffect";
import { Vec3Array } from "@amodx/math";

export class ChunkMesh {
  meshes = new Map<string, ChunkMeshInterface>();
  effects = new Map<string, VoxelEffect>();

  constructor(public location: Vec3Array) {}

  dispose() {
    for (const [key, effect] of this.effects) {
      effect.dispose();
    }
  }
}
