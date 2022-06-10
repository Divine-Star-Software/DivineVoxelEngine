/**# Divine Voxel Engine Math
 * ---
 * Can be used in any thread that needs it.
 * Has functions for collision detection, finding voxels in a direction, and path finding.
 */
export declare const DVEM: {
    /** # Visit All
     * ---
     * Given a starting point and an end point it will visit all voxels that are between them.
     * @param startPoint
     * @param endPoint
     * @param visitor
     * @returns an array of numbers with a stride of 3 for positions
     */
    visitAll: (startPoint: import("../Meta/Util.types.js").Position3Matrix, endPoint: import("../Meta/Util.types.js").Position3Matrix, visitor?: (x: number, y: number, z: number) => boolean) => number[];
};
export declare type DivineVoxelEngineMath = typeof DVEM;
