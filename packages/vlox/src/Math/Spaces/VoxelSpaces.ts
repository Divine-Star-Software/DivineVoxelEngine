import { Vector3Like } from "@amodx/math";
import { VoxelSpace } from "./VoxelSpace.js";

class RegionSpace extends VoxelSpace {
  chunkBounds = Vector3Like.Create();
  columnBounds = Vector3Like.Create();
  getChunkVolume() {
    return this.chunkBounds.x * this.chunkBounds.y * this.chunkBounds.z;
  }
  getColumnVolume() {
    return this.columnBounds.x * this.columnBounds.y * this.columnBounds.z;
  }
  getPosition() {
    return VoxelSpace.simpleCubeHash(this);
  }
  getIndex() {
    return -Infinity;
  }
  getPositionFromIndex(index: number) {
    return this._position;
  }
}
class ColumnSpace extends VoxelSpace {
  constructor(public region: RegionSpace) {
    super();
  }
  getPosition() {
    return VoxelSpace.simpleCubeHash(this);
  }
  getIndex() {
    return VoxelSpace.getIndex(
      Vector3Like.DivideInPlace(
        Vector3Like.SubtractInPlace(
          VoxelSpace.simpleCubeHash(this),
          this.region._position
        ),
        this.bounds
      ),
      this.region.columnBounds
    );
  }
  getPositionFromIndex(index: number) {
    Vector3Like.MultiplyToRef(
      VoxelSpace.getPositionFromIndex(
        this._position,
        this.region.columnBounds,
        index
      ),
      this.bounds,
      this._position
    );
    return this._position;
  }
}
class ChunkSpace extends VoxelSpace {
  constructor(public region: RegionSpace) {
    super();
  }
  _regionPosition = Vector3Like.Create();
  getRegionPositonx() {
    this.getPosition();
    return VoxelSpace.spatialHash(this, this.region, this.bounds);
  }
  getRegionPositonxXYZ(x: number, y: number, z: number) {
    return this.setXYZ(x, y, z).getRegionPositonx();
  }
  getRegionIndex() {
    return VoxelSpace.getIndex(this._hashedPosition, this.region.chunkBounds);
  }
  getRegionIndexXYZ(x: number, y: number, z: number) {
    this.getRegionPositonxXYZ(x, y, z);
    return this.getRegionIndex();
  }
  getPosition() {
    return VoxelSpace.simpleCubeHash(this);
  }
  getIndex() {
    const ry =
      (this._position.y >> this.region.boundsPower2.y) <<
      this.region.boundsPower2.y;
    const cy =
      (this._position.y >> this.boundsPower2.y) << this.boundsPower2.y;
    return (cy - ry) / this.bounds.y;
  }
  getPositionFromIndex(index: number) {
    Vector3Like.MultiplyToRef(
      VoxelSpace.getPositionFromIndex(
        this._position,
        this.region.chunkBounds,
        index
      ),
      this.bounds,
      this._position
    );
    return this._position;
  }
}

class FinalVoxelSpace extends VoxelSpace {
  constructor(public chunk: ChunkSpace) {
    super();
  }
  getPosition() {
    VoxelSpace.spatialHash(this, this.chunk);
    this._position.x = this._hashedPosition.x;
    this._position.y = this._hashedPosition.y;
    this._position.z = this._hashedPosition.z;
    return this._position;
  }
  getIndex() {
    return VoxelSpace.getIndex(this._hashedPosition, this.bounds);
  }
  getPositionFromIndex(index: number) {
    return VoxelSpace.getPositionFromIndex(
      this._position,
      this.chunk.bounds,
      index
    );
  }
}

export class VoxelSpaces {
  region: RegionSpace;
  column: ColumnSpace;
  chunk: ChunkSpace;
  voxel: FinalVoxelSpace;
  constructor() {
    this.region = new RegionSpace();
    this.column = new ColumnSpace(this.region);

    this.chunk = new ChunkSpace(this.region);

    this.voxel = new FinalVoxelSpace(this.chunk);
  }

  setDimensions(data: {
    regions: Vector3Like;
    columns: Vector3Like;
    chunks: Vector3Like;
  }) {
    this.region.setCubeBounds(data.regions);
    this.column.setCubeBounds(data.columns);
    this.chunk.setCubeBounds(data.chunks);
    this.voxel.setCubeBounds(data.chunks);
    this.region.chunkBounds.x = this.region.bounds.x / this.chunk.bounds.x;
    this.region.chunkBounds.y = this.region.bounds.y / this.chunk.bounds.y;
    this.region.chunkBounds.z = this.region.bounds.z / this.chunk.bounds.z;
    this.region.columnBounds.x = this.region.bounds.x / this.column.bounds.x;
    this.region.columnBounds.y = this.region.bounds.y / this.column.bounds.y;
    this.region.columnBounds.z = this.region.bounds.z / this.column.bounds.z;
  }
}
