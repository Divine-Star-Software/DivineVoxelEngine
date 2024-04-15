export class VoxParser {
  private dataView: DataView;
  private cursor: number = 0;
  voxels: { x: number; y: number; z: number; colorIndex: number }[] = [];
  palette: number[] = [];
  size: { x: number; y: number; z: number } | null = null;

  constructor(arrayBuffer: ArrayBuffer) {
    this.dataView = new DataView(arrayBuffer);
  }

  parse() {
    this.readHeader();
    this.readMainChunk();
    console.log("Voxel Data:", this.voxels);

    console.log(
      "Palette:",
      this.palette.map((color) => "#" + color.toString(16).padStart(8, "0"))
    );
    console.log("Model Size:", this.size);

    console.log(this);
  }

  getGPUData() {
    const voxelLookUpTable = this.createCubeAssistedLookUpTable();
    const voxelGrid = this.getVoxelGrid();
    return {
      voxelLookUpTable,
      voxelGrid,
    };
  }

  private readHeader() {
    const magic = this.readString(4);
    if (magic !== "VOX ") {
      throw new Error("Invalid VOX file.");
    }
    const version = this.readInt();
    console.log(`VOX version ${version}`);
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

    console.log(
      `Chunk: ${id}, content size: ${contentSize}, children size: ${childrenSize}`
    );

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
        console.log(`Unknown chunk type: ${id}`);
        break;
    }

    this.cursor = start + contentSize + childrenSize; // Move to the next chunk
  }

  private _voxelGrid: Uint32Array;

  getIndex(x: number, y: number, z: number) {
    const { x: dimX, y: dimY, z: dimZ } = this.size!;
    return x + y * dimX + z * dimX * dimY;
  }
  getVoxelGrid() {
    if (this._voxelGrid) return this._voxelGrid;
    if (!this.size) throw new Error("Model size not set.");
    const { x: dimX, y: dimY, z: dimZ } = this.size;
    const voxelGrid = new Uint32Array(dimX * dimY * dimZ);
    this.voxels.forEach(({ x, y, z }) => {
      voxelGrid[this.getIndex(x,y,z)] = 1; // Mark the voxel presence
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
    const maxCubes = new Uint8Array(voxelGrid.length);

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
      const color = ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
      this.palette.push(color);
    }
  }
}
