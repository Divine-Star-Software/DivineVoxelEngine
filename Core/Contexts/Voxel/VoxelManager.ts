import { VoxelData } from "Meta/Voxels/Voxel.types";


export class VoxelManager {


    voxelData : VoxelData[];
    voxels : Record<number,VoxelData> = {};




    registerVoxelData(voxelData : VoxelData[]) {
        this.voxelData = voxelData;
    
    }

    _processBlocks(blockData : VoxelData[]) {

        for(const block of blockData) {
            if(block.animatedTextuveUVs) {
                
            }
        }


    }



}