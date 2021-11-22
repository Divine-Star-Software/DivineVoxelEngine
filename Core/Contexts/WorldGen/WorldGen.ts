import { ChunkMapInteface } from "Meta/Chunks/ChunkMap.inteface";

export class WorldGen {




  constructor(private chunkMap : ChunkMapInteface) {

  }

  chunkDepth = 16;
  chunkWidth = 16;
  chunkHeight = 256;

  generateChunk(chunkX: number, chunkZ: number): number[][][] {


    const key = `${chunkX}-${chunkZ}`;
    this.chunkMap.addChunk(chunkX,chunkZ);

    const returnChunk: number[][][] = [];

    let toss = Math.random();
    let spiked = false;
    let crazy = false;
    let hole = false;
    if (toss < 0.2 ) {
      crazy = true;
    }
    if ((toss > 0.2) && (toss < .4) ) {
      spiked = true;
    }
    if ((toss > 0.4) && (toss < .6) ) {
      hole = true;
    }
    let normal = true;
    if(crazy || spiked || hole) {
      normal = false;
    }
    for (let x = 0; x < +this.chunkWidth; x++) {
      for (let z = 0; z < this.chunkDepth; z++) {
        for (let y = 0; y < this.chunkHeight; y++) {
          if (crazy) {
            if (y < Math.floor(Math.random() * 30)) {
              returnChunk[x] ??= [];
              returnChunk[x][z] ??= [];
              returnChunk[x][z][y] = 1;

            }
          } 
          if (spiked) {
            if(x == 7 && z  == 7) {
              returnChunk[x] ??= [];
              returnChunk[x][z] ??= [];
              returnChunk[x][z][y] = 1;
            
            }
            if(x == 7 && z  == 8) {
              returnChunk[x] ??= [];
              returnChunk[x][z] ??= [];
              returnChunk[x][z][y] = 1;

            }
            if(x == 8 && z  == 8) {
              returnChunk[x] ??= [];
              returnChunk[x][z] ??= [];
              returnChunk[x][z][y] = 1;

            }
            if(x == 8 && z  == 7) {
              returnChunk[x] ??= [];
              returnChunk[x][z] ??= [];
              returnChunk[x][z][y] = 1;
          
            }
            if(x  == 0 || z == 0 || x == 15 || z == 15) {
              if(y == 30) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;

              }
            }
            if(x  == 1 || z == 1 || x == 14 || z == 14) {
              if(y == 31) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;

              }
            }
            if(x  == 2 || z == 2 || x == 13 || z == 13) {
              if(y == 32) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
 
              }
            }
            if(x  == 3 || z == 3 || x == 12 || z == 12) {
              if(y == 33) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
       
              }
            }
            if(x  == 4 || z == 4 || x == 11 || z == 11) {
              if(y == 33) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
             
              }
            }
            if(x  == 5 || z == 5 || x == 10 || z == 10) {
              if(y == 34) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
      
              }
            }
            if(x  == 6 || z == 6 || x == 9 || z == 9) {
              if(y == 35) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
          
              }
            }

            if (y < 30) {
              returnChunk[x] ??= [];
              returnChunk[x][z] ??= [];
              returnChunk[x][z][y] = 1;
  
            }
          }    


          if(hole) {
            if(x  == 0 || z == 0 || x == 15 || z == 15) {
              if(y == 30) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;

              }
            }
            if(x  == 1 || z == 1 || x == 14 || z == 14) {
              if(y == 29) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
 
              }
            }
            if(x  == 2 || z == 2 || x == 13 || z == 13) {
              if(y == 28) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
          
              }
            }
            if(x  == 3 || z == 3 || x == 12 || z == 12) {
              if(y == 27) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;

              }
            }
            if(x  == 4 || z == 4 || x == 11 || z == 11) {
              if(y == 26) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
     
              }
            }
            if(x  == 5 || z == 5 || x == 10 || z == 10) {
              if(y == 25) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
             
              }
            }
            if(x  == 6 || z == 6 || x == 9 || z == 9) {
              if(y == 24) {
                returnChunk[x] ??= [];
                returnChunk[x][z] ??= [];
                returnChunk[x][z][y] = 1;
              
              }
            }

            if (y < 23) {
              returnChunk[x] ??= [];
              returnChunk[x][z] ??= [];
              returnChunk[x][z][y] = 1;

            }
          }
          
            if(normal) {
            if (y < 30) {
              returnChunk[x] ??= [];
              returnChunk[x][z] ??= [];
              returnChunk[x][z][y] = 1;

            }
            if (x == 8 && z == 8 && y == 32) {
              returnChunk[x] ??= [];
              returnChunk[x][z] ??= [];
              returnChunk[x][z][y] = 1;

            }

            
          }
          
        }
      
        }
      }
    

    return returnChunk;
  }
}
