import { Vector3Like } from "@amodx/math";
import { VoxelSpace } from "./VoxelSpace.js";

class RegionSpace extends VoxelSpace {
  sectionBounds = Vector3Like.Create();
  sectorBounds = Vector3Like.Create();
  getSectionVolume() {
    return this.sectionBounds.x * this.sectionBounds.y * this.sectionBounds.z;
  }
  getSectorVolume() {
    return this.sectorBounds.x * this.sectorBounds.y * this.sectorBounds.z;
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
class SectorSpace extends VoxelSpace {
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
      this.region.sectorBounds
    );
  }
  getPositionFromIndex(index: number) {
    Vector3Like.MultiplyToRef(
      VoxelSpace.getPositionFromIndex(
        this._position,
        this.region.sectorBounds,
        index
      ),
      this.bounds,
      this._position
    );
    return this._position;
  }
}
class SectionSpace extends VoxelSpace {
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
    return VoxelSpace.getIndex(this._hashedPosition, this.region.sectionBounds);
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
        this.region.sectionBounds,
        index
      ),
      this.bounds,
      this._position
    );
    return this._position;
  }
}

class FinalVoxelSpace extends VoxelSpace {
  constructor(public section: SectionSpace) {
    super();
  }
  getPosition() {
    VoxelSpace.spatialHash(this, this.section);
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
      this.section.bounds,
      index
    );
  }
}

export class VoxelSpaces {
  region: RegionSpace;
  sector: SectorSpace;
  section: SectionSpace;
  voxel: FinalVoxelSpace;
  constructor() {
    this.region = new RegionSpace();
    this.sector = new SectorSpace(this.region);

    this.section = new SectionSpace(this.region);

    this.voxel = new FinalVoxelSpace(this.section);
  }

  setDimensions(data: {
    regions: Vector3Like;
    sectors: Vector3Like;
    sections: Vector3Like;
  }) {
    this.region.setCubeBounds(data.regions);
    this.sector.setCubeBounds(data.sectors);
    this.section.setCubeBounds(data.sections);
    this.voxel.setCubeBounds(data.sections);
    this.region.sectionBounds.x = this.region.bounds.x / this.section.bounds.x;
    this.region.sectionBounds.y = this.region.bounds.y / this.section.bounds.y;
    this.region.sectionBounds.z = this.region.bounds.z / this.section.bounds.z;
    this.region.sectorBounds.x = this.region.bounds.x / this.sector.bounds.x;
    this.region.sectorBounds.y = this.region.bounds.y / this.sector.bounds.y;
    this.region.sectorBounds.z = this.region.bounds.z / this.sector.bounds.z;
  }
}
