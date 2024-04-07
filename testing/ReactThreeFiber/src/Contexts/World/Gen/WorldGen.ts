import { GetAdvancedBrushTool } from "@divinevoxel/core/Tools/Brush/AdvancedBrushTool";

const brush = GetAdvancedBrushTool();

export const WorldGen = {
  chunkDepth: 16,
  chunkWidth: 16,
  worldHeight: 256,
  minY: 60,

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
          if (y > this.minY + 1) break;
          if (
            x == chunkX ||
            z == chunkZ ||
            x == chunkX + this.chunkWidth - 1 ||
            z == chunkZ + this.chunkDepth - 1
          ) {
            brush.setId("dve_dream_stone").paint();
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

  generateWorldColumn(chunkX: number, chunkZ: number) {
    brush.start();
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
