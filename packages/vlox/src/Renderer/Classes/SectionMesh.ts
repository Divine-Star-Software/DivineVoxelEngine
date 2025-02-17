import { VoxelEffect } from "../../Voxels/Effects/VoxelEffect";
import { SectorMesh } from "./SectorMesh";
import { WorldSpaces } from "../../World/WorldSpaces";
import { Vec3Array } from "@amodx/math";
import { MeshManager } from "../MeshManager";

export class SectionMesh {
  meshes = new Map<string, any>();
  effects = new Map<string, VoxelEffect>();
  sector: SectorMesh;
  index = 0;

  getPosition(): Vec3Array {
    return [
      this.sector.position[0],
      this.sector.position[1] + WorldSpaces.section.bounds.y * this.index,
      this.sector.position[2],
    ];
  }

  dispose() {
    MeshManager._sectionPool.push(this);
    for (const [, mesh] of this.meshes) {
      MeshManager.sectorMeshes.returnMesh(mesh);
    }
    this.meshes.clear();
    for (const [, effect] of this.effects) {
      effect.dispose();
    }
    this.effects.clear();
  }
}
