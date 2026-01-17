import { WorldGenBrush } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGenBrush";
import { GenType } from "./GenType.interface";
import { WorldSpaceRandom } from "./RNG/WorldSpaceRandom";
import { PaintVoxelData, RawVoxelData } from "@divinevoxel/vlox/Voxels";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";

export class Classic implements GenType {
  indexed = new WorldSpaceRandom(123213);
  paintVoxels: Record<string, PaintVoxelData> = {
    stone: PaintVoxelData.Create({ id: "dve_dream_stone" }),
    lamp: PaintVoxelData.Create({ id: "dve_dream_lamp" }),
    ether: PaintVoxelData.Create({ id: "dve_liquid_dream_ether" }),
    etherFull: PaintVoxelData.Create({
      id: "dve_liquid_dream_ether",
      level: 7,
    }),
    pillar: PaintVoxelData.Create({ id: "dve_dream_stone_pillar" }),
    grass: PaintVoxelData.Create({ id: "dve_dream_grass" }),
  };
  voxels: Record<string, RawVoxelData> = {};
  grassDreamStone: number;
  init() {
    for (const key in this.paintVoxels) {
      this.voxels[key] = PaintVoxelData.ToRaw(this.paintVoxels[key]);
    }

    this.grassDreamStone = PaintVoxelData.ToRaw(
      PaintVoxelData.Populate({
        id: "dve_dream_stone",
        modString: "grassy=true",
      })
    )[0];
  }

  minY = 60;
  generateCrazyChunk(chunkX: number, chunkZ: number, brush: WorldGenBrush) {
    const sectorWidth = WorldSpaces.sector.bounds.x;
    const sectorDepth = WorldSpaces.sector.bounds.z;
    const sectorHeight = WorldSpaces.sector.bounds.y;

    for (let x = chunkX; x < sectorWidth + chunkX; x++) {
      for (let z = chunkZ; z < sectorDepth + chunkZ; z++) {
        for (let y = 0; y < sectorHeight; y++) {
          if (y < Math.floor(Math.random() * this.minY)) {
            brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
            if (Math.random() > 0.8) {
              brush.setXYZ(x, y + 1, z).paintRaw(this.voxels.grass);
            }
          }
        }
      }
    }
  }
  generateSpikeChunk(chunkX: number, chunkZ: number, brush: WorldGenBrush) {
    const sectorWidth = WorldSpaces.sector.bounds.x;
    const sectorDepth = WorldSpaces.sector.bounds.z;

    let rx = 0;
    for (let x = chunkX; x < sectorWidth + chunkX; x++) {
      let rz = 0;
      for (let z = chunkZ; z < sectorDepth + chunkZ; z++) {
        for (let y = 0; y < 200; y++) {
          brush.setXYZ(x, y, z);
          if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
            if (
              y == this.minY ||
              y == this.minY + 28 ||
              y == this.minY + 54 ||
              y == this.minY + 56 ||
              y == this.minY + 86
            ) {
              brush.paintRaw(this.voxels.pillar);
            }
          }
          if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
            if (
              y == this.minY + 1 ||
              y == this.minY + 26 ||
              y == this.minY + 30 ||
              y == this.minY + 52 ||
              y == this.minY + 58 ||
              y == this.minY + 84 ||
              y == this.minY + 88
            ) {
              brush.paintRaw(this.voxels.pillar);
            }
          }
          if (rx == 1 || rz == 1 || rx == 14 || rz == 14) {
            if (
              y == this.minY + 2 ||
              y == this.minY + 24 ||
              y == this.minY + 32 ||
              y == this.minY + 52 ||
              y == this.minY + 60 ||
              y == this.minY + 82 ||
              y == this.minY + 86 ||
              y == this.minY + 90
            ) {
              brush.paintRaw(this.voxels.pillar);
            }
          }
          if (rx == 2 || rz == 2 || rx == 13 || rz == 13) {
            if (
              y == this.minY + 4 ||
              y == this.minY + 22 ||
              y == this.minY + 34 ||
              y == this.minY + 50 ||
              y == this.minY + 62 ||
              y == this.minY + 80 ||
              y == this.minY + 88 ||
              y == this.minY + 92
            ) {
              brush.paintRaw(this.voxels.pillar);
            }
          }
          if (rx == 3 || rz == 3 || rx == 12 || rz == 12) {
            if (
              y == this.minY + 6 ||
              y == this.minY + 20 ||
              y == this.minY + 36 ||
              y == this.minY + 48 ||
              y == this.minY + 64 ||
              y == this.minY + 78 ||
              y == this.minY + 90 ||
              y == this.minY + 94
            ) {
              brush.paintRaw(this.voxels.pillar);
            }
          }
          if (rx == 4 || rz == 4 || rx == 11 || rz == 11) {
            if (
              y == this.minY + 8 ||
              y == this.minY + 18 ||
              y == this.minY + 38 ||
              y == this.minY + 46 ||
              y == this.minY + 66 ||
              y == this.minY + 74 ||
              y == this.minY + 96
            ) {
              brush.paintRaw(this.voxels.pillar);
            }
          }
          if (rx == 5 || rz == 5 || rx == 10 || rz == 10) {
            if (
              y == this.minY + 10 ||
              y == this.minY + 16 ||
              y == this.minY + 40 ||
              y == this.minY + 44 ||
              y == this.minY + 68 ||
              y == this.minY + 72 ||
              y == this.minY + 98
            ) {
              brush.paintRaw(this.voxels.pillar);
            }
          }
          if (rx == 6 || rz == 6 || rx == 9 || rz == 9) {
            if (
              y == this.minY + 12 ||
              y == this.minY + 14 ||
              y == this.minY + 42 ||
              y == this.minY + 70 ||
              this.minY + 100
            ) {
              brush.paintRaw(this.voxels.pillar);
            }
          }
          if (y < this.minY) {
            brush.paintRaw(this.voxels.pillar);
          }
        }
        rz++;
      }
      rx++;
    }
  }
  generatePondChunk(chunkX: number, chunkZ: number, brush: WorldGenBrush) {
    const sectorWidth = WorldSpaces.sector.bounds.x;
    const sectorDepth = WorldSpaces.sector.bounds.z;
    const sectorHeight = WorldSpaces.sector.bounds.y;

    for (let x = chunkX; x < sectorWidth + chunkX; x++) {
      for (let z = chunkZ; z < sectorDepth + chunkZ; z++) {
        for (let y = 0; y < sectorHeight; y++) {
          brush.setXYZ(x, y, z);
          if (y < this.minY - 6) {
            brush.paintRaw(this.voxels.stone);
          }
          if (y >= this.minY - 6 && y <= this.minY) {
            brush.paintRaw(this.voxels.etherFull);
          }
          if (y == this.minY + 1) break;
        }
      }
    }
    return true;
  }
  generateHoleChunk(chunkX: number, chunkZ: number, brush: WorldGenBrush) {
    const sectorWidth = WorldSpaces.sector.bounds.x;
    const sectorDepth = WorldSpaces.sector.bounds.z;
    const sectorHeight = WorldSpaces.sector.bounds.y;

    let rx = 0;
    for (let x = chunkX; x < sectorWidth + chunkX; x++) {
      let rz = 0;
      for (let z = chunkZ; z < sectorDepth + chunkZ; z++) {
        for (let y = 0; y < sectorHeight; y++) {
          if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
            if (y > this.minY) break;
            if (y == this.minY) {
              brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
              if (Math.random() > 0.8) {
                brush.setXYZ(x, y + 1, z).paintRaw(this.voxels.grass);
              }
            }
          }
          if (rx == 1 || rz == 1 || rx == 14 || rz == 14) {
            if (y == this.minY - 1) {
              brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
              if (Math.random() > 0.8) {
                brush.setXYZ(x, y + 1, z).paintRaw(this.voxels.grass);
              }
            }
          }
          if (rx == 2 || rz == 2 || rx == 13 || rz == 13) {
            if (y == this.minY - 2) {
              brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
              if (Math.random() > 0.8) {
                brush.setXYZ(x, y + 1, z).paintRaw(this.voxels.grass);
              }
            }
          }
          if (rx == 3 || rz == 3 || rx == 12 || rz == 12) {
            if (y == this.minY - 3) {
              brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
              if (Math.random() > 0.8) {
                brush.setXYZ(x, y + 1, z).paintRaw(this.voxels.grass);
              }
            }
          }
          if (rx == 4 || rz == 4 || rx == 11 || rz == 11) {
            if (y == this.minY - 4) {
              brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
              if (Math.random() > 0.8) {
                brush.setXYZ(x, y + 1, z).paintRaw(this.voxels.grass);
              }
            }
          }
          if (rx == 5 || rz == 5 || rx == 10 || rz == 10) {
            if (y == this.minY - 5) {
              brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
              if (Math.random() > 0.8) {
                brush.setXYZ(x, y + 1, z).paintRaw(this.voxels.grass);
              }
            }
          }
          if (rx == 6 || rz == 6 || rx == 9 || rz == 9) {
            if (y == this.minY - 6) {
              brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
              if (Math.random() > 0.8) {
                brush.setXYZ(x, y + 1, z).paintRaw(this.voxels.grass);
              }
            }
          }
          if (y < this.minY - 7) {
            brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
            if (Math.random() > 0.8) {
              brush.setXYZ(x, y + 1, z).paintRaw(this.voxels.grass);
            }
          }
        }
        rz++;
      }
      rx++;
    }
  }
  generateNormalChunk(chunkX: number, chunkZ: number, brush: WorldGenBrush) {
    const sectorWidth = WorldSpaces.sector.bounds.x;
    const sectorDepth = WorldSpaces.sector.bounds.z;
    const sectorHeight = WorldSpaces.sector.bounds.y;

    for (let x = chunkX; x < sectorWidth + chunkX; x++) {
      for (let z = chunkZ; z < sectorDepth + chunkZ; z++) {
        for (let y = 0; y < sectorHeight; y++) {
          if (y > this.minY + 1) break;
          if (y <= this.minY) {
            brush.setXYZ(x, y, z).paintRaw(this.voxels.stone);
          }
          if (y == this.minY + 1) {
            if (Math.random() > 0.8) {
              brush.setXYZ(x, y, z).paintRaw(this.voxels.grass);
            }
          }
        }
      }
    }
  }

  async generate(sx: number, sy: number, sz: number, brush: WorldGenBrush) {
    let toss = Math.random();
    let spiked = false;
    let crazy = false;
    let hole = false;
    let pond = false;
    if (toss < 0.2) {
      crazy = true;
    }
    if (toss > 0.2 && toss < 0.3) {
      spiked = true;
    }
    if (toss > 0.3 && toss < 0.6) {
      hole = true;
    }
    if (toss > 0.8) {
      pond = true;
    }
    if (crazy) {
      this.generateCrazyChunk(sx, sz, brush);
      return;
    }
    if (hole) {
      this.generateHoleChunk(sx, sz, brush);
      return;
    }
    if (spiked) {
      this.generateSpikeChunk(sx, sz, brush);
      return;
    }
    if (pond) {
      this.generatePondChunk(sx, sz, brush);
      return;
    }
    this.generateNormalChunk(sx, sz, brush);
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
          if (voxel && voxel.getStringId() == "dve_dream_stone") {
            const nVoxel = cursor.getVoxel(x, y + 1, z);
            if (nVoxel?.isAir() || nVoxel?.getStringId() == "dve_dream_grass") {
              cursor.getVoxel(x, y, z)!.setId(this.grassDreamStone);
            }
          }
        }
      }
    }
  }
}
