import { Flat3DArray } from "../Util/Flat3DArray.js";
import { HeightMapArray } from "../Chunk/HeightMapArray.js";
const __maxChunkYSize = 128;
const maxBounds = Object.freeze({
    minZ: -32_000_000,
    maxZ: 32_000_000,
    minX: -32_000_000,
    maxX: 32_000_000,
    minY: -32_000_000,
    maxY: 32_000_000,
});
const maxWorldXZSize = 32_000_000;
/**# World Bounds
 * ---
 * This holds the data for the size of chunks, regions, and the world.
 * It also handles the calcuation of chunks, regions, and relative voxel positions.
 * A refernce is held to all classes that need it.
 */
export const WorldBounds = {
    bounds: {
        MinZ: -Infinity,
        MaxZ: Infinity,
        MinX: -Infinity,
        MaxX: Infinity,
        MinY: 0,
        MaxY: 258,
    },
    _hashMask(n) {
        if (n >= 0) {
            return 2 * n;
        }
        else {
            return -2 * n - 1;
        }
    },
    hash(x, y, z) {
        x = this._hashMask(x);
        y = this._hashMask(y);
        z = this._hashMask(z);
        const max = Math.max(x, y, z);
        let hash = max ** 3 + 2 * max * z + z;
        if (max == z) {
            hash += Math.max(x, y) ** 2;
        }
        if (y >= x) {
            hash += x + y;
        }
        else {
            hash += y;
        }
        return hash;
    },
    chunkXPow2: 4,
    chunkYPow2: 7,
    chunkZPow2: 4,
    chunkXSize: 16,
    chunkYSize: 128,
    chunkZSize: 16,
    chunkTotalVoxels: 16 * 128 * 16,
    chunkArea: 16 * 16,
    regionColumnWidth: 32,
    regionXPow2: 9,
    regionYPow2: 9,
    regionZPow2: 9,
    regionXSize: 512,
    regionYSize: 512,
    regionZSize: 512,
    __regionPosition: { x: 0, y: 0, z: 0 },
    __worldColumnPosition: { x: 0, z: 0, y: 0 },
    __chunkPosition: { x: 0, y: 0, z: 0 },
    __voxelPosition: { x: 0, y: 0, z: 0 },
    __columnPosition: { x: 0, z: 0, y: 0 },
    syncBoundsWithArrays() {
        Flat3DArray.setBounds(this.chunkXSize, this.chunkYSize, this.chunkZSize);
        HeightMapArray.setBounds(this.chunkXSize, 2, this.chunkZSize);
    },
    setWorldBounds(minX, maxX, minZ, maxZ, minY, maxY) {
        this.bounds.MinX = minX;
        this.bounds.MaxX = maxX;
        this.bounds.MinX = minZ;
        this.bounds.MaxZ = maxZ;
        this.bounds.MinY = minY;
        this.bounds.MaxY = maxY;
    },
    isPositonOutsideOfBounds(x, y, z) {
        if (y < this.bounds.MinY || y > this.bounds.MaxY)
            return true;
        if (x < this.bounds.MinX || x > this.bounds.MaxX)
            return true;
        if (z < this.bounds.MinZ || z > this.bounds.MaxZ)
            return true;
        return false;
    },
    isPositonInBounds(x, y, z) {
        if (y >= this.bounds.MinY && y <= this.bounds.MaxY)
            return true;
        if (x >= this.bounds.MinX && x <= this.bounds.MaxX)
            return true;
        if (z >= this.bounds.MinZ && z <= this.bounds.MaxZ)
            return true;
        return false;
    },
    setChunkBounds(pow2X, pow2Y, pow2Z) {
        this.chunkXPow2 = pow2X;
        this.chunkXSize = 2 ** pow2X;
        this.chunkYPow2 = pow2Y;
        this.chunkYSize = 2 ** pow2Y;
        if (this.chunkYSize > __maxChunkYSize) {
            throw new Error(`Chunk Y size is bigger then the limit. Should be equal to or less than ${__maxChunkYSize}.`);
        }
        this.chunkZPow2 = pow2Z;
        this.chunkZSize = 2 ** pow2Z;
        this.chunkTotalVoxels = this.chunkXSize * this.chunkYSize * this.chunkZSize;
        this.chunkArea = this.chunkXSize * this.chunkZSize;
        this.regionColumnWidth = this.regionXSize / this.chunkXSize;
    },
    setRegionBounds(pow2X, pow2Y, pow2Z) {
        this.regionXPow2 = pow2X;
        this.regionXSize = 2 ** pow2X;
        this.regionYPow2 = pow2Y;
        this.regionYSize = 2 ** pow2Y;
        this.regionZPow2 = pow2Z;
        this.regionZSize = 2 ** pow2Z;
        this.regionColumnWidth = this.regionXSize / this.chunkXSize;
    },
    getRegionPosition(x, y, z) {
        this.__regionPosition.x = (x >> this.regionXPow2) << this.regionXPow2;
        this.__regionPosition.y = (y >> this.regionYPow2) << this.regionYPow2;
        this.__regionPosition.z = (z >> this.regionZPow2) << this.regionZPow2;
        return this.__regionPosition;
    },
    getChunkPosition(x, y, z) {
        this.__chunkPosition.x = (x >> this.chunkXPow2) << this.chunkXPow2;
        this.__chunkPosition.y = (y >> this.chunkYPow2) << this.chunkYPow2;
        this.__chunkPosition.z = (z >> this.chunkZPow2) << this.chunkZPow2;
        return this.__chunkPosition;
    },
    getChunkKey(chunkPOS) {
        return `${chunkPOS.x}-${chunkPOS.z}-${chunkPOS.y}`;
    },
    getChunkKeyFromPosition(x, y, z) {
        const chunkPOS = this.getChunkPosition(x, y, z);
        return `${chunkPOS.x}-${chunkPOS.z}-${chunkPOS.y}`;
    },
    getRegionKey(regionPOS) {
        return `${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`;
    },
    getRegionKeyFromPosition(x, y, z) {
        const regionPOS = this.getRegionPosition(x, y, z);
        return `${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`;
    },
    /**# Get Voxel Position From Chunk Position
     * ---
     * Returns the x/y/z index of the voxel in the chunk.
     * Used to find actual index in the chunk array.
     */
    getVoxelPositionFromChunkPosition(x, y, z, chunkPOS) {
        this.__voxelPosition.x = Math.abs(x - chunkPOS.x);
        if (x < 0) {
            if (x == chunkPOS.x + ((1 << this.chunkXPow2) - 1)) {
                this.__voxelPosition.x = (1 << this.chunkXPow2) - 1;
            }
        }
        this.__voxelPosition.z = Math.abs(z - chunkPOS.z);
        if (z < 0) {
            if (z == chunkPOS.z + ((1 << this.chunkZPow2) - 1)) {
                this.__voxelPosition.z = (1 << this.chunkZPow2) - 1;
            }
        }
        this.__voxelPosition.y = Math.abs(y - chunkPOS.y);
        if (y < 0) {
            if (y == chunkPOS.y + ((1 << this.chunkYPow2) - 1)) {
                this.__voxelPosition.y = (1 << this.chunkYPow2) - 1;
            }
        }
        return this.__voxelPosition;
    },
    getRichPositionKey(x, y, z) {
        const POS = this.getVoxelPosition(x, y, z);
        return `${POS.y}-${POS.x}-${POS.z}`;
    },
    getVoxelPosition(x, y, z) {
        return this.getVoxelPositionFromChunkPosition(x, y, z, this.getChunkPosition(x, y, z));
    },
    /*
    getIndex(x: number, y: number, z: number) {
       return x + y * this.bounds.x + z * this.bounds.z * this.bounds.y;
      },
   */
    _columnIndexPosition: { x: 0, y: 0, z: 0 },
    getColumnIndex(x, z, y) {
        const regionPOS = this.getRegionPosition(x, y, z);
        const columnPostion = this.getColumnPosition(x, z, y);
        this._columnIndexPosition.x = Math.abs(columnPostion.x - regionPOS.x);
        if (columnPostion.x < 0) {
            if (columnPostion.x == regionPOS.x + ((1 << this.chunkXPow2) - 1)) {
                this._columnIndexPosition.x = (1 << this.chunkXPow2) - 1;
            }
        }
        this._columnIndexPosition.x /= this.chunkXSize;
        this._columnIndexPosition.z = Math.abs(columnPostion.z - regionPOS.z);
        if (columnPostion.z < 0) {
            if (columnPostion.z == regionPOS.z + ((1 << this.chunkZPow2) - 1)) {
                this._columnIndexPosition.z = (1 << this.chunkZPow2) - 1;
            }
        }
        this._columnIndexPosition.z /= this.chunkZSize;
        return (this.regionColumnWidth * this._columnIndexPosition.x +
            this._columnIndexPosition.z);
    },
    getChunkColumnIndex(y) {
        const ry = (y >> this.regionYPow2) << this.regionYPow2;
        const cy = (y >> this.chunkYPow2) << this.chunkYPow2;
        return (cy - ry) / this.chunkYSize;
    },
    getColumnKey(x, z, y = 0) {
        const column = this.getColumnPosition(x, z, y);
        return `${column.x}-${column.z}-${column.y}`;
    },
    getColumnPosition(x, z, y = 0) {
        const chunkPOS = this.getChunkPosition(x, y, z);
        const regionPOS = this.getRegionPosition(x, y, z);
        this.__worldColumnPosition.x = chunkPOS.x;
        this.__worldColumnPosition.z = chunkPOS.z;
        this.__worldColumnPosition.y = regionPOS.y;
        return this.__worldColumnPosition;
    },
};
