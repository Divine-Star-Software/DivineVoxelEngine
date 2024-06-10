import { Vector3Like } from "../../Math/Types/Math.types.js";
import { VoxelSpace, VoxelSpaceData } from "./VoxelSpace.js";

class RegionSpace extends VoxelSpace {
  chunkBounds = Vector3Like.Create();
  columnBounds = Vector3Like.Create();
  getChunkVolume() {
    return this.chunkBounds.x * this.chunkBounds.y * this.chunkBounds.z;
  }
  getColumnVolume() {
    return this.columnBounds.x * this.columnBounds.y * this.columnBounds.z;
  }
}
class ColumnSpace extends VoxelSpace {}
class ChunkSpace extends VoxelSpace {
  constructor(public regionSpace: RegionSpace, data: VoxelSpaceData) {
    super(data);
  }
  _regionPosition = Vector3Like.Create();
  getRegionPositonx() {
    this.getPosition();
    return VoxelSpace.spatialHash(this, this.regionSpace, this._bounds);
  }
  getRegionPositonxXYZ(x: number, y: number, z: number) {
    return this.setXYZ(x, y, z).getRegionPositonx();
  }
  getRegionIndex() {
    return VoxelSpace.getIndex(
      this._hashedPosition,
      this.regionSpace.chunkBounds
    );
  }
  getRegionIndexXYZ(x: number, y: number, z: number) {
    this.getRegionPositonxXYZ(x, y, z);
    return this.getRegionIndex();
  }
}

export class VoxelSpaces {
  region: RegionSpace;
  column: ColumnSpace;
  chunk: ChunkSpace;
  voxel: VoxelSpace;
  constructor() {
    this.region = new RegionSpace({
      getPosition(space) {
        return VoxelSpace.simpleCubeHash(space);
      },
      getIndex(space) {
        return -Infinity;
      },
      getPostionFromIndex(space, index) {
        return space._position;
      },
    });
    this.column = new ColumnSpace({
      getPosition(space) {
        return VoxelSpace.simpleCubeHash(space);
      },
      getIndex: (space) => {
        return VoxelSpace.getIndex(
          VoxelSpace.spatialHash(space, this.region, space._bounds),
          this.region.columnBounds
        );
      },
      getPostionFromIndex: (space, index) => {
        return Vector3Like.Multiply(
          VoxelSpace.getPositionFromIndex(
            space._position,
            this.region.columnBounds,
            index
          ),
          space._bounds
        );
      },
    });

    this.chunk = new ChunkSpace(this.region, {
      getPosition(space) {
        return VoxelSpace.simpleCubeHash(space);
      },
      getIndex: (space) => {
        const ry =
          (space._position.y >> this.region._boundsPower2.y) <<
          this.region._boundsPower2.y;
        const cy =
          (space._position.y >> space._boundsPower2.y) << space._boundsPower2.y;
        return (cy - ry) / space._bounds.y;
      },
      getPostionFromIndex: (space, index) => {
        return Vector3Like.Multiply(
          VoxelSpace.getPositionFromIndex(
            space._position,
            this.region.chunkBounds,
            index
          ),
          space._bounds
        );
      },
    });

    this.voxel = new VoxelSpace({
      getPosition: (space) => {
        VoxelSpace.spatialHash(space, this.chunk);
        space._position.x = space._hashedPosition.x;
        space._position.y = space._hashedPosition.y;
        space._position.z = space._hashedPosition.z;
        return space._position;
      },
      getIndex(space) {
        return VoxelSpace.getIndex(space._hashedPosition, space._bounds);
      },
      getPostionFromIndex: (space, index) => {
        return VoxelSpace.getPositionFromIndex(
          space._position,
          this.chunk._bounds,
          index
        );
      },
    });
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

    this.region.chunkBounds.x = this.region._bounds.x / this.chunk._bounds.x;
    this.region.chunkBounds.y = this.region._bounds.y / this.chunk._bounds.y;
    this.region.chunkBounds.z = this.region._bounds.z / this.chunk._bounds.z;
    this.region.columnBounds.x = this.region._bounds.x / this.column._bounds.x;
    this.region.columnBounds.y = this.region._bounds.y / this.column._bounds.y;
    this.region.columnBounds.z = this.region._bounds.z / this.column._bounds.z;
  }
}
