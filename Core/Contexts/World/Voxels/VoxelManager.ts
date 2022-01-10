import {  VoxelInteface } from "Meta/Voxels/Voxel.types";


export class VoxelManager {



    voxels : Record<string,VoxelInteface> = {};




    getVoxel(id : string) : VoxelInteface {

        return this.voxels[id];
    }


    registerVoxelData(id : string,voxel : VoxelInteface)  {
        this.voxels[id] = voxel;
    
    }





}