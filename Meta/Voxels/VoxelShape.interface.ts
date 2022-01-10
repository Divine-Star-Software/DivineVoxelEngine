import { PositionMatrix } from "Meta/Util.types";

/**# Voxel Shape
 * ---
 * Describes a basic voxel shape such as a box or half box. 
 * Voxel shapes are used by the mesh bulder to generate the mush. 
 * It checks with the voxel shape to build the proper mesh. 
 */
export interface VoxelShape {

    /**# Add To Chunk Mesh
     * ---
     * This is passed the current data from the chunk mesh builder.
     * In the function the voxel shape must be built and added to the chunk mesh.
     * 
     * The chunk meshes positions
     * @param postions 
     * The chunk mesh indices
     * @param indices 
     * The chunk mesh colors
     * @param colors 
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
     * @returns The new starting indicie
     */
    addToChunkMesh(
    postions: number[],
    indices: number[],
    colors: number[],
    uvs: number[],
    startingIndices: number,
    face: number,
    chunkAmbientOcculusion : number[],
    position: PositionMatrix,


    ) : number;

}