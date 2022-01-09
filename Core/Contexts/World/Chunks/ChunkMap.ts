import { ChunkMapInteface } from "Meta/Chunks/ChunkMap.inteface";

export class ChunkMap implements ChunkMapInteface {



    chunks : Record<string,Record<string,number>> = {};

    /**# Delete Chunk
     * ---
     * Clear the chunk data and reuse it. 
     */
     deleteChunk(chunkX : number,chunkZ : number) {

     }

     addChunk(chunkX : number, chunkZ : number) {
        this.chunks[`${chunkX}-${chunkZ}`] = {};
     }
     getChunk(chunkX : number, chunkZ :  number){
        return this.chunks[`${chunkX}-${chunkZ}`];
     }
 
     blockExists(chunkX : number, chunkZ : number, x : number, y : number, z: number) {
         return true;
     }
 
 
 
}