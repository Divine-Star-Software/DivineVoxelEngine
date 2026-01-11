import { WorldGenBrush } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGenBrush";
import { GenType } from "./GenType.interface";
import { WorldSpaceRandom } from "./RNG/WorldSpaceRandom";
import { PaintVoxelData } from "@divinevoxel/vlox/Voxels";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";
import { PerlinNoise3d } from "@amodx/rng/perlin/index";
import { GenerateTree } from "./Functions/Tree";
export class Forest implements GenType {
  indexed = new WorldSpaceRandom(123213);
  voxels = {
    stone: "dve_dream_stone",
    lamp: "dve_dream_lamp",
    ether: "dve_liquid_dream_ether",
    pillar: "dve_dream_stone_pillar",
    grass: "dve_dream_grass",
    log: "dve_dream_log",
    leaves: "dve_dream_leaves",
  };
  grassDreamStone: number;
  perlin = new PerlinNoise3d();
  offsets = [1000, 100, 10000];
  init() {
    this.grassDreamStone = PaintVoxelData.ToRaw(
      PaintVoxelData.Populate({
        id: "dve_dream_stone",
        modString: "grassy=true",
      })
    )[0];

    this.perlin.noiseSeed(13129301280);
  }

  maxHeight = 60;
  noiseHeight(x: number, z: number) {
    const [xOffSet, yOffSet, zOffSet] = this.offsets;
    const scale = 120;
    return (
      this.perlin.get(
        (x + xOffSet) / scale,
        yOffSet / scale,
        (z + zOffSet) / scale
      ) * this.maxHeight
    );
  }
  async generate(sx: number, sy: number, sz: number, brush: WorldGenBrush) {
    const sectorWidth = WorldSpaces.sector.bounds.x;
    const sectorDepth = WorldSpaces.sector.bounds.z;
    for (let x = sx; x < sectorWidth + sx; x++) {
      for (let z = sz; z < sectorDepth + sz; z++) {
        const noiseHeight = this.noiseHeight(x, z);
        for (let y = sy; y < noiseHeight; y++) {
          if (y == 0) {
            brush.setId(this.voxels.stone).setXYZ(x, y, z).paint();
            continue;
          }
          brush.setId(this.voxels.stone);
          brush.setXYZ(x, y, z).paint();
        }
      }
    }
  }

  async decorate(sx: number, sy: number, sz: number, brush: WorldGenBrush) {
    const sectorWidth = WorldSpaces.sector.bounds.x;
    const sectorDepth = WorldSpaces.sector.bounds.z;
    const sectorHeight = WorldSpaces.sector.bounds.y;

    let totalTrees = 0;
    const cursor = brush.dataCursor;
    for (let x = sx; x < sx + sectorWidth; x++) {
      for (let z = sz; z < sz + sectorDepth; z++) {
        for (let y = 0; y < sectorHeight; y++) {
          const voxel = cursor.getVoxel(x, y, z);
          const isAir = voxel?.isAir();
          if (isAir && y <= 20) {
            brush.setId(this.voxels.ether).setLevel(7).setXYZ(x, y, z).paint().setLevel(0);
            continue;
          }
          if (voxel && voxel.getStringId() == this.voxels.stone) {
            const nVoxel = cursor.getVoxel(x, y + 1, z);
            if (nVoxel?.isAir() || nVoxel?.getStringId() == this.voxels.grass) {
              cursor.getVoxel(x, y, z)!.setId(this.grassDreamStone);
            }
          }
          const belowStone =
            cursor.getVoxel(x, y - 1, z)?.getStringId() == this.voxels.stone;

          if (isAir && belowStone) {
            if (Math.random() > 0.6) {
              brush.setXYZ(x, y, z).setId(this.voxels.grass).paint();
              continue;
            }
            if (Math.random() > 0.95) {
              let height = (Math.random() * 10) >> 0;
              let i = 0;
              while (height--) {
                brush
                  .setXYZ(x, y + i, z)
                  .setId(this.voxels.pillar)
                  .paint();
                i++;
              }
              brush
                .setXYZ(x, y + i, z)
                .setId(this.voxels.lamp)
                .paint();
              continue;
            }
            if (totalTrees < 4) {
              if (Math.random() > 0.98) {
                GenerateTree(
                  brush,
                  x,
                  y,
                  z,
                  this.voxels.log,
                  this.voxels.leaves
                );
                totalTrees++;
                continue;
              }
            }
          }
        }
      }
    }
  }
}
