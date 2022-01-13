import { PositionMatrix } from "Meta/Util.types";
import { ShapeHelperInterface } from "./ShapeHelper.interface";

/** # Voxel Shape Add DAta
---
* The chunk meshes positions
* @var positions
* The chunk mesh indices
* @var indices
* The chunk mesh full colors
* @var fullColors
* The chunk mesh linear space colors
* @var linearColors
* The chunk mesh uvs
* @var uvs
* ## Face
* The current face that is being added to the mesh.
* 0 -> top
* 1 -> bottom
* 2 -> west
* 3 -> east
* 4 -> north
* 5 -> south
* @var face
* The current indicie index of the mesh.
* @var indicieIndex: number;
* The calculated uv template.
* @var unTemplate: number[];
* The current index of the uv template
* @var uvTemplateIndex: number;
* The calcuated light values
* @var lightTemplate: number[];
* The current light template index.
* @var lightIndex: number[];
* The calculated AO values.
* @var  aoTemplate: number[];
* The current AO index.
* @var aoIndex: number[];
* The relative chunk position that the voxel is being added.
* @var position: PositionMatrix;
*/
export type VoxelShapeAddData = {
 positions: number[];
 indices: number[];
 fullColors: number[];
 linearColors: number[];
 uvs: number[];
 face: number;
 indicieIndex: number;
 unTemplate: Uint16Array;
 uvTemplateIndex: number;
 lightTemplate: Float32Array;
 lightIndex: number;
 aoTemplate: Float32Array;
 aoIndex: number;
 position: PositionMatrix;
};

export type VoxelShapeAddReturnData = {
 newIndicieIndex: number;
 newUVTemplateIndex: number;
 newLightIndex: number;
 newAOIndex: number;
};

/**# Voxel Shape
 * ---
 * Describes a basic voxel shape such as a box or half box.
 * Voxel shapes are used by the mesh bulder to generate the mush.
 * It checks with the voxel shape to build the proper mesh.
 */
export interface VoxelShapeInterface {
 shapeHelper: ShapeHelperInterface;

 /**# Add To Chunk Mesh
  * ---
  * This is passed the current data from the chunk mesh builder.
  * In the function the voxel shape must be built and added to the chunk mesh.
  *
  * The chunk meshes positions
  * @param positions
  * The chunk mesh indices
  * @param indices
  * The chunk mesh full colors
  * @param fullColors
  * The chunk mesh linear space colors
  * @param linearColors
  * The chunk mesh uvs
  * @param uvs
  * The chunk mesh current indices count
  * @param startingIndices
  * ## Face
  * The current face that is being added to the mesh.
  * 0 -> top
  * 1 -> bottom
  * 2 -> west
  * 3 -> east
  * 4 -> north
  * 5 -> south
  * @param face
  * The calculated ambient occulsion values.
  * @param chunkAmbientOcculusion
  * The relative position in the chunk where the voxel is.
  * @param position
  *
  */
 addToChunkMesh(data: VoxelShapeAddData): VoxelShapeAddReturnData;
}
