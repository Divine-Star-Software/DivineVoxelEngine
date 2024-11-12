import { DualContouring } from "./DualContouring";

export class VoxParser {
  private dataView: DataView;
  private cursor: number = 0;
  voxels: { x: number; y: number; z: number; colorIndex: number }[] = [];
  palette: { r: number; g: number; b: number; a: number }[] = [];
  size: { x: number; y: number; z: number } | null = null;

  constructor(arrayBuffer: ArrayBuffer) {
    this.dataView = new DataView(arrayBuffer);
  }

  parse() {
    this.readHeader();
    this.readMainChunk();
  }

  getGPUData() {
    const voxelGrid = this.getVoxelGrid();
    const voxelLookUp = this.createCubeAssistedLookUpTable();
    return {
      voxelGrid,
      voxelLookUp,
    };
  }

  private readHeader() {
    const magic = this.readString(4);
    if (magic !== "VOX ") {
      throw new Error("Invalid VOX file.");
    }
    const version = this.readInt();
  }

  private readString(length: number): string {
    let result = "";
    for (let i = 0; i < length; i++, this.cursor++) {
      result += String.fromCharCode(this.dataView.getUint8(this.cursor));
    }
    return result;
  }

  private readInt(): number {
    const result = this.dataView.getInt32(this.cursor, true);
    this.cursor += 4;
    return result;
  }

  private readMainChunk() {
    const id = this.readString(4);
    if (id !== "MAIN") {
      throw new Error("Missing MAIN chunk at the start of the file.");
    }
    const contentSize = this.readInt(); // Should be 0 for MAIN chunk
    const childrenSize = this.readInt(); // Total size of child chunks

    const end = this.cursor + childrenSize;
    while (this.cursor < end) {
      this.readChunk();
    }
  }

  private readChunk() {
    const id = this.readString(4);
    const contentSize = this.readInt();
    const childrenSize = this.readInt();

    const start = this.cursor;
    const end = start + contentSize;

    switch (id) {
      case "SIZE":
        this.size = this.readSize();
        break;
      case "XYZI":
        this.readXYZI(end);
        break;
      case "RGBA":
        this.readRGBA(end);
        break;
      default:
        console.warn(`Unknown chunk type: ${id}`);
        break;
    }

    this.cursor = start + contentSize + childrenSize; // Move to the next chunk
  }

  getIndex(x: number, y: number, z: number) {
    const { x: dimX, y: dimY, z: dimZ } = this.size!;
    return x + y * dimX + z * dimX * dimY;
  }
  private _voxelGrid: Uint32Array;
  getVoxelGrid() {
    if (this._voxelGrid) return this._voxelGrid;
    if (!this.size) throw new Error("Model size not set.");
    const { x: dimX, y: dimY, z: dimZ } = this.size;
    const voxelGrid = new Uint32Array(dimX * dimY * dimZ);
    this.voxels.forEach(({ x, y, z, colorIndex }) => {
      voxelGrid[this.getIndex(x, y, z)] = colorIndex; // Mark the voxel presence
    });
    this._voxelGrid = voxelGrid;
    return voxelGrid;
  }

  private createCubeAssistedLookUpTable() {
    if (!this.size) throw new Error("Model size not set.");

    const { x: dimX, y: dimY, z: dimZ } = this.size;
    const voxelGrid = this.getVoxelGrid();
    // Initialize the voxel presence grid and summed area table

    const summedAreaTable = new Uint32Array(
      (dimX + 1) * (dimY + 1) * (dimZ + 1)
    );

    // Create the summed area table
    for (let z = 0; z <= dimZ; z++) {
      for (let y = 0; y <= dimY; y++) {
        for (let x = 0; x <= dimX; x++) {
          const idx = x + y * (dimX + 1) + z * (dimX + 1) * (dimY + 1);
          summedAreaTable[idx] =
            (x > 0 ? summedAreaTable[idx - 1] : 0) +
            (y > 0 ? summedAreaTable[idx - (dimX + 1)] : 0) +
            (z > 0 ? summedAreaTable[idx - (dimX + 1) * (dimY + 1)] : 0) -
            (x > 0 && y > 0 ? summedAreaTable[idx - 1 - (dimX + 1)] : 0) -
            (y > 0 && z > 0
              ? summedAreaTable[idx - (dimX + 1) - (dimX + 1) * (dimY + 1)]
              : 0) -
            (x > 0 && z > 0
              ? summedAreaTable[idx - 1 - (dimX + 1) * (dimY + 1)]
              : 0) +
            (x > 0 && y > 0 && z > 0
              ? summedAreaTable[idx - 1 - (dimX + 1) - (dimX + 1) * (dimY + 1)]
              : 0) +
            (x <= 0 || y <= 0 || z <= 0
              ? 0
              : voxelGrid[x - 1 + (y - 1) * dimX + (z - 1) * dimX * dimY]);
        }
      }
    }

    // Buffer for storing maximum cube sizes at each voxel
    const maxCubes = new Uint32Array(voxelGrid.length);

    // Compute maximum cube size for each voxel using binary search
    for (let z = 0; z < dimZ; z++) {
      for (let y = 0; y < dimY; y++) {
        for (let x = 0; x < dimX; x++) {
          let low = 0,
            high = Math.min(dimX - x, dimY - y, dimZ - z);
          const baseIdx = x + y * dimX + z * dimX * dimY;

          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const volume = this.summedVolume(
              x,
              y,
              z,
              mid,
              summedAreaTable,
              dimX,
              dimY
            );
            if (volume === 0) {
              low = mid + 1; // Cube of size 'mid' is empty, try larger
            } else {
              high = mid - 1; // Cube of size 'mid' intersects voxels, try smaller
            }
          }
          if (high < 0) high = 255;
          maxCubes[baseIdx] = high;
        }
      }
    }

    return maxCubes;
  }

  private summedVolume(
    x: number,
    y: number,
    z: number,
    size: number,
    table: Uint32Array,
    dimX: number,
    dimY: number
  ): number {
    const idx = (x: number, y: number, z: number) =>
      x + y * (dimX + 1) + z * (dimX + 1) * (dimY + 1);
    x++;
    y++;
    z++; // Adjust for 1-based index in SAT
    return (
      table[idx(x + size, y + size, z + size)] -
      table[idx(x - 1, y + size, z + size)] -
      table[idx(x + size, y - 1, z + size)] -
      table[idx(x + size, y + size, z - 1)] +
      table[idx(x - 1, y - 1, z + size)] +
      table[idx(x - 1, y + size, z - 1)] +
      table[idx(x + size, y - 1, z - 1)] -
      table[idx(x - 1, y - 1, z - 1)]
    );
  }

  private readSize(): { x: number; y: number; z: number } {
    const x = this.readInt();
    const z = this.readInt();
    const y = this.readInt();
    return { x, y, z };
  }

  private readXYZI(end: number) {
    const numVoxels = this.readInt();
    for (let i = 0; i < numVoxels; i++) {
      const x = this.dataView.getUint8(this.cursor++);
      const z = this.dataView.getUint8(this.cursor++);
      const y = this.dataView.getUint8(this.cursor++);
      const colorIndex = this.dataView.getUint8(this.cursor++);
      this.voxels.push({ x, y, z, colorIndex });
    }
  }

  private readRGBA(end: number) {
    for (let i = 0; i < 256; i++) {
      const r = this.dataView.getUint8(this.cursor++);
      const g = this.dataView.getUint8(this.cursor++);
      const b = this.dataView.getUint8(this.cursor++);
      const a = this.dataView.getUint8(this.cursor++);
      this.palette.push({
        r,
        g,
        b,
        a,
      });
    }
  }

  _sdfGrid: Float32Array | null = null;
  getSDFGrid() {
    if (this._sdfGrid) return this._sdfGrid;
    if (!this.size) throw new Error("Model size not set.");
    const { x: dimX, y: dimY, z: dimZ } = this.size!;
    const voxelGrid = this.getVoxelGrid();
    const sdfGrid = new Float32Array(dimX * dimY * dimZ);

    // Initialize the grid: Inside surface set to -infinity, outside to +infinity
    const INF = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < sdfGrid.length; i++) {
      sdfGrid[i] = voxelGrid[i] ? 0 : INF;
    }

    // Perform the first pass (forward)
    for (let z = 0; z < dimZ; z++) {
      for (let y = 0; y < dimY; y++) {
        for (let x = 0; x < dimX; x++) {
          const idx = this.getIndex(x, y, z);
          if (x > 0)
            sdfGrid[idx] = Math.min(sdfGrid[idx], sdfGrid[idx - 1] + 1);
          if (y > 0)
            sdfGrid[idx] = Math.min(sdfGrid[idx], sdfGrid[idx - dimX] + 1);
          if (z > 0)
            sdfGrid[idx] = Math.min(
              sdfGrid[idx],
              sdfGrid[idx - dimX * dimY] + 1
            );
        }
      }
    }

    // Perform the second pass (backward)
    for (let z = dimZ - 1; z >= 0; z--) {
      for (let y = dimY - 1; y >= 0; y--) {
        for (let x = dimX - 1; x >= 0; x--) {
          const idx = x + y * dimX + z * dimX * dimY;
          if (x < dimX - 1)
            sdfGrid[idx] = Math.min(sdfGrid[idx], sdfGrid[idx + 1] + 1);
          if (y < dimY - 1)
            sdfGrid[idx] = Math.min(sdfGrid[idx], sdfGrid[idx + dimX] + 1);
          if (z < dimZ - 1)
            sdfGrid[idx] = Math.min(
              sdfGrid[idx],
              sdfGrid[idx + dimX * dimY] + 1
            );
        }
      }
    }

    // Convert grid values from "distance to nearest empty voxel" to actual SDF
    for (let i = 0; i < sdfGrid.length; i++) {
      if (voxelGrid[i] === 0) {
        // Outside voxels have positive distance
        sdfGrid[i] = Math.sqrt(sdfGrid[i]);
      } else {
        // Inside voxels have negative distance (invert and subtract 1 to include the boundary voxel)
        sdfGrid[i] = -Math.sqrt(sdfGrid[i]);
      }
    }

    this._sdfGrid = sdfGrid;

    //  this.applyGaussianBlur(sdfGrid, this.size.x, this.size.y, this.size.z);
    //  this.applyGaussianBlur(sdfGrid, this.size.x, this.size.y, this.size.z);

    return sdfGrid;
  }
  private applyMedianFilter(
    sdfGrid: Float32Array,
    width: number,
    height: number,
    depth: number
  ) {
    const newGrid = new Float32Array(sdfGrid.length);

    for (let z = 1; z < depth - 1; z++) {
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const neighbors = [];
          // Collect the values of the 3x3x3 neighborhood
          for (let dz = -1; dz <= 1; dz++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                const nx = x + dx,
                  ny = y + dy,
                  nz = z + dz;
                neighbors.push(sdfGrid[this.getIndex(nx, ny, nz)]);
              }
            }
          }
          // Sort and find the median
          neighbors.sort((a, b) => a - b);
          const midIndex = Math.floor(neighbors.length / 2);
          newGrid[this.getIndex(x, y, z)] = neighbors[midIndex];
        }
      }
    }

    // Copy the new, smoothed values back to the original grid
    sdfGrid.set(newGrid);
  }
  private applyGaussianBlur(
    sdfGrid: Float32Array,
    width: number,
    height: number,
    depth: number
  ) {
    // Example of a larger 5x5x5 kernel with more blur (values are illustrative)
    const kernelSize = 5;
    const kernelHalfSize = Math.floor(kernelSize / 2);
    const kernel = new Float32Array(kernelSize * kernelSize * kernelSize);
    const sigma = 10; // Standard deviation for Gaussian distribution
    let sum = 0;

    // Generate Gaussian kernel
    for (let z = -kernelHalfSize; z <= kernelHalfSize; z++) {
      for (let y = -kernelHalfSize; y <= kernelHalfSize; y++) {
        for (let x = -kernelHalfSize; x <= kernelHalfSize; x++) {
          const idx =
            (z + kernelHalfSize) * kernelSize * kernelSize +
            (y + kernelHalfSize) * kernelSize +
            (x + kernelHalfSize);
          const exp = Math.exp(-(x * x + y * y + z * z) / (2 * sigma * sigma));
          kernel[idx] = exp;
          sum += exp;
        }
      }
    }

    // Normalize the kernel
    for (let i = 0; i < kernel.length; i++) {
      kernel[i] /= sum;
    }

    const newGrid = new Float32Array(sdfGrid.length);

    for (let z = 0; z < depth; z++) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let kernelSum = 0,
            valueSum = 0;
          for (let dz = -kernelHalfSize; dz <= kernelHalfSize; dz++) {
            for (let dy = -kernelHalfSize; dy <= kernelHalfSize; dy++) {
              for (let dx = -kernelHalfSize; dx <= kernelHalfSize; dx++) {
                const nx = x + dx,
                  ny = y + dy,
                  nz = z + dz;
                if (
                  nx >= 0 &&
                  nx < width &&
                  ny >= 0 &&
                  ny < height &&
                  nz >= 0 &&
                  nz < depth
                ) {
                  const idx = this.getIndex(nx, ny, nz);
                  const kernelIdx =
                    (dz + kernelHalfSize) * kernelSize * kernelSize +
                    (dy + kernelHalfSize) * kernelSize +
                    (dx + kernelHalfSize);
                  valueSum += sdfGrid[idx] * kernel[kernelIdx];
                  kernelSum += kernel[kernelIdx];
                }
              }
            }
          }

          const idx = this.getIndex(x, y, z);
          newGrid[idx] = kernelSum > 0 ? valueSum / kernelSum : sdfGrid[idx];
        }
      }
    }

    sdfGrid.set(newGrid); // Copy the blurred values back to the original grid
  }
  getDualContouringMesher() {
    const grid = this.getSDFGrid();
    return new DualContouring(grid, this.size!);
  }
}
