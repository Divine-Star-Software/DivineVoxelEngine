import {  VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import { VoxelManagerInterface } from "Meta/World/Voxels/VoxelManager.interface";


export class VoxelManager implements VoxelManagerInterface {



    voxels : Record<string,VoxelInteface> = {};




    getVoxel(id : string) : VoxelInteface {

        return this.voxels[id];
    }


    registerVoxelData(voxel : VoxelInteface)  {
        this.voxels[voxel.data.id] = voxel;
    
    }





}