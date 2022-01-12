import type { WorldGenerationInterface } from "Meta/World/WorldGeneration/WorldGeneration.interface";
import type { VoxelPallet } from "Meta/WorldData/World.types";

/**# World Generation
 * ---
 * Helps with creating the needed format for each chunk. 
 */
export class WorldGeneration  implements WorldGenerationInterface {


    
    globalVoxelPalletIndex = 1;
    globalVoxelPallet : VoxelPallet = {};
    globalVoxelPalletMap : Record<string,number> = {};

    getVoxelIdFromGlobalPallet(id: string): number {
        return this.globalVoxelPalletMap[id];
    }


    addToGlobalVoxelPallet(id : string,voxleStateData : any[]) {
         this.globalVoxelPallet[this.globalVoxelPalletIndex] = voxleStateData;
         this.globalVoxelPalletMap[id] = this.globalVoxelPalletIndex;
         this.globalVoxelPalletIndex++;
    }

    getGlobalVoxelPallet() {
        return this.globalVoxelPallet;
    }



    



}