import type { Position3Matrix } from "Meta/Util.types";
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
* @var position: Position3Matrix;
*/
export declare type VoxelShapeAddData = {
    positions: number[];
    normals: number[];
    indices: number[];
    RGBLightColors: number[];
    sunLightColors: number[];
    AOColors: number[];
    colors: number[];
    uvs: number[];
    face: number;
    indicieIndex: number;
    shapeStateTemplate: number[];
    shapeStateIndex: number;
    unTemplate: number[];
    uvTemplateIndex: number;
    colorTemplate: number[];
    colorIndex: number;
    lightTemplate: number[];
    lightIndex: number;
    aoTemplate: number[];
    aoIndex: number;
    position: Position3Matrix;
};
export declare type VoxelShapeAddReturnData = {
    newIndicieIndex: number;
    newUVTemplateIndex: number;
    newColorIndex: number;
    newlightIndex: number;
    newAOIndex: number;
};
/**# Voxel Shape
 * ---
 * Describes a basic voxel shape such as a box or half box.
 * Voxel shapes are used by the mesh bulder to generate the mush.
 * It checks with the voxel shape to build the proper mesh.
 */
export declare type VoxelShapeInterface = {
    id: string;
    /**# Add To Chunk Mesh
     * ---
     */
    addToChunkMesh(data: VoxelShapeAddData): VoxelShapeAddReturnData;
};
