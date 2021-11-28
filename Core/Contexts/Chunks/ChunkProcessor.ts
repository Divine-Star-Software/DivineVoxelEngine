import type { Util } from "Global/Util.helper.js";
import { BitArray } from "Global/Util/ByteArray.js";
import { MeshData } from "Meta/Util.types.js";
import { Chunk } from "Meta/WorldData/World.types.js";
import { MeshBuilder } from "../Meshes/MeshBuilder.js";
import type { WorldData } from "../WorldData/WorldData.js";
import { PlayerWatcher } from "../WorldGen/PlayerWatcher.js";
import {ChunkOcculsionCalcuation} from "./Functions/ChunkOcculsionCalculation.js"


export class ChunkProcessor {
  worldBottomY = 0;
  worldTopY = 256;
  chunkOcculsionCalcuation  = ChunkOcculsionCalcuation;

  //wip
  greedyMeshingEnabled = false;

  meshBuilder: MeshBuilder = new MeshBuilder();
  chunkTemplates: Record<number, Record<number, number[][]>> = {};

  constructor(
    private worldData: WorldData,
    private playerWatcher: PlayerWatcher,
    private UTIL: Util
  ) {}

  _buildGreedyGroupTemplateHorizontal(
    exposedFace: number,
    chunk: Chunk,
    chunkX: number,
    chunkZ: number,
    x: number,
    y: number,
    z: number,
    greedyGroupsTemplate: number[],
    visitedVoxels: number[][][]
  ) {
    let goodToGo = false;

    if (x > 0 && z > 0 && x < 15 && z < 15) {
      if (
        //1
        !chunk[x - 1][z][y + 1] &&
        !chunk[x][z - 1][y + 1] &&
        !chunk[x + 1][z][y + 1] &&
        !chunk[x][z + 1][y + 1] &&
        //2
        chunk[x - 1][z][y] &&
        chunk[x][z - 1][y] &&
        chunk[x + 1][z][y] &&
        chunk[x][z + 1][y] &&
        //3
        chunk[x + 1][z + 1][y] == chunk[x][z][y] &&
        chunk[x + 1][z][y] == chunk[x][z][y] &&
        chunk[x][z + 1][y] == chunk[x][z][y]
      ) {
        goodToGo = true;
      }
    }
    if (x == 15 && z == 15) {
      goodToGo = false;
    }
    if (x == 0 && z == 0) {
      if (
        //2
        !chunk[x + 1][z][y + 1] &&
        !chunk[x][z + 1][y + 1] &&
        //2

        chunk[x + 1][z][y] &&
        chunk[x][z + 1][y] &&
        //3
        chunk[x + 1][z + 1][y] == chunk[x][z][y] &&
        chunk[x + 1][z][y] == chunk[x][z][y] &&
        chunk[x][z + 1][y] == chunk[x][z][y]
      ) {
        goodToGo = true;
      }
    }

    /*         if (x == 0) {
      const westChunk = this.worldData.getChunk(chunkX - 16, chunkZ);
      if (westChunk) {
        if (westChunk[15]) {
          if (westChunk[15][z]) {
            if (!westChunk[15][z][y + 1]) {
              goodToGo = true;
            } else {
              goodToGo = false;
            }
          }
        }
      }
    }
    if (x == 15) {
      const eastChunk = this.worldData.getChunk(chunkX + 16, chunkZ);
      if (eastChunk) {
        if (eastChunk[0]) {
          if (eastChunk[0][z]) {
            if (!eastChunk[0][z][y + 1]) {
              goodToGo = true;
            } else {
              goodToGo = false;
            }
          }
        }
      }
    }
    if (z == 0) {
      const southChunk = this.worldData.getChunk(chunkX, chunkZ - 16);
      if (southChunk) {
        if (southChunk[chunkX]) {
          if (southChunk[chunkX][15]) {
            if (!southChunk[chunkX][15][y + 1]) {
              goodToGo = true;
            } else {
              goodToGo = false;
            }
          }
        }
      }
    }
    if (z == 15) {
      const northChunk = this.worldData.getChunk(chunkX, chunkZ + 16);
      if (northChunk) {
        if (northChunk[chunkX]) {
          if (northChunk[chunkX][0]) {
            if (!northChunk[chunkX][0][y + 1]) {
              goodToGo = true;
            } else {
              goodToGo = false;
            }
          }
        }
      }
    } */

    if (!goodToGo) return false;
    const groupBlock = chunk[x][z][y];

    let width = 0;
    let calculatedDepth = 0;

    let widthCalculated = false;
    let depthCalculated = false;

    let calculatedWidth = 0;

    let failed = false;

    for (let i = z; i <= 16; i++) {
      let done = false;
      width = 0;
      for (let k = x; k <= 16; k++) {
        let addMember = false;

        if (chunk[k]) {
          if (chunk[k][i]) {
            if (chunk[k][i][y] == groupBlock) {
              addMember = true;
            } else {
            }
          }
        }

        if (addMember) {
          visitedVoxels[k] ??= [];
          visitedVoxels[k][i] ??= [];
          visitedVoxels[k][i][y] = groupBlock;
          width++;
          //   console.log("add");
        } else {
          if (!widthCalculated) {
            widthCalculated = true;
            calculatedWidth = width;

            break;
          }
          if (widthCalculated) {
            if (calculatedWidth != width) {
              done = true;
              //  console.log(calculatedWidth,width,i,k);
              break;
            }
          }
        }
      }

      if (done) {
        break;
      }
      calculatedDepth++;
    }

    if (failed) {
      return false;
    }
    if (calculatedWidth == 0 || calculatedDepth == 0) {
      return false;
    }

    // console.log(calculatedWidth,calculatedDepth);

    /*     for (let i = x; i < 16; i++) {
      width++;

      for (let k = z; k < 16; k++) {
        if (chunk[i + 1]) {
          if (chunk[i + 1][k]) {
            if (chunk[i + 1][k][y] == chunk[x][z][y]) {
              visitedVoxels[i] ??= [];
              visitedVoxels[i][k] ??= [];
              visitedVoxels[i][k][y] = chunk[x][z][y];
            }
          }
        }

        if (chunk[i]) {
          if (chunk[i][k + 1]) {
            if (chunk[i][k + 1][y] == chunk[x][z][y]) {
              if (!depthCalculated) {
                depth++;
              }
              visitedVoxels[i] ??= [];
              visitedVoxels[i][k] ??= [];
              visitedVoxels[i][k][y] = chunk[x][z][y];
            } else {
              depthCalculated = true;
            }
          } else {
            depthCalculated = true;
          }
        }
      }
    } */

    /**# Template structure
     * ---
     * exposed face num 1- 6
     * groupBlock - block id for the block
     * x - The groups starting x
     * y - The groups starting y
     * z - The group starting z
     * 0/1 - 0 for a horizontla group 1 for a veertical group
     * width - The width of the group
     * depth - The depth of the gorup
     */
    greedyGroupsTemplate.push(
      exposedFace,
      groupBlock,
      x,
      y,
      z,
      0,
      calculatedWidth,
      calculatedDepth
    );

    return goodToGo;
  }

  makeChunkTemplate(
    chunk: number[][][],
    chunkX: number,
    chunkZ: number
  ): number[][] {
    const chunkTemplatePostions: number[] = [];
    const chunkTemplateFaces: number[] = [];
    const chunkTemplateBlocks: number[] = [];
    const amientOcculusionTemplate: number[] = [];
    const greedyGroupsTemplate: number[] = [];
    const visitedVoxels: number[][][] = [];
    

    for (const x of chunk.keys()) {
      if (!chunk[x]) {
        continue;
      }

      for (const z of chunk[x].keys()) {
        if (!chunk[x][z]) {
          continue;
        }
        for (const y of chunk[x][z].keys()) {
          const block = chunk[x][z][y];
          if (!block) continue;

          if (this.greedyMeshingEnabled) {
            if (visitedVoxels[x]) {
              if (visitedVoxels[x][z]) {
                if (visitedVoxels[x][z][y]) {
                  continue;
                }
              }
            }
          }

          let formedGreedyTopGroup = false;
          let formedGreedyBottomGroup = false;
          let formedGreedyNorthGroup = false;
          let formedGreedySouthGroup = false;
          let formedGreedyEastGroup = false;
          let formedGreedyWestGroup = false;

          const bitArray = this.UTIL.getBitArray([0]);

          if (!chunk[x][z][y + 1]) {
            if (this.greedyMeshingEnabled) {
              formedGreedyTopGroup = this._buildGreedyGroupTemplateHorizontal(
                1,
                chunk,
                chunkX,
                chunkZ,
                x,
                y,
                z,
                greedyGroupsTemplate,
                visitedVoxels
              );
            }
            this._buildAmbientOcclusion(
              chunk,
              amientOcculusionTemplate,
              chunkX,
              chunkZ,
              x,
              y,
              z,
              "top"
            );

            if (!formedGreedyTopGroup) {
              //add top
              bitArray.setBit(0, 1);
            }
          }
          if (!chunk[x][z][y - 1] && y != this.worldBottomY) {
            //add bottom
            bitArray.setBit(1, 1);
            this._buildAmbientOcclusion(
              chunk,
              amientOcculusionTemplate,
              chunkX,
              chunkZ,
              x,
              y,
              z,
              "bottom"
            );
          }

          if (chunkX + 16 != this.playerWatcher.currentMaxChunkX + x + 1) {
            //   console.log(chunkX,x);
            //chunk border east
            if (15 == x) {
              const westChunk = this.worldData.getChunk(chunkX + 16, chunkZ);

              if (westChunk) {
                if (westChunk[0]) {
                  if (westChunk[0][z]) {
                    if (westChunk[0][z][y]) {
                    } else {
                      //add east
                      bitArray.setBit(2, 1);
                      this._buildAmbientOcclusion(
                        chunk,
                        amientOcculusionTemplate,
                        chunkX,
                        chunkZ,
                        x,
                        y,
                        z,
                        "east"
                      );
                    }
                  }
                }
              } else {
                //add east
                bitArray.setBit(2, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "east"
                );
              }
            } else {
              if (!chunk[x + 1]) {
                //add east
                bitArray.setBit(2, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "east"
                );
              } else if (chunk[x + 1][z]) {
                if (!chunk[x + 1][z][y]) {
                  //add east
                  bitArray.setBit(2, 1);
                  this._buildAmbientOcclusion(
                    chunk,
                    amientOcculusionTemplate,
                    chunkX,
                    chunkZ,
                    x,
                    y,
                    z,
                    "east"
                  );
                }
              }
            }
          } else {
            //     console.log("max x removed",chunkX,x);
          }

          if (chunkX - x != this.playerWatcher.currentMinChunkX) {
            if (0 == x) {
              const westChunk = this.worldData.getChunk(chunkX - 16, chunkZ);

              if (westChunk) {
                if (westChunk[15]) {
                  if (westChunk[15][z]) {
                    if (westChunk[15][z][y]) {
                    } else {
                      //add west
                      bitArray.setBit(3, 1);
                      this._buildAmbientOcclusion(
                        chunk,
                        amientOcculusionTemplate,
                        chunkX,
                        chunkZ,
                        x,
                        y,
                        z,
                        "west"
                      );
                    }
                  }
                }
              } else {
                //add west
                bitArray.setBit(3, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "west"
                );
              }
            } else {
              if (!chunk[x - 1]) {
                //add west
                bitArray.setBit(3, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "west"
                );
              } else if (chunk[x - 1][z]) {
                if (!chunk[x - 1][z][y]) {
                  //add west
                  bitArray.setBit(3, 1);
                  this._buildAmbientOcclusion(
                    chunk,
                    amientOcculusionTemplate,
                    chunkX,
                    chunkZ,
                    x,
                    y,
                    z,
                    "west"
                  );
                }
              }
            }
          }

          if (chunkZ - z != this.playerWatcher.currentMinChunkZ) {
            //chunk border north
            if (0 == z) {
              const northChunk = this.worldData.getChunk(chunkX, chunkZ - 16);

              if (northChunk) {
                if (northChunk[x][15]) {
                  if (northChunk[x][15][y]) {
                  } else {
                    //add north
                    bitArray.setBit(4, 1);
                    this._buildAmbientOcclusion(
                      chunk,
                      amientOcculusionTemplate,
                      chunkX,
                      chunkZ,
                      x,
                      y,
                      z,
                      "north"
                    );
                  }
                }
              } else {
                //add north
                bitArray.setBit(4, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "north"
                );
              }
            } else {
              if (!chunk[x][z - 1]) {
                //add north
                bitArray.setBit(4, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "north"
                );
              } else if (!chunk[x][z - 1][y]) {
                //add north
                bitArray.setBit(4, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "north"
                );
              }
            }
          }

          if (chunkZ + 16 != this.playerWatcher.currentMaxChunkZ + z + 1) {
            //chunk border south
            if (15 == z) {
              const southChunk = this.worldData.getChunk(chunkX, chunkZ + 16);

              if (southChunk) {
                if (southChunk[x][0]) {
                  if (southChunk[x][0][y]) {
                  } else {
                    //add south
                    bitArray.setBit(5, 1);
                    this._buildAmbientOcclusion(
                      chunk,
                      amientOcculusionTemplate,
                      chunkX,
                      chunkZ,
                      x,
                      y,
                      z,
                      "south"
                    );
                  }
                }
              } else {
                //add south
                bitArray.setBit(5, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "south"
                );
              }
            } else {
              if (!chunk[x][z + 1]) {
                //add south
                bitArray.setBit(5, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "south"
                );
              } else if (!chunk[x][z + 1][y]) {
                //add south
                bitArray.setBit(5, 1);
                this._buildAmbientOcclusion(
                  chunk,
                  amientOcculusionTemplate,
                  chunkX,
                  chunkZ,
                  x,
                  y,
                  z,
                  "south"
                );
              }
            }
          }

          //end of block loop
          if (
            !formedGreedyTopGroup ||
            !formedGreedyBottomGroup ||
            !formedGreedyEastGroup ||
            !formedGreedyWestGroup ||
            !formedGreedySouthGroup ||
            !formedGreedyNorthGroup
          ) {
            chunkTemplateBlocks.push(block);
            chunkTemplatePostions.push(x, y, z);
            chunkTemplateFaces.push(bitArray.getDec(0));
          }
        }
      }
    }

    return [
      chunkTemplatePostions,
      chunkTemplateFaces,
      chunkTemplateBlocks,
      greedyGroupsTemplate,
      amientOcculusionTemplate,
    ];
  }


  _buildAmbientOcclusion(
    chunk: number[][][],
    amientOcculusionTemplate: number[],
    chunkX: number,
    chunkZ: number,
    x: number,
    y: number,
    z: number,
    face: "top" | "bottom" | "north" | "east" | "west" | "south"
  ) {
    // +x
    if (face == "east") {
      /*       amientOcculusionTemplate.push(1,1,.5,.5,1,1);
      return; */
      amientOcculusionTemplate.push(





        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 0, -1) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, 0) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, -1),

   
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 0, -1) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, 0) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, -1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 0, 1) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, 0) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, 1),
  
 


        
        this.chunkOcculsionCalcuation(this.worldData,  chunk, chunkX, chunkZ, x, y, z, 1, 0, 1) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, 0) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, 1),



 


      );
    }

    // -x
    if (face == "west") {
      /*    amientOcculusionTemplate.push(1,1,.5,.5,1,1);
      return; */
      amientOcculusionTemplate.push(
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 0, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, -1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 0, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, 1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 0, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, 1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 0, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, -1)
      );
    }
    // +y
    if (face == "top") {
      /*   amientOcculusionTemplate.push(1,1,.5,.5,1,1);
      return; */
      // curCell.ao[2] = [1.0, 1.0, 0.5, 0.5];

      amientOcculusionTemplate.push(
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, 1, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, -1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, 1, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, 1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, 1, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, 1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, 1, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, -1)
      );
    }

    // -y
    if (face == "bottom") {
      /*       amientOcculusionTemplate.push(1,1,.5,.5,1,1);
      return; */
      amientOcculusionTemplate.push(
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, -1, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, -1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, -1, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, -1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, -1, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, 1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, -1, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, 0) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, 1)
      );
    }

    // +z
    if (face == "south") {


      amientOcculusionTemplate.push(
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 0, 1) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, -1, 1) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, 1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 0, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, -1, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, 1),


   
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 0, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, 1, 1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, 1),


        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 0, 1) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, 1, 1) *
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, 1)







    
      );
    }

    // -z
    if (face == "north") {
   /*    amientOcculusionTemplate.push(1,1,1,1);
      return;  */
      amientOcculusionTemplate.push(
        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 0, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, -1, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, -1, -1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 0, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, 1, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, -1, 1, -1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 0, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, 1, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 1, -1),

        this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, 0, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 0, -1, -1) *
          this.chunkOcculsionCalcuation(this.worldData, chunk, chunkX, chunkZ, x, y, z, 1, -1, -1)
      );
    }
  }
}
