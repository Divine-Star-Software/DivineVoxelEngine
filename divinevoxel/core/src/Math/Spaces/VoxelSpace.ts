import { Vector3Like } from "@amodx/math";
import { Flat3DIndex } from "@amodx/math/Volumes";
import { LocationData } from "./VoxelSpaces.types";

const alignToPowerOf2 = (value: number, powerOf2: number) => {
  const mask = (1 << powerOf2) - 1;
  return value & ~mask;
};

export interface VoxelSpaceData {
  getPosition: (space: VoxelSpace) => Vector3Like;
  getIndex: (space: VoxelSpace) => number;
  getPostionFromIndex: (space: VoxelSpace, index: number) => Vector3Like;
}

//Objects
export class VoxelSpace {
  static index = Flat3DIndex.GetXZYOrder();
  static simpleCubeHash(space: VoxelSpace) {
    space._position.x = alignToPowerOf2(
      space._position.x,
      space._boundsPower2.x
    );
    space._position.y = alignToPowerOf2(
      space._position.y,
      space._boundsPower2.y
    );
    space._position.z = alignToPowerOf2(
      space._position.z,
      space._boundsPower2.z
    );
    return space._position;
  }

  static getPositionFromIndex(
    position: Vector3Like,
    bounds: Vector3Like,
    index: number
  ) {
    this.index.setBounds(bounds.x, bounds.y, bounds.z);
    const newPosition = this.index.getXYZ(index);
    position.x = newPosition[0];
    position.y = newPosition[1];
    position.z = newPosition[2];

    return position;
  }

  static getIndex(position: Vector3Like, bounds: Vector3Like) {
    this.index.setBounds(bounds.x, bounds.y, bounds.z);
    return this.index.getIndexVec3(position);
  }

  static WholeVec3 = Vector3Like.Create(1, 1, 1);
  static spatialHash(
    space: VoxelSpace,
    parentSpace: VoxelSpace,
    divisor: Vector3Like = VoxelSpace.WholeVec3
  ) {
    const parentPosition = parentSpace.getPositionXYZ(
      space._position.x,
      space._position.y,
      space._position.z
    );
    space._hashedPosition.x = space._position.x - parentPosition.x / divisor.x;
    space._hashedPosition.y = space._position.y - parentPosition.y / divisor.y;
    space._hashedPosition.z = space._position.z - parentPosition.z / divisor.z;
    return space._hashedPosition;
  }

  static mapLocationToVec3(location: LocationData, vector: Vector3Like) {
    location[1] = vector.x;
    location[2] = vector.y;
    location[3] = vector.z;
  }

  _location: LocationData = ["main", 0, 0, 0];
  _position = Vector3Like.Create();
  _hashedPosition = Vector3Like.Create();
  _bounds = Vector3Like.Create();
  _boundsPower2 = Vector3Like.Create();
  _boundsSet = false;

  constructor(public data: VoxelSpaceData) {}

  getVolume() {
    return this._bounds.x * this._bounds.y * this._bounds.z;
  }

  getArea() {
    return this._bounds.x * this._bounds.z;
  }

  getHeight() {
    return this._bounds.y;
  }

  getWidth() {
    return this._bounds.x;
  }

  getDepth() {
    return this._bounds.z;
  }

  setXYZ(x: number, y: number, z: number) {
    this._position.x = x;
    this._position.y = y;
    this._position.z = z;
    this.getPosition();
    VoxelSpace.mapLocationToVec3(this._location, this._position);
    return this;
  }

  setXZ(x: number, z: number) {
    this._position.x = x;
    this._position.z = z;
    this.getPosition();
    VoxelSpace.mapLocationToVec3(this._location, this._position);
    return this;
  }

  getLocation() {
    this.data.getPosition(this);
    VoxelSpace.mapLocationToVec3(this._location, this._position);
    return this._location;
  }

  getLocationXYZ(x: number, y: number, z: number) {
    this.setXYZ(x, y, z);
    VoxelSpace.mapLocationToVec3(this._location, this._position);
    return this._location;
  }

  setLocation(location: LocationData) {
    this.setXYZ(location[1], location[2], location[3]);
    return this;
  }

  updateLoaction(location: LocationData) {
    this.setXYZ(location[1], location[2], location[3]);
    location[1] = this._location[1];
    location[2] = this._location[2];
    location[3] = this._location[3];
    return this;
  }

  setCubeBounds(bounds: Vector3Like) {
    if (this._boundsSet) return;
    this._boundsPower2.x = bounds.x;
    this._boundsPower2.y = bounds.y;
    this._boundsPower2.z = bounds.z;
    this._bounds.x = 2 ** this._boundsPower2.x;
    this._bounds.y = 2 ** this._boundsPower2.y;
    this._bounds.z = 2 ** this._boundsPower2.z;
    this._boundsSet = true;
    return this;
  }

  setBounds(bounds: Vector3Like) {
    if (this._boundsSet) return;
    this._bounds.x = bounds.x;
    this._bounds.y = bounds.y;
    this._bounds.z = bounds.z;
    this._boundsSet = true;
    return this;
  }

  getPosition() {
    return this.data.getPosition(this);
  }

  getPositionXYZ(x: number, y: number, z: number) {
    return this.setXYZ(x, y, z).data.getPosition(this);
  }

  getPositionLocation(location: LocationData) {
    return this.setLocation(location).data.getPosition(this);
  }

  getIndex() {
    return this.data.getIndex(this);
  }

  getIndexXYZ(x: number, y: number, z: number) {
    return this.setXYZ(x, y, z).data.getIndex(this);
  }

  getIndexToXYZ(index: number) {
    return this.data.getPostionFromIndex(this, index);
  }

  getIndexLocation(location: LocationData) {
    return this.setLocation(location).data.getIndex(this);
  }

  getPositionFromIndex(index: number) {
    return this.data.getPostionFromIndex(this, index);
  }

  getKey() {
    return `${this._position.x}_${this._position.y}_${this._position.z}`;
  }

  getKeyXYZ(x: number, y: number, z: number) {
    return this.setXYZ(x, y, z).getKey();
  }

  getKeyLocation(location: LocationData) {
    return this.setLocation(location).getKey();
  }
}
