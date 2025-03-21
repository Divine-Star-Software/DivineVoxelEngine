/**
 * A read-only array of 2D coordinates (x, y) representing
 * the Moore neighborhood in 2D. This neighborhood includes
 * the cell itself (0,0) as well as the eight surrounding cells.
 *
 * Each tuple `[dx, dy]` is an offset from the center cell.
 *
 * Example offsets include:
 * - (0, 0)   - the cell itself
 * - (1, 0)   - one step to the right
 * - (0, 1)   - one step down
 * - (1, 1)   - diagonal down-right
 * - (-1, 0)  - one step to the left
 * - etc.
 */
export const MooreNeighborhood2D: Readonly<[number, number][]> = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, 0],
    [0, -1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  

  const array3d: [number, number, number][] = [];
  for (let y = -1; y < 2; y++) {
    for (const n of MooreNeighborhood2D) {
      array3d.push([n[0], y, n[1]]);
    }
  }
  
  /**
   * A read-only array of 3D coordinates (x, y, z) representing
   * the Moore neighborhood in 3D. This includes the cell itself
   * plus all adjacent cells within a 1-unit Chebyshev distance
   * in a 3D grid.
   *
   * Each tuple `[dx, dy, dz]` is an offset from the center cell.
   */
  export const MooreNeighborhood3D: Readonly<[number, number, number][]> = array3d;
  
  /**
   * A read-only array of 3D coordinates (x, y, z) representing
   * the six cardinal (orthogonal) directions in a 3D grid. These
   * do not include the center cell. Typically used for direct
   * neighbors up/down, left/right, forward/backward.
   *
   * Each tuple `[dx, dy, dz]` is an offset from the center cell.
   */
  export const CardinalNeighbors3D: Readonly<[number, number, number][]> = [
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, -1],
    [0, 0, 1],
  ];
    /**
   * A read-only array of 2D coordinates (x, y) representing
   * the six cardinal (orthogonal) directions in a 2D grid. These
   * do not include the center cell. Typically used for direct
   * neighbors up/down, left/right
   *
   * Each tuple `[dx, dy]` is an offset from the center cell.
   */
    export const CardinalNeighbors2D: Readonly<[number, number][]> = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
 
    ];
    