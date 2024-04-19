export class DualContouring {
  private sdfGrid: Float32Array;
  private size: { x: number; y: number; z: number };
  private hermiteData: Map<string, { point: number[]; normal: number[] }> =
    new Map();

  constructor(
    sdfGrid: Float32Array,
    size: { x: number; y: number; z: number }
  ) {
    this.sdfGrid = sdfGrid;
    this.size = size;
  }

  private getIndex(x: number, y: number, z: number): number {
    return x + y * this.size.x + z * this.size.x * this.size.y;
  }

  private getSDF(x: number, y: number, z: number): number {
    if (
      x < 0 ||
      y < 0 ||
      z < 0 ||
      x >= this.size.x ||
      y >= this.size.y ||
      z >= this.size.z
    ) {
      return Infinity;
    }
    return this.sdfGrid[this.getIndex(x, y, z)];
  }

  public generateMesh() {
    const vertices: number[][] = [];
    const vertexIndices: Map<string, number> = new Map(); // Map cell identifier to vertex index
    const indices: number[][] = [];

    for (let z = 0; z < this.size.z - 1; z++) {
      for (let y = 0; y < this.size.y - 1; y++) {
        for (let x = 0; x < this.size.x - 1; x++) {
          this.processCell(x, y, z);
        }
      }
    }
    console.log("GENEATED MESH",this.hermiteData,this.sdfGrid);
    for (let z = 0; z < this.size.z - 1; z++) {
      for (let y = 0; y < this.size.y - 1; y++) {
        for (let x = 0; x < this.size.x - 1; x++) {
            const cellKey = `cell-${x}-${y}-${z}`;

          if (this.hermiteData.has(cellKey)) {
            console.log("hast cell")
            const vertexPosition = this.solveQEF(x, y, z!); // Assume solveQEF returns the optimal vertex position
            const vertexIndex = vertices.length; // Index of this new vertex
            vertices.push(vertexPosition);
            vertexIndices.set(cellKey, vertexIndex);
          }
        }
      }
    }

    for (let z = 0; z < this.size.z - 1; z++) {
      for (let y = 0; y < this.size.y - 1; y++) {
        for (let x = 0; x < this.size.x - 1; x++) {
          // Assuming each cell will generate a triangle with its immediate neighbors
          const currentKey = `cell-${x}-${y}-${z}`;
          const rightKey = `cell-${x + 1}-${y}-${z}`;
          const upKey = `cell-${x}-${y + 1}-${z}`;
          const forwardKey = `cell-${x}-${y}-${z + 1}`;

          if (
            vertexIndices.has(currentKey) &&
            vertexIndices.has(rightKey) &&
            vertexIndices.has(upKey)
          ) {
            indices.push([
              vertexIndices.get(currentKey)!,
              vertexIndices.get(rightKey)!,
              vertexIndices.get(upKey)!,
            ]);
          }

          // Add more triangles as needed depending on your cell configuration and connectivity rules
        }
      }
    }

    return { vertices, indices };
  }

  private processCell(x: number, y: number, z: number) {
    this.checkEdge(x, y, z, x + 1, y, z);
    this.checkEdge(x, y, z, x, y + 1, z);
    this.checkEdge(x, y, z, x, y, z + 1);
  }

  private checkEdge(
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number
  ) {
    const sdf1 = this.getSDF(x1, y1, z1);
    const sdf2 = this.getSDF(x2, y2, z2);
    if (sdf1 * sdf2 < 0) {
      const t = sdf1 / (sdf1 - sdf2);
      const point = [
        x1 + t * (x2 - x1),
        y1 + t * (y2 - y1),
        z1 + t * (z2 - z1),
      ];
      const normal = this.calculateNormal(point[0], point[1], point[2]);
      const key = `cell-${x1}-${y1}-${z1}`;
      this.hermiteData.set(key, { point, normal });
    }
  }

  private calculateNormal(x: number, y: number, z: number): number[] {
    const dx = (this.getSDF(x + 1, y, z) - this.getSDF(x - 1, y, z)) / 2;
    const dy = (this.getSDF(x, y + 1, z) - this.getSDF(x, y - 1, z)) / 2;
    const dz = (this.getSDF(x, y, z + 1) - this.getSDF(x, y, z - 1)) / 2;
    return [dx, dy, dz];
  }

  private solveQEF(x: number, y: number, z: number): number[] {
    // Accumulate the normals and points from the hermite data for all 12 edges of a cell
    let accumulatedNormals: number[] = [0, 0, 0];
    let accumulatedPoints: number[] = [0, 0, 0];
    let counter = 0;

    // Calculate the centroid of the points
    for (let dx = 0; dx <= 1; dx++) {
      for (let dy = 0; dy <= 1; dy++) {
        for (let dz = 0; dz <= 1; dz++) {
          const key = `${x + dx},${y + dy},${z + dz}-${x + dx - 1},${y + dy},${
            z + dz
          }`;
          if (this.hermiteData.has(key)) {
            const data = this.hermiteData.get(key);
            accumulatedPoints = accumulatedPoints.map(
              (val, idx) => val + data!.point[idx]
            );
            accumulatedNormals = accumulatedNormals.map(
              (val, idx) => val + data!.normal[idx]
            );
            counter++;
          }
        }
      }
    }

    if (counter > 0) {
      const averagePoint = accumulatedPoints.map((val) => val / counter);
      return averagePoint;
    }

    return [x + 0.5, y + 0.5, z + 0.5]; // Return the center if no intersections
  }
}
