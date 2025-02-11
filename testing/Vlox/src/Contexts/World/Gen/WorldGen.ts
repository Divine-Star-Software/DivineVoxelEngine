import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";
import { WorldCursor } from "@divinevoxel/vlox/World/Cursor/WorldCursor";
import { VoxelCursor } from "@divinevoxel/vlox/Voxels/Cursor/VoxelCursor";
const worldCursor = new WorldCursor();
const voxelCursor = new VoxelCursor();
const brush = new BrushTool();

export const WorldGen = {
  worldCursor,
  chunkDepth: 16,
  chunkWidth: 16,
  worldHeight: 256,
  minY: 60,
  brush,

  generateHoleChunk(chunkX: number, chunkZ: number) {
    let rx = 0;
    for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
      let rz = 0;
      for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
        for (let y = 0; y < this.worldHeight; y++) {
          if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
            if (y > this.minY) break;
            if (y == this.minY) {
              brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
              if (Math.random() > 0.8) {
                brush
                  .setId("dve_dream_grass")
                  .setXYZ(x, y + 1, z)
                  .paint();
              }
            }
          }
          if (rx == 1 || rz == 1 || rx == 14 || rz == 14) {
            if (y == this.minY - 1) {
              brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
              if (Math.random() > 0.8) {
                brush
                  .setId("dve_dream_grass")
                  .setXYZ(x, y + 1, z)
                  .paint();
              }
            }
          }
          if (rx == 2 || rz == 2 || rx == 13 || rz == 13) {
            if (y == this.minY - 2) {
              brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
              if (Math.random() > 0.8) {
                brush
                  .setId("dve_dream_grass")
                  .setXYZ(x, y + 1, z)
                  .paint();
              }
            }
          }
          if (rx == 3 || rz == 3 || rx == 12 || rz == 12) {
            if (y == this.minY - 3) {
              brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
              if (Math.random() > 0.8) {
                brush
                  .setId("dve_dream_grass")
                  .setXYZ(x, y + 1, z)
                  .paint();
              }
            }
          }
          if (rx == 4 || rz == 4 || rx == 11 || rz == 11) {
            if (y == this.minY - 4) {
              brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
              if (Math.random() > 0.8) {
                brush
                  .setId("dve_dream_grass")
                  .setXYZ(x, y + 1, z)
                  .paint();
              }
            }
          }
          if (rx == 5 || rz == 5 || rx == 10 || rz == 10) {
            if (y == this.minY - 5) {
              brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
              if (Math.random() > 0.8) {
                brush
                  .setId("dve_dream_grass")
                  .setXYZ(x, y + 1, z)
                  .paint();
              }
            }
          }
          if (rx == 6 || rz == 6 || rx == 9 || rz == 9) {
            if (y == this.minY - 6) {
              brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
              if (Math.random() > 0.8) {
                brush
                  .setId("dve_dream_grass")
                  .setXYZ(x, y + 1, z)
                  .paint();
              }
            }
          }

          if (y < this.minY - 7) {
            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
            if (Math.random() > 0.8) {
              brush
                .setId("dve_dream_grass")
                .setXYZ(x, y + 1, z)
                .paint();
            }
          }
        }
        rz++;
      }
      rx++;
    }
  },

  generatePondChunk(chunkX: number, chunkZ: number) {
    for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
      for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
        for (let y = 0; y < this.worldHeight; y++) {
          brush.setXYZ(x, y, z);
          if (y > this.minY + 2) break;
          if (
            x == chunkX ||
            z == chunkZ ||
            x == chunkX + this.chunkWidth - 1 ||
            z == chunkZ + this.chunkDepth - 1
          ) {
            if (y == this.minY + 2) {
              if (Math.random() > 0.8) {
                brush.setId("dve_dream_grass").setXYZ(x, y, z).paint();
              }
            } else {
              brush.setId("dve_dream_stone").paint();
            }

            continue;
          }
          if (y < this.minY - 10) {
            brush.setId("dve_dream_stone").paint();
          }
          if (y >= this.minY - 10 && y <= this.minY) {
            brush.setId("dve_liquid_dream_ether").paint();
          }
        }
      }
    }
  },

  generateNormalChunk(chunkX: number, chunkZ: number) {
    for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
      for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
        for (let y = 0; y < this.worldHeight; y++) {
          if (y > this.minY + 1) break;
          if (y <= this.minY) {
            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
          }
          if (y == this.minY + 1) {
            if (Math.random() > 0.8) {
              brush.setId("dve_dream_grass").setXYZ(x, y, z).paint();
            }
          }
        }
      }
    }
  },

  //1376271
  generateRoofChunk(chunkX: number, chunkZ: number) {
    for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
      for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
        for (let y = 0; y < this.minY + 10; y++) {
          brush.setXYZ(x, y, z);

          if (y < this.minY - 3) {
            brush.setId("dve_dream_stone").paint();
          }
          if (y == this.minY - 3 && Math.random() > 0.8) {
            brush.setId("dve_dream_grass").paint();
          }
          if (y == this.minY) {
            brush.setId("dve_dream_stone_pillar").paint();
          }
        }
      }
    }
  },

  generateBlankChunk(chunkX: number, chunkZ: number) {
    for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
      for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
        for (let y = 0; y < this.minY + 10; y++) {
          brush.setXYZ(x, y, z);

          if (y <= 2) {
            brush
              .setId("dve_dream_stone")
              .setXYZ(x, y, z)
              .setId("dve_dream_stone")
              .paint();
            continue;
          }
          if (y < this.minY - 3) {
            if (x == chunkX + 8 && z == chunkZ + 8 && y < this.minY - 5) {
              brush
                .setSecondaryId("dve_dream_grass")
                .setId("dve_liquid_dream_ether")
                .paint();
              continue;
            }
            brush.setSecondaryId("").setId("dve_liquid_dream_ether").paint();
          }
        }
      }
    }
  },

  generateBoxChunk(chunkX: number, chunkZ: number) {
    for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
      for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
        for (let y = 0; y < this.minY + 10; y++) {
          brush.setXYZ(x, y, z);
          if (y < this.minY - 3) {
            brush.setId("dve_dream_stone").paint();
          }
          if (y == this.minY - 3 && Math.random() > 0.8) {
            brush.setId("dve_dream_grass").paint();
          }
          if (y == this.minY) {
            brush.setId("dve_dream_stone_pillar").paint();
          }
          if (y == this.minY + 5) {
            brush.setId("dve_dream_stone_pillar").paint();
          }
          if (
            y >= this.minY &&
            y <= this.minY + 5 &&
            (x == chunkX || x == chunkX + 15 || z == chunkZ || z == chunkZ + 15)
          ) {
            brush.setId("dve_dream_stone_pillar").paint();
          }
        }
      }
    }
  },

  test(chunkX: number, chunkZ: number) {
    for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
      for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
        for (let y = 0; y < this.minY + 10; y++) {
          brush.setXYZ(x, y, z);
          if (y < this.minY - 3) {
            brush.setId("dve_dream_stone").paint();
          }
          if (y < this.minY) {
            brush.setId("dve_liquid_dream_ether").paint();
          }
        }
      }
    }
  },

  flatColumn(chunkX: number, chunkZ: number) {
    const columnCursor = this.worldCursor.getSector(chunkX, 0, chunkZ)!;
/*     voxelCursor.setStringId("dve_dread_stone").process();
    for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
      for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
        for (let y = 0; y < 10; y++) {
          columnCursor.getVoxel(x, y, z)!.setId(voxelCursor.id).updateVoxel(0);
        }
      }
    }
    voxelCursor.setStringId("dve_dread_stone_slab").process();
    columnCursor.getVoxel(2, 10, 2)!.setId(voxelCursor.id).updateVoxel(0); */
    voxelCursor.setStringId("dve_dream_fence").process();
    columnCursor.getVoxel(0, 10, 0)!.setId(voxelCursor.id).updateVoxel(0);
    columnCursor.getVoxel(1, 10, 0)!.setId(voxelCursor.id).updateVoxel(0);
    columnCursor.getVoxel(0, 10, 1)!.setId(voxelCursor.id).updateVoxel(0);
    columnCursor.getVoxel(-1, 10, 0)!.setId(voxelCursor.id).updateVoxel(0);
    columnCursor.getVoxel(0, 10, -1)!.setId(voxelCursor.id).updateVoxel(0);
  },

  pyramidColumn(chunkX: number, chunkZ: number) {
    const columnCursor = this.worldCursor.getSector(chunkX, 0, chunkZ)!;
    let minus = 0;
    voxelCursor.setStringId("dve_dread_stone").process();
    const height = 10;
    for (let y = 0; y < 1 + height; y++) {
      //   if (y % 2 == 0) continue;
      for (let x = chunkX + minus; x < this.chunkWidth + chunkX - minus; x++) {
        for (
          let z = chunkZ + minus;
          z < this.chunkDepth + chunkZ - minus;
          z++
        ) {
          columnCursor.getVoxel(x, y, z)!.setId(voxelCursor.id).updateVoxel(0);
        }
      }
      minus++;
    }
  },
  flat(chunkX: number, chunkZ: number) {
    const columnCursor = this.worldCursor.getSector(chunkX, 0, chunkZ)!;
    voxelCursor.setStringId("dve_debug_box").process();
    for (let x = 0; x < this.chunkWidth; x++) {
      for (let z = 0; z < this.chunkDepth; z++) {
        for (let y = 0; y < 2; y++) {
          if (y == 1) {
            if (!(x == 0 || z == 0 || x == 15 || z == 15)) continue;
          }
          columnCursor
            .getVoxel(x + chunkX, y, z + chunkZ)!
            .setId(voxelCursor.id)
            .updateVoxel(0);
        }
      }
    }
  },
  generateWorldColumn(chunkX: number, chunkZ: number) {
    //  brush.start();
    return this.generateBlankChunk(chunkX, chunkZ);
    let toss = Math.random();

    if (
      (chunkX == 0 && chunkZ == 0) ||
      (chunkX == 0 && chunkZ == -16) ||
      (chunkX == -16 && chunkZ == -0) ||
      (chunkX == -16 && chunkZ == -16)
    ) {
      this.generateRoofChunk(chunkX, chunkZ);
      return;
    }

    //   return this.generatePondChunk(chunkX, chunkZ);

    if (toss < 0.3) {
      this.generateBoxChunk(chunkX, chunkZ);
      return;
    }

    if (toss > 0.6) {
      this.generateHoleChunk(chunkX, chunkZ);
      return;
    }

    let toss2 = Math.random() > 0.5;
    if (toss2) this.generateNormalChunk(chunkX, chunkZ);
    if (!toss2) this.generatePondChunk(chunkX, chunkZ);
    brush.stop();
  },
};
