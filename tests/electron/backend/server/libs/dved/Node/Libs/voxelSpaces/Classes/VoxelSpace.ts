import { LocationData, LocationNode } from "../Types/VoxelSpaces.types";

type Vector3 = { x: number; y: number; z: number };

class VSVec3 {
  constructor(public x: number, public y: number, public z: number) {}
  copy() {
    return new VSVec3(this.x, this.y, this.z);
  }
  copyTo(vec3: Vector3) {
    vec3.x = this.x;
    vec3.y = this.y;
    vec3.z = this.z;
  }
  toString() {
    return `${this.x}_${this.y}_${this.z}`;
  }
  multiply(vec3: Vector3) {
    this.x *= vec3.x;
    this.y *= vec3.y;
    this.z *= vec3.z;
    return this;
  }
}

//Objects
export class VoxelSpace {
  static simpleCubeHash(space: VoxelSpace) {
    space._position.x =
      (space._position.x >> space._boundsPower2.x) << space._boundsPower2.x;
    space._position.y =
      (space._position.y >> space._boundsPower2.y) << space._boundsPower2.y;
    space._position.z =
      (space._position.z >> space._boundsPower2.z) << space._boundsPower2.z;
    return space._position;
  }

  static getPositionFromIndex(
    position: VSVec3,
    bounds: VSVec3 | Vector3,
    index: number
  ) {
    position.x = index % bounds.x >> 0;
    position.y = (index / bounds.x) % bounds.y >> 0;
    position.z = (index / (bounds.x * bounds.y)) >> 0;
    return position;
  }

  static getIndex(position: Vector3, bounds: Vector3) {
    return (
      position.x + position.y * bounds.x + position.z * bounds.z * bounds.y
    );
  }
  static WholeVec3 = new VSVec3(1, 1, 1);
  static spatialHash(
    space: VoxelSpace,
    parentSpace: VoxelSpace,
    divisor: Vector3 = VoxelSpace.WholeVec3
  ) {
    const parentPosition = parentSpace.getPositionXYZ(
      space._position.x,
      space._position.y,
      space._position.z
    );
    space._hashedPosition.x =
      Math.abs(space._position.x - parentPosition.x) / divisor.x;
    space._hashedPosition.y =
      Math.abs(space._position.y - parentPosition.y) / divisor.y;
    space._hashedPosition.z =
      Math.abs(space._position.z - parentPosition.z) / divisor.z;
    return space._hashedPosition;
  }

  static mapLocationToVec3(location: LocationData, vector: Vector3) {
    location[1] = vector.x;
    location[2] = vector.y;
    location[3] = vector.z;
  }

  _location: LocationData = ["main", 0, 0, 0];
  _position = new VSVec3(0, 0, 0);
  _hashedPosition = new VSVec3(0, 0, 0);
  _bounds = new VSVec3(0, 0, 0);
  _boundsPower2 = new VSVec3(0, 0, 0);
  _boundsSet = false;

  constructor(
    public data: {
      getPosition: (space: VoxelSpace) => VSVec3;
      getIndex: (space: VoxelSpace) => number;
      getPostionFromIndex: (space: VoxelSpace, index: number) => VSVec3;
    }
  ) {}

  getVolume() {
    return this._bounds.x * this._bounds.y * this._bounds.z;
  }

  getArea() {
    return this._bounds.x * this._bounds.z;
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
    return this._location;
  }

  setCubeBounds(bounds: Vector3) {
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

  setBounds(bounds: Vector3) {
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
    return this.setXYZ(location[1], location[2], location[3]).data.getPosition(
      this
    );
  }

  getIndex() {
    return this.data.getIndex(this);
  }

  getIndexXYZ(x: number, y: number, z: number) {
    return this.setXYZ(x, y, z).data.getIndex(this);
  }

  getIndexLocation(location: LocationData) {
    return this.setXYZ(location[1], location[2], location[3]).data.getIndex(
      this
    );
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
    return this.setXYZ(location[1], location[2], location[3]).getKey();
  }
}
