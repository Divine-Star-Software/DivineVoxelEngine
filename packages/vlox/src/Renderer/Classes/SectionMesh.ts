import { VoxelEffect } from "../../Voxels/Effects/VoxelEffect";
import { SectorMesh } from "./SectorMesh";
import { WorldSpaces } from "../../World/WorldSpaces";
import { Vec3Array } from "@amodx/math";

export class SectionMesh {
  meshes = new Map<string, any>();
  effects = new Map<string, VoxelEffect>();

  constructor(
    public sector: SectorMesh,
    public index: number
  ) {}

  getPosition(): Vec3Array {
    return [
      this.sector.location[1],
      this.sector.location[1] + WorldSpaces.section.bounds.y * this.index,
      this.sector.location[2],
    ];
  }

  dispose() {
    for (const [key, effect] of this.effects) {
      effect.dispose();
    }
  }
}
