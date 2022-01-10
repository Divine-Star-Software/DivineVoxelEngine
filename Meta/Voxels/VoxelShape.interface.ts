import { PositionMatrix } from "Meta/Util.types";

/**# Voxel Shape
 * ---
 * Describes a basic voxel shape such as a box or half box. 
 * Voxel shapes are used by the mesh bulder to generate the mush. 
 * It checks with the voxel shape to build the proper mesh. 
 */
export interface VoxelShape {
    /**# Face Count
     * ---
     * How many faces the shape has. 
     * This is used to properly read the UV data.
     */
    faceCount : number;


    /**# Add To Chunk Mesh
     * ---
     * This is passed the current data from the chunk mesh builder.
     * In the function the voxel shape must be built and added to the chunk mesh.
     * 
     * @param postions 
     * @param indices 
     * @param colors 
     * @param uvs 
     * ## Exposed Faces
     *  An array of booleans that describe which facs are visible.
     * 0 -> top
     * 1 -> bottom
     * 2 -> west
     * 3 -> east
     * 4 -> north
     * 5 -> south
     * @param exposedFaces 
     * @param position 
     * @param startingIndices 
     */
    addToChunkMesh(
    postions: number[],
    indices: number[],
    colors: number[],
    uvs: number[],
    exposedFaces: boolean[],
    position: PositionMatrix,
    startingIndices: number,
    ) : void;

}