import {  VoxelInteface } from "Meta/Contents/World/Voxels/Voxel.types";
import { VoxelManagerInterface } from "Meta/Contents/World/Voxels/VoxelManager.interface";


export class VoxelManager implements VoxelManagerInterface {



    voxels : Record<string,VoxelInteface> = {};




    getVoxel(id : string) : VoxelInteface {

        return this.voxels[id];
    }


    registerVoxelData(voxel : VoxelInteface)  {
        this.voxels[voxel.data.id] = voxel;
    
    }





}