import { VoxelPallet } from "Meta/WorldData/World.types";
import { VoxelHelperInterface } from "./VoxelHelper.interface";
/**# Voxel Substance Type
 * ---
 * All solid and transparent voxels are grouped together in the same mesh per chunk.
 * While the the fluid and magma will chunks will have their own seperate meshes per chunk.
 * Transparent voxels will not cause the faces of solid voxels next to them to be culled they also have double sided rendering.
 */
export type VoxelSubstanceType =
 | "solid"
 | "transparent"
 | "flora"
 | "fluid"
 | "magma";

export type VoxelAOCalcData = {
 exposedFaces: number[];
 chunkVoxels: any[][][];
 voxelPallete: VoxelPallet;
 aoTemplate: number[];
 chunkX: number;
 chunkY: number;
 chunkZ: number;
 x: number;
 y: number;
 z: number;
};

export type VoxelLightCalcData = {
    exposedFaces: number[];
    voxelPallete: VoxelPallet;
    voxelData: any[];
    RGBLightTemplate: number[];
    sunLightTemplate: number[];
    chunkX: number;
    chunkY: number;
    chunkZ: number;
    x: number;
    y: number;
    z: number;
   };
   
   export type VoxelUVCalcData = {
    exposedFaces: number[];
    chunkVoxels: any[][][];
    aoTemplate: number[];
    chunkX: number;
    chunkY: number;
    chunkZ: number;
    x: number;
    y: number;
    z: number;
   };
   

export type VoxelProcessData = {
    exposedFaces: number[];
    voxelPallete: VoxelPallet;
    voxelData: any[];
    aoTemplate: number[];
    RGBLightTemplate: number[];
    sunLightTemplate: number[];
    uvTemplate : number[];
    chunkX: number;
    chunkY: number;
    chunkZ: number;
    x: number;
    y: number;
    z: number;
}


/**# Voxel Data
 * ---
 * This the needed information for each voxel.
 */
export type VoxelData = {
 name: string;
 shapeId: string;
 id: string;
 substance: VoxelSubstanceType;
 defaultState: any[];
 states?: any[];
};

export interface VoxelInteface {
 data: VoxelData;
 trueShapeId: number;

 voxelHelper: VoxelHelperInterface;

 hooks: {
  beforeAdd?: Function;
  afterAdd?: Function;
  beforeRemove?: Function;
  afterAfter?: Function;
 };

 /**# Get UVs
  * ---
  * This function is called when processing a chunk.
  * This function must add the voxels uvs.
  * The current uvs.
  * @param uvs
  * A number that is encoded that shows each exposed face.
  * @param voxelExposedFaceEncodedBit
  * The voxels data.
  * @param voxelData
  */
 getUVs(
  uvs: number[],
  chunkX: number,
  chunkZ: number,
  voxelExposedFaceEncodedBit: number,
  voxelData: any[]
 ): void;

 getAO(data: VoxelAOCalcData): void;
 getLight(data: VoxelLightCalcData): void;

 getShapeId(voxelData: any[]): number;


process(data : VoxelProcessData) : void;

}
