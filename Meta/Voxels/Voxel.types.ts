import { VoxelHelperInterface } from "./VoxelHelper.interface";

export type VoxelData = {
 name: string;
 shapeId: number;
 id: string;
};

export interface VoxelInteface {
 data: VoxelData;

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
  voxelExposedFaceEncodedBit: number,
  voxelData: any[]
 ): void;

 getShapeId(voxelData: any[]): number;
}
