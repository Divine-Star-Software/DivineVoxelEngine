import { WorldGenBrush } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGenBrush";
import {
  GenerateCappedSpikePond,
  GenereateSpikePond,
} from "./Functions/GenereateSpikePond";
import { GenType } from "./GenType.interface";
import { WorldSpaceRandom } from "./RNG/WorldSpaceRandom";
import { PaintVoxelData } from "@divinevoxel/vlox/Voxels";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";

export class DreadEther implements GenType {
  indexed = new WorldSpaceRandom(123213);
  voxels = {
    stone: "dve_dread_stone",
    lamp: "dve_dread_lamp",
    ether: "dve_liquid_dread_ether",
    pillar: "dve_dread_stone_pillar",
    grass: "dve_dread_grass",
  };
  grassDreamStone: number;
  init() {
    this.grassDreamStone = PaintVoxelData.ToRaw(
      PaintVoxelData.Populate({
        id: "dve_dread_stone",
        modString: "grassy=true",
      })
    )[0];
  }
  async generate(sx: number, sy: number, sz: number, brush: WorldGenBrush) {
    const voxels = this.voxels;
    this.indexed.setXYZ(sx, sy, sz);
    const chunkTypeFile = this.indexed.random();

    if (chunkTypeFile < 0.5) {
      return GenereateSpikePond(
        brush,
        voxels.ether,
        voxels.pillar,
        voxels.lamp,
        sx,
        sy,
        sz,
        2
      );
    }
    return GenerateCappedSpikePond(
      brush,
      voxels.ether,
      voxels.pillar,
      voxels.lamp,
      voxels.stone,
      voxels.grass,
      sx,
      sy,
      sz
    );
  }

  async decorate(sx: number, sy: number, sz: number, brush: WorldGenBrush) {
    const sectorWidth = WorldSpaces.sector.bounds.x;
    const sectorDepth = WorldSpaces.sector.bounds.z;
    const sectorHeight = WorldSpaces.sector.bounds.y;

    const cursor = brush.dataCursor;
    for (let x = sx; x < sx + sectorWidth; x++) {
      for (let z = sz; z < sz + sectorDepth; z++) {
        for (let y = sy; y < sy + sectorHeight; y++) {
          const voxel = cursor.getVoxel(x, y, z);
          if (voxel && voxel.getStringId() == this.voxels.stone) {
            const nVoxel = cursor.getVoxel(x, y + 1, z);
            if (nVoxel?.isAir() || nVoxel?.getStringId() == this.voxels.grass) {
              cursor.getVoxel(x, y, z)!.setId(this.grassDreamStone);
              if (Math.random() > 0.9) {
                brush
                  .setId(this.voxels.grass)
                  .setXYZ(x, y + 1, z)
                  .paint();
              }
            }
          }
        }
      }
    }
  }
}
