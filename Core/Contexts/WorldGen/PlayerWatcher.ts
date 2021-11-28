import type  { WorldData } from "../WorldData/WorldData";

/**# Player Watcher
 * ---
 * Keeps track of the players movement and
 * singles the world to add or remove chunks
 * based on their new position and render distance.
 */
export class PlayerWatcher {
  playerABSPositon: Float32Array;
  playerChunkPosition: Float32Array;
  playerDirection: Uint8Array;

  renderDistance = 20;

  currentMaxChunkX = 160;
  currentMinChunkX = -144;
  currentMaxChunkZ = 160;
  currentMinChunkZ = -144;

  cachedChunkZ = 0;
  cachedChunkX = 0;

  constructor(private worldData : WorldData) {

  }


  setPlayerSharedArrays(
    postionBuffer: SharedArrayBuffer,
    chunkBuffer: SharedArrayBuffer,
    directionBuffer: SharedArrayBuffer
  ) {
    this.playerABSPositon = new Float32Array(postionBuffer);
    this.playerChunkPosition = new Float32Array(chunkBuffer);
    this.playerDirection = new Uint8Array(directionBuffer);
  }

  startWatchingPlayer() {
    this.cachedChunkX = this.playerChunkPosition[0];
    this.cachedChunkZ = this.playerChunkPosition[1];
    setInterval(() => {
      const chunkX = this.playerChunkPosition[0];
      const chunkZ = this.playerChunkPosition[1];

      let movedWest = false;
      let movedEast = false;
      let movedNorth = false;
      let movedSouth = false;

      if (this.cachedChunkX != chunkX) {
        if (this.cachedChunkX > chunkX) {
          movedWest = true;
        }
        if (this.cachedChunkX < chunkX) {
          movedEast = true;
        }
      }
      if (this.cachedChunkZ != chunkZ) {
        if (this.cachedChunkZ < chunkZ) {
          movedNorth = true;
        }
        if (this.cachedChunkZ > chunkZ) {
          movedSouth = true;
        }
      }


      let moved = false;
      if (movedNorth) {
        moved = true;
        this.currentMaxChunkZ += 16;
        this.currentMinChunkZ += 16;
        //add chunks to the north remove from the south
        this.worldData.generateChunkLine(this.cachedChunkX,this.cachedChunkZ,  "north");
      }
      if (movedSouth) {
        moved = true;
        this.currentMaxChunkZ -= 16;
        this.currentMinChunkZ -= 16;
        //add chunks to the south remove from the north
        this.worldData.generateChunkLine(this.cachedChunkX,this.cachedChunkZ,  "south");
      }
      if (movedWest) {
        moved = true;
        this.currentMaxChunkX -= 16;
        this.currentMinChunkX -= 16;
        //add chunks to the west remove from the east
        this.worldData.generateChunkLine(this.cachedChunkX,this.cachedChunkZ,  "west");
      }
      if (movedEast) {
        moved = true;
        this.currentMaxChunkX += 16;
        this.currentMinChunkX += 16;
        //add chunks to the east remove from te wast
        this.worldData.generateChunkLine(this.cachedChunkX,this.cachedChunkZ,  "east");
      }

      this.cachedChunkX = chunkX;
      this.cachedChunkZ = chunkZ;
      if(moved) {

      }

    }, 100);
  }
}
